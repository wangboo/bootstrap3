var fs = require("fs");
var connect = require("connect");
var express = require('express');
var http = require('http');
var path = require('path');
var midCrumb = require("./middleware/mid_crumb.js");
var midLayout = require("./middleware/mid_layout.js");
var partials = require("express-partials");
var midAuth = require("./middleware/mid_auth.js");
var app = express();
//载入自定义配置文件
var configFile = fs.readFileSync("./configure.json", "utf-8");
var config = eval("("+configFile+")");
app.config = config;
//日志文件
var log4j = require("log4js");
log4j.configure("./log4js.json");
var logger = log4j.getLogger("info");

var routes = require("./routes.js")(app);
var mongoose = require("mongoose");
var SessionMongoose = require("session-mongoose")(connect);
var sessionStore = new SessionMongoose({
    url: config.sessionDb,
    interval: 120000
});

mongoose.connect(config.db);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.json());
app.use(express.bodyParser({
    uploadDir: '/Users/wangboo/WebstormProjects/bootstrap3/public/icon/',
    keepExtensions: true,
    limit: '10mb'
}));
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//使用session
app.use(express.cookieParser());
app.use(express.session({
    secret: 'wangbo',
    maxAge: 3600000,
    store: sessionStore
}));
//日志中间件
app.use(log4j.connectLogger(logger, {level: "auto", format: ":method :url :status"}));
//权限控制
app.use(midAuth);
//使用breadcrumb中间件
app.use(midCrumb());
//使用框架数据查询中间件
app.use(midLayout());
//使用视图框架
app.use(partials());
//路由
routes(app);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

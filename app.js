
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var Crumb = require("./middleware/mid_crumb.js");
var partials = require("express-partials");
var app = express();
var routes = require("./routes.js")(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser({
    uploadDir: '/Users/wangboo/WebstormProjects/bootstrap3/public/icon/',
    keepExtensions: true,
    limit: '10mb'
}));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(Crumb());
app.use(partials());

routes(app);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

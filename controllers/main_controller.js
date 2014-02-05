var log = require("../log4js.js")();
var model = require("../models/");
exports.index = function(req, res){
    res.render('index');
};
//登陆
exports.login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    model.User.findByUsernameAndPassword(username, password, function(err, doc){
        if(err) {
            log.debug("findByUsernameAndPassword error ", err);
            req.addData.loginError = true;
            req.addData.loginDesc = "未知错误";
            res.render("index");
        }else if(doc){
            log.debug("login success user : ", doc);
            var ip = req.connection.remoteAddress;
            var auth = username+"|"+password+"|"+ip;
            log.debug("set auth : ", auth);
            res.cookie("auth", auth, {maxAge: 99999999999, httpOnly:true, path: "/"});
            //更新最新的登陆ip地址
            if(doc.lastLoginIp != req.connection.remoteAddress) {
                model.User.update({_id: doc.id}, {lastLoginIp: req.connection.remoteAddress}, function(err, number){
                    log.debug("更新登陆ip err number: ", err, number);
                });
            }
            var session = req.session;
            session.user = doc;
            res.render("index");
        }else {
            req.addData.loginError = true;
            req.addData.loginDesc = "账号密码错误";
            res.render("index");
        }
    });
}
//注销
exports.logout = function(req, res) {
    req.session.user = null;
    res.cookie("auth", "", {maxAge: 0});
    res.redirect("/");
}

exports.war3 = function(req, res) {
    req.crumb.add("war3", "/node/war3");
    res.render('node');
}


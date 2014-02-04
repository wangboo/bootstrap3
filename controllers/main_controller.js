
var model = require("../models/");
exports.index = function(req, res){
    res.render('index');
};
exports.login = function(req, res) {
    model.User.findByUsernameAndPassword(req.body.username, req.body.password, function(err, doc){
        if(err) {
            req.log();
            res.render("index", {loginError: true, loginDesc: "未知错误"});
        }else {
            if(doc.length >= 1) {
                res.render("index", {user: doc[0]});
            }else {
                res.render("index", {loginError: true, loginDesc: "账号密码错误"});
            }
        }
    });
}


exports.war3 = function(req, res) {
    req.crumb.add("war3", "/node/war3");
    res.render('node');
}
exports.new = function(req, res) {
    res.render('new');
}
exports.create = function(req, res) {
    console.log(req.body);
}


var log = require("../log4js.js")();
var model = require("../models/");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
//进入创建账号界面
exports.new = function(req, res) {
    req.crumb.add([{
        name: "注册",
        url : "/user/new"
    }]);
    res.render("user/new");
}
//创建账号,成功后跳转到人物信息界面
exports.create = function(req, res) {
    req.body.user.lastLoginIp = req.connection.remoteAddress;
    var user = new model.User(req.body.user);
    user.save(function(err){
        if(err) {
            //TODO 注册失败
            log.warnning("注册失败", err);
            res.redirect("/user/new");
        }else {
            log.debug("注册成功");
            res.redirect("/user/"+user.id);
        }
    });
}
//用户个人信息界面
exports.index = function(req, res) {
    //TODO 可能存在用自己的session修改别人的资料，应该检查session.user.id与req.params.id是否相等
    req.crumb.add("资料", "/user/"+req.session.user.id);
    model.User.findById(new ObjectId(req.params.id), function(err, data){
        if(data) {
            log.debug("user=", data);
            res.render("user/index", {user: data});
        }else{
            //没有该用户,跳转到注册界面
            res.redirect("user/new");
        }
    });
}
//用户信息界面，修改头像
exports.indexIcon = function(req, res) {
    res.render("user/index_icon");
}
//更新人物信息
exports.update = function(req, res) {
    //TODO 可能存在用自己的session修改别人的资料，应该检查session.user.id与req.params.id是否相等
    log.debug("update user info, " + req.session.user);
    model.User.findByIdAndUpdate(new ObjectId(req.session.user.id), {
        nickname:   req.body.nickname,
        desc:       req.body.desc
        }, function(err, doc){
        log.debug("update err: ", err, "doc: ", doc);
        if(err) {
        }else {
            res.render("user/index", {user: doc});
        }
    });
}

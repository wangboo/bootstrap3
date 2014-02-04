
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
//账号存在查询
exports.findUsername = function(req, res) {
    var username = req.body["username"];
    model.User.findOne({username: username}, function(err, data){
        if(err) {
            res.send({"success": false, "msg": err.message});
        }else if(data){
            res.send({"success": false, "msg": "账号已经存在"});
        }else {
            res.send({"success": true});
        }
        res.end();
    });
}
//创建账号,成功后跳转到人物信息界面
exports.create = function(req, res) {
    var user = new model.User(req.body.user);
    user.save(function(err){
        if(err) {
            //TODO 注册失败
            console.log("注册失败", err);
            res.redirect("/user/new");
        }else {
            console.log("注册成功");
            res.redirect("/user/"+user.id);
        }
    });
}
//用户个人信息界面
exports.index = function(req, res) {
    model.User.findById(new ObjectId(req.params.id), function(err, data){
        if(data) {
            console.log("user=", data);
            res.render("user/index", {user: data});
        }else{
            //没有该用户,跳转到注册界面
            res.redirect("user/new");
        }
    });
}
//更新人物信息
exports.update = function(req, res) {
    model.User.findByIdAndUpdate(new ObjectId(req.body.id), req.body.user, function(err, doc){
        if(err) {
            //TODO error
        }else {
            res.render("user/index", {user: doc});
        }
    });
}

var model = require("../models/");
var log = require("../log4js.js")();
var fs = require("fs");

//更换背景图片   json
exports.changeBg = function(req, res) {
    var img = req.body.webBg;
    if(req.session && req.session.user) {
        res.send({success: true});
        model.User.update({_id: req.session.user.id}, {webBg: img}, function(err, number){
            log.debug("更改背景图片err=", err, ", number=", number);
        });
    }else {
        //还没有session
        res.send({success: false});
    }
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
    });
}
//更行用户头像
exports.updateUserIcon = function(req, res) {
    log.debug("updateUserIcon", req);
    //更新头像信息
    var user = req.session.user;
    //这里应该删除以前被替换掉得图片，如果图片是默认图标，则不删除
    var path = __dirname.match(/^(.*)\/controllers/)[1]+"/public";
    fs.unlinkSync(path + user.icon_big);
    fs.unlinkSync(path + user.icon_middle);
    fs.unlinkSync(path + user.icon_small);
    model.User.findByIdAndUpdate(user.id, {
        icon_big: req.files.__avatar1.path.match(/^.*\/public(\/.*)$/)[1],
        icon_middle: req.files.__avatar2.path.match(/^.*\/public(\/.*)$/)[1],
        icon_small: req.files.__avatar3.path.match(/^.*\/public(\/.*)$/)[1]
    }, function(err, user){
        log.debug("updateUserIcon err: ", err, ", user: ", user);
        req.session.user = user;
        res.send({success: true, avatarUrls: [user.icon_small, user.icon_middle, user.icon_big]});
    });
}
var model = require("../models/");
var log = require("../log4js.js")();

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
    res.end();
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
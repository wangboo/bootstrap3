var log = require("../log4js.js")();
var model = require("../models/");
//权限控制
//1.代理了res.render方法，在render时会默认添加一个addData参数
//2.如果session中没有user，那么会使用cookies中的auth做尝试登陆,用户名，密码，上次登陆ip
//3.尝试登陆失败后，那么会在addData中加入loginUsername(以前登陆账号)和loginDesc(不能登陆描述)
module.exports = function(req, res, next) {
    log.debug("session ", req.session);
    log.debug("cookies ", req.cookies);
    req.addData = req.addData || {};
    var _render = res.render.bind(res);
    res.render = function(view, params, option) {
        params = params || {};
        if(params.addData) {
            for(var m in req.addData) {
                params.addData[m] = req.addData[m];
            }
        }else{
            params.addData = req.addData;
        }
//        if(!params.user && req.session) {
//            //不存在user
//            params.user = req.session.user;
//        }
        _render(view, params, option);
    };
    if(!req.session.user) {
        log.debug("session中没有user，尝试使用cookie登陆");
        //如果session中没有user，那么就会取cookie中的auth字段来尝试登陆
        var auth = req.cookies.auth;
        if(auth) {
            auth = auth.split("|");
            var username = auth.shift();
            var password = auth.shift();
            model.User.findByUsernameAndPassword(username, password, function(err, user){
                if(err){
                  console.error("findByUsernameAndPassword ", err)
                }else if(!user){
                    log.debug("登陆失败，密码不正确");
                    //密码错误
                    req.addData.loginUsername = username;
                    req.addData.loginDesc = "登陆状态异常";
                }else if(user.lastLoginIp == req.connection.remoteAddress) {
                   //正确
                    req.session.user = user;
                    log.debug("使用cookie登陆成功， user=", user);
               }else{
                    log.debug("登陆失败，原登陆ip：", user.lastLoginIp, "现登陆ip：", req.connection.remoteAddress);
                    //ip错误
                    req.addData.loginUsername = username;
                    req.addData.loginDesc = "登陆状态异常";
                }
                next();
            });
        }else {
            next();
        }
    }

}
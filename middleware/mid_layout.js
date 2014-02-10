//框架信息中间件, 查询layout.ejs需要的数据
//1.背景图片
var log = require("../log4js.js")();
function queryMid(req, res, next) {
    if(req.path.match(/^(\/json\/).*$/)) {
        //匹配到以/json/开头
        log.debug("json请求", req.path, "，跳过mid_layout");
        next();
        return;
    }
    //有user
    var _render = res.render.bind(res);
    //渲染方法
    res.render = function(name, params, option) {
        params = params || {};
        if(req.session.user) {
            var session = req.session;
            var user = params.user;
            if(user) {
                //参数中本来就有user
            }else {
                //参数中没有user,将session中的user放入params中
                params.user = req.session.user;
            }
        }
        if(req.session && req.session.user) {
            req.addData.webBg = req.session.user.webBg || "/img/robots.png";
        }else {
            req.addData.webBg = "/img/robots.png";
        }
        //为用户设置背景图片
        log.debug("用户背景图片：" + req.addData.webBg);
        _render(name, params, option);
    }
    next();
}

module.exports = function(){
    return queryMid;
};



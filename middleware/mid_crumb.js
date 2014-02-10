var log = require("../log4js.js")();
//面包屑中间件
function MidCrumb(req, resp, next) {
    if(req.path.match(/^(\/json\/).*$/)) {
        //匹配到以/json/开头
        log.debug("json请求", req.path, "，跳过mid_layout");
        next();
        return;
    }
    req.crumb = new require("./crumb.js")();
    var _render = resp.render.bind(resp);
    var render = function(view, params, options) {
        params = params || {};
        params.crumb = req.crumb;
        _render(view, params, options);
    }
    resp.render = render;
    next();
}

module.exports = function() {
    return MidCrumb;
}
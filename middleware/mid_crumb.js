

//面包屑中间件
function MidCrumb(req, resp, next) {
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
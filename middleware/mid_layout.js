//框架信息中间件, 查询layout.ejs需要的数据
//1.req中
function queryMid(req, res, next) {
    if(req.session.user) {
        var session = req.session;
        //有user
        var _render = res.render.bind(res);
        //渲染方法
        res.render = function(name, params, option) {
                var user = params.user;
                if(user) {
                    //参数中本来就有user
                }else {
                    //参数中没有user,将session中的user放入params中
                    params.user = req.session.user;
                }
                _render(name, params, option);
            }
    }
    next();
}

module.exports = function(){
    return queryMid;
};



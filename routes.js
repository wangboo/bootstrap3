
var main = require("./controllers/main_controller.js");
var user = require("./controllers/user_controller.js");
var json = require("./controllers/json_controller.js");

module.exports = function(app) {
    return function(app) {
        //获取主界面内容
        app.get("/", main.index);
        //登陆
        app.post("/", main.login);
        //注销
        app.get("/logout", main.logout);
        app.get("/node/war3", main.war3);
        //注册界面
        app.get("/user/new", user.new);
        //注册
        app.post("/user/create", user.create);
        //用户信息界面
        app.get("/user/:id", user.index);
        //更改用户信息
        app.post("/user/:id", user.update);



        //更换背景图片 json
        app.post("/json/changeBg", json.changeBg);
        //账号存在查询 json
        app.post("/json/findUsername", json.findUsername);
    }
}


var main = require("./controllers/main.js");

module.exports = function(app) {
    return function(app) {
        app.get("/", main.index);
        app.get("/node/war3", main.war3);
        app.get("/item/new", main.new);
        app.post("/item/create", main.create);
        //注册功能
        app.get("/regist", main.regist);
        app.post("/user/create", function(req, res) {
           console.log(req);
        });

    }
}

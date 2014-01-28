
var main = require("./controllers/main.js");

module.exports = function(app) {
    return function(app) {
        app.get("/", main.index);
        app.get("/node/war3", main.war3);
    }
}

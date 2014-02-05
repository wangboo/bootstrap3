
var log4j = require("log4js");
module.exports = function() {
    var logger = log4j.getLogger("info");
    logger.setLevel("DEBUG");
    return logger;
}

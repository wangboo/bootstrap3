
exports.index = function(req, res){
    res.render('index');
};

exports.war3 = function(req, res) {
    req.crumb.add("war3", "/node/war3");
    res.render('node');
}
exports.new = function(req, res) {
    res.render('new');
}
exports.create = function(req, res) {
    console.log(req.body);
}

/*
 * GET home page.
 */

exports.index = function(req, res){
  req.crumb.add("官方", "/gov").add("魔兽争霸", "/gov/war3").add("堕落军团入侵", "/gov/war3/jinji");
  res.render('index');
};

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var userSchema = new Schema({
    //用户名
    username:   String,
    //密码
    password:   String,
    //昵称
    nickname:   String,
    //大头像
    icon_big: String,
    //中头像
    icon_middle:   String,
    //小头像
    icon_small: String,
    //自我描述
    desc:       String,
    //账号创建日期, 默认日期为当前
    createAt:  {type: Date, default: Date.now},
    //上次登陆ip
    lastLoginIp: String,
    //等级
    star:       Number,
    //网站背景
    webBg:      {type: String, default: "/img/robots.png"}
});

//通过账号和密码查询用户
userSchema.statics.findByUsernameAndPassword = function(username, password, callback) {
    this.findOne({username: username, password: password}, callback);
}
mongoose.model("user", userSchema);



var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var userSchema = new Schema({
    id:         ObjectId,
    username:   String,
    password:   String,
    nickname:   String,
    icon:       String,
    desc:       String,
    create_at:  Date,
    star:       Number
});

mongoose.model("user", userSchema);
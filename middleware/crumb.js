function Crumb() {
    var head = new Object();
    head.url = "/";
    head.name = "主页";
    this.arr = [head];
}

Crumb.prototype.add = function(name, url) {
    var item = Object();
    item.name = name;
    item.url = url;
    this.arr.push(item);
    return this;
}
Crumb.prototype.forEach = function(callback) {
    for(var i=0;i<this.arr.length-1;i++) {
        callback(this.arr[i]);
    }
}
Crumb.prototype.last = function() {
    return this.arr[this.arr.length-1];
}
module.exports = function() {
    return new Crumb();
}
function Crumb() {
    var head = new Object();
    head.url = "/";
    head.name = "主页";
    this.arr = [head];
}

Crumb.prototype.add = function() {
    var arr;
    if(arguments.length == 1 && arguments[0] instanceof Array) {
        var data = arguments[0];
        for(var i=0;i<data.length;i+=2) {
            if(!data[i].name || !data[i].url) {
                throw new Error("入参中必须包含name和url");
            }
            this.arr.push(data[i]);
        }
    }else {
        if(arguments.length%2 == 1) {
            throw new Error("入参必须为array或者偶数的字符串");
        }
        for(var i=0;i<arguments.length/2;i+=2) {
            this.arr.push({
                name: arguments[i],
                url: arguments[i+1]
            });
        }
    }
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
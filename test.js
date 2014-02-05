var a = {a: "a", b: "b"};
var b = {1: "1", 2: "2"};
for(var m in a) {
    b[m] = a[m];
}
console.log(b);
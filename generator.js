var n=1000000;
var c=Math.random()*100;
var v=Math.random()*10;

var out=c;
for(var i=0;i<n;i++){
  out+=","+c;
  c+=(Math.random()*2)-1;
  v+=(Math.random()*2)-1;
}
console.log(out);

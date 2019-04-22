var n=1000000000;
var c=Math.random()*100;
var v=Math.random()*10;

console.log("xValue,yValue");

for(var i=0;i<n;i++){
  console.log(i+","+c);
  c+=(Math.random()*2)-1;
  v+=(Math.random()*2)-1;
}

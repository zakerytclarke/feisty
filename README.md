# feisty
A small JS library for downsampling data and rendering with Chart.js

<h1 id="load">
Loading Data...
</h1>



<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js">
</script>
<script>
console.log("V2.0.1");
//Read in dataset

//Sampling Size
//eg 3 renders every 3rd element
  var sampling=10;


  var canvas=document.createElement("CANVAS");

  canvas.addEventListener('wheel', function(e) {
    var step=1;
    if (e.deltaY < 0) {
      if(e.clientX>=canvas.width){
        if(max<data.length){
          max+=step;
        }
      }else{
        if(min<data.length){
          min+=step;
        }
      }
    }
    if (e.deltaY > 0) {
      if(e.clientX>=canvas.width){
        if(max>0){
          max-=step;
        }
      }else{
        if(min>0){
          min-=step;
        }
      }
    }
    renderChart();
  });
  //Append Canvas
  var ctx=canvas.getContext('2d');
  document.body.appendChild(canvas);
  canvas.style.width ='80%';

  canvas.width=canvas.offsetWidth;
  canvas.height=canvas.offsetHeight;

  var data=[];
  var indexs=[];

  var min=0;
  var max=100;


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Data Loaded");
        var raw=xhttp.responseText.split(/\s+/g);
        raw.shift();
        data=raw.map(
          function(str){
              return str.split(",")[1];
          }
        );
        indexs=raw.map(
          function(str){
              return str.split(",")[0];
          }
        );

        //Render on Chart
        max=data.length;
        renderChart();


        //add colors


        document.getElementById("load").style.display="none";


      }
  };
  var file;
  if(window.location.search==""){
    file="hundredthousand.csv";
  }else{
    file=window.location.search.substring(1);
  }

  file="hundred.csv";

  //The file to read
  xhttp.open("GET",'https://zclarke.xyz/feisty/data/'+file,true);
  xhttp.send();



  function renderChart(){
    var sampleSize=1;
    while(sampleSize<max-min){
      sampleSize*=10;
    }
    sampling=sampleSize/1000
    if(sampling<1){
      sampling=1;
    }


    //DataSet to render
    var dataset=[];
    var indices=[];
    //Reduce DataSet
    for(var i=min;i<max;i++){
      if(i%sampling==0){
        dataset.push(data[i]);
        indices.push(indexs[i]);
      }
    }
    console.log("Size of Data Set:",dataset.length);
    console.log("Min:"+min+";Max:"+max);

    //Render new Chart
    var myChart=new Chart(ctx,{
        type:'line',
        data: {
            labels:indices,
            datasets: [{
                data:dataset,
                borderWidth: 1
            }]
        },
        options: {
          legend: {
            display: false
          },
        }
    });

  }
</script>

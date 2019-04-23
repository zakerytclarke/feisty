function feisty(){
  console.log("V2.0.1");
  //Read in dataset

  //Sampling Size
  //eg 3 renders every 3rd element
    var sampling=10;

    var ctx=document.getElementById("chart");



    var pairs=[];

    var min=0;
    var max=100;


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Data Loaded");
          var raw=xhttp.responseText.split(/\s+/g);
          raw.shift();
          pairs=raw.map(
            function(str){
              return {label:str.split(",")[0],
                      data:str.split(",")[1]}
            });


          document.getElementById("r0").max=pairs.length;
          document.getElementById("r1").max=pairs.length;
          document.getElementById("r1").value=pairs.length;
          //Render on Chart
          max=pairs.length;
          renderChart();


          //add colors


          document.getElementById("load").style.display="none";


        }
    };
    var file;
    if(window.location.search==""){
      file="million.csv";
    }else{
      file=window.location.search.substring(1);
    }


    //The file to read
    xhttp.open("GET",'https://zclarke.xyz/feisty/data/'+file,true);
    xhttp.send();



    function renderChart(){
      //Generate Sampling Distribution
      var sampleSize=1;
      while(sampleSize<max-min){
        sampleSize*=10;
      }
      sampling=sampleSize/1000
      if(sampling<1){
        sampling=1;
      }



      var outData=[];

/*
      //Sample to preserve Max and Min
      var oldPairs=[];
      for(var i=min;i<max;i++){
          oldPairs.push(pairs[i]);
      }
      console.log(outData.length);
      while(outData.length==0||outData.length>100){
        outData=[];
        for(var i=1;i<oldPairs.length;i++){
          console.log(oldPairs.length);
          if(oldPairs[i].data<oldPairs[i-1].data&&oldPairs[i].data<oldPairs[i+1].data){//Local Minimum
            outData.push(oldPairs[i]);
          }
          if(oldPairs[i].data>oldPairs[i-1].data&&oldPairs[i].data>oldPairs[i+1].data){//Local Maximum
            outData.push(oldPairs[i]);
          }
        }
        console.log(outData.length);
        var oldPairs=[];
        for(var i=0;i<outData.length;i++){
            oldPairs.push(outData[i]);
        }
        console.log(oldPairs.length);
      }
*/


      //DataSet to render
      var dataset=[];
      var indices=[];
      //Reduce DataSet
      for(var i=min;i<max;i++){
        if(i%sampling==0){
          dataset.push(pairs[i].data);
          indices.push(pairs[i].label);
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
                  borderWidth: 1,
                  backgroundColor:"#077fb7"
              }]
          },
          options: {
            //animations:false,
            legend: {
              display: false
            },
          }
      });

    }



    this.update=function(){
      var high=Math.max(document.getElementById("r0").value,document.getElementById("r1").value);
      var low=Math.min(document.getElementById("r0").value,document.getElementById("r1").value);
      min=low;
      max=high;
      renderChart();
    }

}

$( document ).ready(function() {
  var rate = 2.4;
  var moveCount=0;
  var countDownDate = new Date().getTime();


  var isgameEnd=false;
  var isgridPrint = false;


  setUpInital();



var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = now - countDownDate ;
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = minutes + ":" +seconds;
}, 1000);




function setUpInital(){

  rateGame(5.0);
  document.getElementById("timer").innerHTML ="0:00";
  displayMoves(0);
  setupTheme();

  fillTable();
  isgameEnd = false;
  isgridPrint = true;
}

function rateGame(rate){
  var starTotal = 5.0;
  const starPercentage = (rate / starTotal) * 100;
  const starPercentageRounded = Math.round(starPercentage / 10) * 10+"%";
  console.log(starPercentageRounded);
  //$('.stars-inner').css("width",starPercentageRounded);
  document.querySelector('.stars-inner').style.width = starPercentageRounded;

  }

function displayMoves(moveCount){
    $('.moves').html(moveCount+" moves");

}

function fillTable(x){
  var count=0;
  var x=new Array(0);
  while(count<16){
      var randnum = Math.floor(Math.random() * 8)+1;
      var countRandNum = 0;
      for(var i = 0; i <16; i++){
          if(x[i] == randnum)
              countRandNum++;
      }
      if(countRandNum>1){
        continue;
      }
      else{
        x.push(randnum);
        count+=1;
      }
      console.log(randnum);
  }
  console.log("here is x");
  console.log(x);
  for(var i=1;i<17;i++){
    $('.td'+i).html("<img class=\"img"+x[i-1]+"\"src=\"img/im"+x[i-1]+".png\" >");
  }


  }

  function setupTheme(){

    var deviceWidth =window.innerWidth;
    var deviceheight =window.innerHeight;
    var gridWidth =parseInt( $('.grid').css('width'));
    console.log("win:"+innerWidth+"x"+innerHeight);
    if(deviceWidth-10<gridWidth){
      $('.grid').css("height",deviceWidth-10);
      $('.grid').css("width",deviceWidth-10);
    }
    else{
      $('.grid').css("height",gridWidth);
    }


    var containerHeight =parseInt( $('.container').css('height'));
    console.log("continer : " +containerHeight);
    var marginTop =parseInt( $('.statics').css('margin-top'));
    console.log("margin-top:"+marginTop);
    while((containerHeight > deviceheight) && (marginTop>0)){
      console.log("margin-top << "+marginTop);
      $('.statics').css("margin-top:",marginTop-2);
      marginTop =parseInt( $('.statics').css('margin-top'));
    }

    var resetHeight =parseInt( $('#reset').css('height'));
    $('#reset').css('width',resetHeight+5);


  }





});




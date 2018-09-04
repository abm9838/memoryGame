$( document ).ready(function() {
  var rate = 5.0;
  var moveCount=0;
  var countDownDate = new Date().getTime();
  var minutes =0;
  var seconds=0;
  var isgameEnd=false;
  var isgridPrint = false;
  var preClick=0;
  var currentClick=0;
  var arrClass = new Array(16);
  var trackGame = new Array(0);
  var clickedTd;
  setUpInital();
  console.log("trackGame : "+trackGame);

  if(isgridPrint){

    $('td').on('click', function(){
      clickedTd = $(this).attr('class'); // class of td

      if(!isgameEnd && clickedTd!=trackGame[trackGame.length-1] ){

        animateOpen(clickedTd);
        trackGame.push(clickedTd);
        console.log("tracking : "+trackGame);
        if(preClick == 0){
          preClick = currentClick;
        }
        currentClick = clickedTd.substr(2)-'0';
        calClick(clickedTd);

      }


    });


    $('#reset, .reset').click(function(){
      $('.popup').css('display','none');
      $('.main').css('opacity',1);

      setUpInital();
    });
    $('.resetpop').click(function(){
      $('.popup').css('display','none');
      $('.main').css('opacity',1);
      setUpInital();

    });

      /*-----------------timer  ---------*/
    var x = setInterval(function() {
      now = new Date().getTime();
      distance = now - countDownDate ;
      //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      seconds = ("0" + seconds).slice(-2);
      document.getElementById("timer").innerHTML = minutes + ":" +seconds;
      rateGame()
  }, 1000);




}

/*---------------------DISPLAY POP UP --------------- */
function popUp(){
  $('.popup').css('display','block');
  var starTotal = 5.0;
  var i=0;
  //animation to show final rating
  $('.main').css('opacity',0.6);
  var z = setInterval(function(){
    if(i<=rate*10){
      i++;
      const starPercentage = ((i/10) / starTotal) * 100;
      const starPercentageRounded = Math.round(starPercentage / 10) * 10+"%";
      document.querySelector('.rateLen').style.width = starPercentageRounded;
    }
    if(i>=rate*10){
      clearInterval(z);
    }
  },100);

}
/* ------------------------VISIBLITY HIDE OPEN ------------------- */

function closePair(){
  var shakeId1=trackGame[trackGame.length-1];
  var shakeId2=trackGame[trackGame.length-2];
  $('.'+shakeId1).attr("id","td_shake");
  $('.'+shakeId2).attr("id","td_shake");
  clickedTd = trackGame.pop();
  animateClose();
  clickedTd = trackGame.pop();
  animateClose();
  setTimeout(function () {
    $('.'+shakeId1).attr("id","");
    $('.'+shakeId2).attr("id","");}, 300);

}
function animateOpen(){
  $('.'+clickedTd+ ' img').css('visibility','');
  $('.'+clickedTd).toggleClass('td_zoom');

}
function animateClose(){
  $('.'+clickedTd+ ' img').css('visibility','hidden');
  $('.'+clickedTd).toggleClass('td_zoom');
}
function hideImg(){
  for(var i=1;i<17;i++){
    $('.td'+i+ ' img').css('visibility','hidden');
  }
  countDownDate = new Date().getTime();
}


/*--------------------------- CLICK CALCULATIONS MATCHED OR NOT-------------*/
function calClick(clickedTd){

  //console.log("clicked : "+currentClick);
  if(isgameEnd==false)
    moveCount+=1;
  displayMoves(moveCount);//update move count

  if(preClick!=0){
    if(currentClick==preClick){
      console.log("opps--");
      setTimeout(closePair, 500);
      currentClick = 0;
      preClick = 0;
    }
    else if(arrClass[currentClick-1] == arrClass[preClick-1]){
     // console.log("matched--");
      /*__________________________WINING CASE _____*/
      if(trackGame.length>=16){
        rate = parseFloat(rate).toFixed(2);
        isgameEnd=true;
        clearTimeout(x);
        popUp();
       // alert("you won the game in "+minutes+":"+seconds+" and rating : "+rate);
      }
      currentClick = 0;
      preClick = 0;}
    else{
      //console.log("opps--");
      setTimeout(closePair,500);
      currentClick = 0;
      preClick = 0;


    }
  }
}


/*----------------------------------INITIAL SETUP----------------------- */
function setUpInital(){
  moveCount=0;
  rate=5;
  minutes =0;
  seconds=0;
  countDownDate = new Date().getTime();
  preClick=0;
  currentClick=0;
  arrClass = new Array(16);
  trackGame = new Array(0);
  rateGame();
  document.getElementById("timer").innerHTML ="0:00";
  for(var i=1;i<=16;i++){
    $('.td'+i).removeClass('td_zoom');
  }
  displayMoves(0);
  setupTheme();
  fillTable();
  setTimeout(hideImg, 2000);
  isgameEnd = false;
  isgridPrint = true;
}

/*----------------------------------GAME RATING--------------------  */
function rateGame(){
  var starTotal = 5.0;
  var rateTime=0;
  var effMoveCount=0;
  //  decrease rating after 15sec and 25moves
  if(seconds>15 && minutes<1){
    rateTime =parseFloat((minutes+ seconds/60*2.2)/1.7).toFixed(3);
  }
  if(moveCount>25){
    effMoveCount = moveCount-25;
  }
  var rateMove =(effMoveCount*0.10).toFixed(3);
  rate =5 - rateTime - rateMove;
  rate = rate.toFixed(3);
  //console.log("rate:"+rate);
  const starPercentage = (rate / starTotal) * 100;
  const starPercentageRounded = Math.round(starPercentage / 10) * 10+"%";
  document.querySelector('.stars-inner').style.width = starPercentageRounded;

}
function displayMoves(moveCount){
    $('.moves').html(moveCount+" moves");

}

/* ----------------------------------FILL TABLE WITH RANDOM IMAGES--------------   */
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

  }
  console.log("here is x");
  console.log(x);
  for(var i=1;i<17;i++){
    $('.td'+i).html("<img  class=\"img"+x[i-1]+"\"src=\"img/im"+x[i-1]+".png\" >");
  }

  arrClass = x;
  }
/*  ------------------------------ RASPONSIVE DESIGN-------------------------- */
  function setupTheme(){

    var deviceWidth =innerWidth;
    var deviceheight =innerHeight;
    var gridWidth =parseInt( $('.grid').css('width'));
    console.log("win:"+deviceWidth+"x"+deviceheight);
    if(deviceWidth-10<gridWidth){
      $('.grid').css("height",deviceWidth-10);
      $('.grid').css("width",deviceWidth-10);
    }
    else{
      $('.grid').css("height",gridWidth);
    }


    var containerHeight =parseInt( $('.container').css('height'));
  //  console.log("continer : " +containerHeight);
    var marginTop =parseInt( $('.statics').css('margin-top'));
    //console.log("margin-top:"+marginTop);
    while((containerHeight > deviceheight) && (marginTop>0)){
    //  console.log("margin-top << "+marginTop);
      $('.statics').css("margin-top:",marginTop-2);
      marginTop =parseInt( $('.statics').css('margin-top'));
    }

    var resetHeight =parseInt( $('#reset').css('height'));
    $('#reset').css('width',resetHeight+5);
    var ptop = (deviceheight-parseInt( $('.popup').css('height')))/2;
    var pleft = (deviceWidth-parseInt( $('.popup').css('width')))/2;
    console.log("popup : "+ptop+" "+pleft);
    $('.popup').css('top',ptop);
    $('.popup').css('left',pleft);

  }
});


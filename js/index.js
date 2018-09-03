$( document ).ready(function() {


var rate = 2.4;
var starTotal = 5.0;
const starPercentage = (rate / starTotal) * 100;
const starPercentageRounded = Math.round(starPercentage / 10) * 10+"%";
console.log(starPercentageRounded);
$('.stars-inner').css("width",starPercentageRounded);
//document.querySelector('.stars-inner').style.width = starPercentageRounded;

$('.moves').html("300 moves")

var countDownDate = new Date().getTime();

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = now - countDownDate ;
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("demo").innerHTML = minutes + ":" +seconds;
}, 1000);





});


var bodyWidth = $(window).width() - 50,
    bodyHeight = $(window).height() - 45;

var shotsLeft = 20;
var score = 0;

function generateRandom(){
    var randPosX = Math.floor((Math.random() * bodyWidth)),
        randPosY = Math.floor((Math.random() * bodyHeight));

    return [randPosY, randPosX];
  }

  function animateDuck() {
    var newPos = generateRandom(),
        oldPos = $("#duck").offset(),
        speed = calcSpeed([oldPos.top, oldPos.left], newPos);
    $("#duck").animate({
      top: newPos[0],
      left: newPos[1]
    }, speed, function(){
      animateDuck();
    });
  }

  function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]),
        y = Math.abs(prev[0] = next[0]);
    var greatest = x > y ? x : y;
    var speedModifier = 0.1;
    return Math.ceil(greatest / speedModifier);
  }

  function restartGame(){
    shotsLeft = 20;
    score = 0;
    $("#shots").text(shotsLeft);
    $("#score").text(score);
    animateDuck();
  }

$(document).ready(function(){

  animateDuck();

  $(document).on("click", function(event){
    shotsLeft -= 1;
    $("#shots").text(shotsLeft);
    $("#explosion").css({
      top: event.pageY,
      left: event.pageX
    }).removeClass("hidden");
    setTimeout(function(){
      $("#explosion").addClass("hidden");
      if (shotsLeft === 0) {
        $("#duck").stop();
        alert("Game over! You score is: " + score + ". Restart the game.");
        restartGame();
      }
    }, 200);
  });

  $("#duck").on("click", function(){
    $(this).stop();
    score += 1;
    $("#score").text(score);
    $(this).animate({
      top: '150%'}, 100, function(){
        var newPos = generateRandom();
        $("#duck").css({
          top: newPos[0],
          left: newPos[1]
        });
        animateDuck();
    });
  });


});
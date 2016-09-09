$(document).ready(function() {


  var $duck = $('.duck')
  $duck.mouseover(function() {
    $(this).addClass('red');
  }).mouseleave(function() {
    $(this).removeClass('red');
  });

  var move = function() {
    console.log("something");
    if ($duck.css("left").slice(0,-2) > 400) {
      $duck.removeClass('flipped');
      $duck.animate({
        left: "-=100"
      });
    } else {
      $duck.addClass('flipped');
      $duck.animate({
        left: "+=100"
      });
    }
  }

  window.setInterval(move, 1000);
});


/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects
*/

$(document).ready(function() {
  $("body").append('<div class="target"></div>');

  $("#pic").mousemove(function(action) {
    $(".target").css({
      top: action.pageY - 25 + "px",
      left: action.pageX - 25 + "px"
    });
  });

  $(window).hover(
    function() {
      $(".target").show();
    },
    function() {
      $(".target").hide();
    }
  );

  $(".target").click(function(selected) {
    $(".target")
      .addClass("tagger")
      .removeClass("target");
  });
});




// spacing

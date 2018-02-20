
/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://1stwebdesigner.com/image-tagging-tutorial/

  https://stackoverflow.com/questions/22833253/simple-image-tagging-page-like-facebook-image-tag#23129551
*/

$(document).ready(function() {
  $("body").append('<div class="target"></div>');

  $("#pic").mousemove(function(action) {
    $(".target").css({
      left: action.pageX - 25,
      top: action.pageY - 25
    });
  });

  $(window).mouseleave(function() {
    $(".target").hide();
  });

  $(window).mouseenter(function() {
    $(".target").show();
  });

  /*

  $("").click(function(selected) {

  });

  */

});

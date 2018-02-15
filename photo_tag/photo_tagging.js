
/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://1stwebdesigner.com/image-tagging-tutorial/

  https://stackoverflow.com/questions/22833253/simple-image-tagging-page-like-facebook-image-tag#23129551

  https://stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div#3385953
*/

$(document).ready(function() {
  $("body").append($('<div/>').addClass('target'));

  $("#pic").mousemove(function(action) {
    $(".target").css({
      left: action.pageX - 25,
      top: action.pageY - 25
    });
  });

  $("").click(function(selected) {
    
  });

});

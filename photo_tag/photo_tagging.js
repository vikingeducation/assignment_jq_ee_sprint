
/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  needs to be possible to return to targeting mode after an option has been
  selected, and allow for multiple tags to be added - likely means list
  element / tag / css assigned to relevant elements will have to be created
  on the fly rather than through classes / pre-built elements and name
  associated with tag should probably be turned into a new static element
  rather than the current select
*/

$(document).ready(function() {
  $(".list").css({
    position: "absolute",
    border: 6 + "px solid green",
    backgroundColor: "white",
    marginTop: 50 + "px",
    display: "none"
  });

  $("body").append('<div class="tagger"></div>');

  $(".tagger").css({
    position: "absolute",
    border: 8 + "px dashed blue",
    height: 50 + "px",
    width: 50 + "px"
  });

  $("#pic").mousemove(function(action) {
    $(".tagger").css({
      top: action.pageY - 50 + "px",
      left: action.pageX - 50 + "px"
    });
  });

  $(window).hover(
    function() {
      $(".tagger").show();
    },
    function() {
      $(".tagger").hide();
    }
  );

  $(".tagger").click(function() {
    $(".tagger").css({
      border: 8 + "px solid green"
    });

    $(".list").css("display", "initial");

    $(".tagger").append($(".list"));

    $(".tagger").attr("class", "tag");
  });

  if ($(".list").val() != "blank") {
    $("body").append('<div class="tagger"></div>');
  }

  $("#pic").click(function() {
    $(".list").css("display", "none");

    $(".tag").css({
      border: 8 + "px dashed blue"
    });

    $(".tag").attr("class", "tagger");
  });

});


// spacing

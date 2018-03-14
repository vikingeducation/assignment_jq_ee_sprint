
/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects
*/

$(document).ready(function() {
  $(".list").css({
    position: "absolute",
    border: 6 + "px solid green",
    backgroundColor: "white",
    marginTop: 50 + "px",
    display: "none"
  });

  $(window).hover(
    function() {
      $(".tagger").show();
    },
    function() {
      $(".tagger").hide();
    }
  );

  function createTagger() {
    $("body").append('<div class="tagger"></div>');

    $(".tagger").css({
      position: "absolute",
      border: 8 + "px dashed blue",
      height: 50 + "px",
      width: 50 + "px",
    });

    $(".tagger").click(function(action) {
      action.stopPropagation();

      $(".tagger").css({
        position: "absolute",
        border: 8 + "px solid green",
        height: 50 + "px",
        width: 50 + "px"
      });

      $(".list").css("display", "initial");

      $(".tagger").append($(".list"));

      $(".tagger").attr("class", "tag");
    });
  }

  $("#pic").mousemove(function(action) {
    $(".tagger").css({
      top: action.pageY - 50 + "px",
      left: action.pageX - 50 + "px"
    });
  });

  $(".list").click(function(trigger) {
    trigger.stopPropagation();

    if ($(".list").val() != "blank") {
      createTagger();
    }
  });

  $("#pic").click(function() {
    $(".list").css("display", "none");

    $(".tag").css({
      position: "absolute",
      border: 8 + "px dashed blue",
      height: 50 + "px",
      width: 50 + "px"
    });

    $(".tag").attr("class", "tagger");
  });

  createTagger();
});


// spacing


/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  1. switch to using ID's instead of classes
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

      $(".tagger").append($(".list"));

      $(".list").css("display", "initial");

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
      var parent = $(".list").parent(),
          name = $(".list").val();

      parent.prepend('<span></span>');

      var label = $(".list").parent().children("span");

      label.html(name);

      $(".list").css("display", "none");

      label.css({
        position: "absolute",
        border: 6 + "px solid green",
        backgroundColor: "white",
        marginTop: 50 + "px",
        padding: 7 + "px",
        opacity: "inherit"
      });

      parent.addClass("locked");

      $(".locked").hover(
        function() {
          $(".locked").css("opacity", "1");
        },
        function() {
          $(".locked").css("opacity", "0");
        }
      );

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

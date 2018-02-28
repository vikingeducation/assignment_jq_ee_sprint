
/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects
*/

$(document).ready(function() {
  $("body").append('<div class="target"></div>');

  $("#pic").mousemove(function(action) {
    $(".target").css({
      top: action.pageY - 50 + "px",
      left: action.pageX - 50 + "px"
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

  $(".target").click(function() {
    $(".target")
      .addClass("tagger")
      .removeClass("target");

    $(".list").removeClass("hide");

    $(".tagger").append($(".list"));

    $("#pic").click(function() {
      $(".tagger")
        .addClass("target")
        .removeClass("tagger");

      $(".list").addClass("hide");
    });

    if ($(".list").val() != "blank") {
      $("body").append('<div class="target"></div>');
    }

/*
  needs to be possible to return to targeting mode after an option has been
  selected, and allow for multiple tags to be added
*/

  });
});



// spacing

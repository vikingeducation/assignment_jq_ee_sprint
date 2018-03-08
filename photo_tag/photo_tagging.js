
/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects
*/

$(document).ready(function() {
  $("body").append('<div id="target" class="tagger"></div>');

// not broken because of listener assignment, but because of target as ID instead of class

  $("#target").css({
    position: "absolute",
    border: 8 + "px dashed blue",
    height: 50 + "px",
    width: 50 + "px"
  });

  $("#pic").mousemove(function(action) {
    $("#target").css({
      top: action.pageY - 50 + "px",
      left: action.pageX - 50 + "px"
    });
  });

  $(window).hover(
    function() {
      $("#target").show();
    },
    function() {
      $("#target").hide();
    }
  );

  $(".tagger").click(function() {
    $("#target").css({
      border: 8 + "px solid green"
    });

    $("#list").removeClass("hide");

    $("#target").append($("#list"));

    $("#target").attr("id", "tag");

    $("#pic").click(function() {
      $("#list").addClass("hide");

      $("#tag").css({
        border: 8 + "px dashed blue"
      });

      $("#tag").attr("id", "target");
    });

    if ($("#list").val() == "blank" || $("#list").hasClass("hide")) {
    } else {
      $("body").append('<div id="target"></div>');
    }

/*
  needs to be possible to return to targeting mode after an option has been
  selected, and allow for multiple tags to be added - likely means list
  element / tag / css assigned to relevant elements will have to be created
  on the fly rather than through classes / pre-built elements and name
  associated with tag should probably be turned into a new static element
  rather than the current select
*/

  });
});



// spacing


/*
  cd Documents/Viking/JS/jq_sprint/photo_tag

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects
*/

$(document).ready(function() {
  var pic = $("#pic");

  $("body").append('<div id="target"></div>');

  $("#target").css({
    position: "absolute",
    border: 8 + "px dashed blue",
    height: 50 + "px",
    width: 50 + "px"
  });

  pic.mousemove(function(action) {
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

  $("#target").click(function(action) {
    $("#target").css({
      border: 8 + "px solid green"
    });

    $("#list").removeClass("hide");

    $("#target").append($("#list"));

    $("#target").attr("id", "tag");

    pic.click(function() {
      $("#list").addClass("hide");

      $("#tag").css({
        border: 8 + "px dashed blue"
      });

      $("#tag").attr("id", "target");
    });

    console.log($("#list").val())
    console.log($("#list").hasClass("hide"))

    if ($("#list").val() = "blank" || $("#list").hasClass("hide")) {
    } else {
      $("body").append('<div id="target"></div>');
    }

/*
  needs to be possible to return to $("#target")ing mode after an option has been
  selected, and allow for multiple tags to be added - likely means $("#list")
  element / tag / css assigned to relevant elements will have to be created
  on the fly rather than through classes / pre-built elements and name
  associated with tag should probably be turned into a new static element
  rather than the current select
*/

  });
});



// spacing

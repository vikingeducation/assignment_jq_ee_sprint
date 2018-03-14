
$(document).ready(function() {
  $("#list").css({
    position: "absolute",
    border: 6 + "px solid green",
    backgroundColor: "white",
    marginTop: 50 + "px",
    display: "none"
  });

  $(window).hover(
    function() {
      $("#tagger").show();
    },
    function() {
      $("#tagger").hide();
    }
  );

  function createTagger() {
    $("#tagger").detach();

    $("body").append('<div id="tagger"></div>');

    $("#tagger").css({
      position: "absolute",
      border: 8 + "px dashed blue",
      height: 50 + "px",
      width: 50 + "px"
    });

    $("#tagger").click(function(action) {
      action.stopPropagation();

      $("#tagger").css({
        position: "absolute",
        border: 8 + "px solid green",
        height: 50 + "px",
        width: 50 + "px"
      });

      $("#tagger").append($("#list"));

      $("#list").css("display", "initial");

      $("#tagger").attr("id", "tag");
    });
  }

  $("#pic").mousemove(function(action) {
    $("#tagger").css({
      top: action.pageY - 50 + "px",
      left: action.pageX - 50 + "px"
    });
  });

  $("#list").click(function(trigger) {
    trigger.stopPropagation();

    if ($("#list").val() != "blank") {
      var parent = $("#list").parent(),
        name = $("#list").val();

      parent.prepend("<span></span>");

      var label = parent.children("span");

      label.html(name);

      $("#list").css("display", "none");

      label.css({
        position: "absolute",
        border: 6 + "px solid green",
        backgroundColor: "white",
        marginTop: 50 + "px",
        marginLeft: -4 + "px",
        padding: 7 + "px",
        opacity: "inherit"
      });

      parent.append('<span class="remove">&#935</span>');

      $(".remove").css({
        position: "absolute",
        border: 4 + "px solid green",
        backgroundColor: "black",
        color: "red",
        marginTop: -28 + "px",
        marginLeft: 39 + "px",
        opacity: "inherit"
      });

      $(".remove").click(function(source) {
        var root = $(source.target);

        var parent = $(root.parent());

        parent.detach();
      });

      parent.addClass("locked");

      $(".locked").hover(
        function() {
          $(".locked").css("opacity", "1");
        },
        function() {
          $(".locked").css("opacity", ".4");
        }
      );

      createTagger();
    }
  });

  $("#pic").click(function() {
    $("#list").css("display", "none");

    $("#list")
      .parent()
      .css({
        position: "absolute",
        border: 8 + "px dashed blue",
        height: 50 + "px",
        width: 50 + "px"
      });

    $("#list")
      .parent()
      .attr("id", "tagger");
  });

  createTagger();
});

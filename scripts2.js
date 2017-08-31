$(document).ready(function() {
  $(document).on("mousemove", "img", function(e) {
    $("#follower").offset({
      left: e.pageX - 55,
      top: e.pageY - 55
    });
  });

  // Tag constructor
  function Tag(xPos, yPos) {
    // Persist position data to new instance
    this.xPos = xPos;
    this.yPos = yPos;

    // Append new div to container
    // Assign position data through CSS and add 'tag' class
    $(".container").append("<div></div>");
    this.newDiv = $(".container")
      .children()
      .last()
      .offset({
        left: xPos - 55,
        top: yPos - 55
      })
      .addClass("tag");
  }

  var displayNames = function(xPos, yPos) {
    $("ul")
      .css({
        left: xPos - 55,
        top: yPos + 55
      })
      .show();
  };

  var selectName = function(xPos, yPos) {
    $("ul").on("click touchstart", ".name", function() {
      $(this).appendTo(".container").children(".tag").last();
      $(this).css({
        left: xPos - 55,
        top: yPos + 55
      });
    });
  };

  $(document).on("click touchstart", "img", function() {
    new Tag(event.pageX, event.pageY);
    displayNames(event.pageX, event.pageY);
    selectName(event.pageX, event.pageY);
  });

  $(document).on("mouseleave", "img", function() {
    $(".container").children(".tag").hide();
  });

  $(document).on("mouseenter", "img", function() {
    $(".container").children(".tag").show();
  });
});

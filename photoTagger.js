$(document).ready(function() {

$(".selectorBox").on("mousemove", function(e) {
    $(".selectorBox").css({
      left: e.pageX - 25,
      top: e.pageY - 25
    });
  });

//shows the selector box when hovering over the image
$("#image1")
  .mouseenter(function () {
    $(".selectorBox").removeClass("hidden");
  })
  .mouseleave(function () {
    $(".selectorBox").addClass("hidden");
  })
  .click(function() {
    $(".nameSelection").appendTo(document.body).slideDown("slow");
  })

});

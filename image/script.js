var crew = ["Picard", "Diana", "Richer", "Worf", "Data", "Jordy", "Diana"];

var $targetBox = $(".target-box");

var $mouseX, $mouseY, $xp, $yp;

// mouse enter creates red box
$(".tagable-photo img").on("mouseenter", (function(e) {
  $(".target-box").addClass('show');
}));

// on mouse move reposition
$(".tagable-photo img").on("mousemove", (function(e) {
  $(".target-box").offset({ top: e.pageY - 50,
                           left: e.pageX - 50
                         });
}));

// on mouse exit toggle off
$(".tagable-photo img").on("mouseleave", (function(e) {
  $(".target-box").removeClass('show');
}));

$(".tagable-photo img").on("click", (function(e) {
  $(".target-box").removeClass('show');
  $(".target-box").append(".placed-box");
  $(".placed-box").offset({ top: e.pageY - 50,
                           left: e.pageX - 50
                         });
}));


$(document).ready(function() {
  var part = $("li");

  $(".empty")
    .siblings()
    .slideUp(1);

  part.click(function(selected) {
    var self = $(this),
      others = self.siblings(),
      count = others.length;

    others.slideToggle(1000, function() {
      count--;
      if (count === 0) {
        self.prependTo("ul");
      }
    });
  });

  part.hover(
    function() {
      var unfanned = $(this)
        .siblings()
        .is(":hidden");
      if (unfanned) {
        return;
      } else {
        $(this).css({
          "background-color": "yellow",
          cursor: "pointer"
        });
      }
    },
    function() {
      $(this).css({
        "background-color": "initial",
        cursor: "initial"
      });
    }
  );
});

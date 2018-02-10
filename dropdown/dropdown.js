/*
  cd Documents/Viking/JS/jq_sprint/dropdown

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://stackoverflow.com/questions/19222300/slidetoggle-and-li-repeated-clicking-reorder-the-list
*/

$(document).ready(function() {
  var _li = $("li");

  $(".empty")
    .siblings()
    .slideUp(1);

  _li.click(function(selected) {
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

  _li.hover(
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

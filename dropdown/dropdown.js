/*
  cd Documents/Viking/JS/jq_sprint/dropdown

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  TODO form submission

  https://api.jquery.com/jQuery.post/

  using jQueries .post() create a function that after a user make their choice
  that option is grabbed, submit'ed to "the server", and console.log'ed
*/

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

    $.post("#",
    { "choice": self },
    function(test, argy) {
      console.log(test)
      console.log(argy)
      console.log(self)
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
    });

});

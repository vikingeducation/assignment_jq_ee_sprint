
/*
  cd Documents/Viking/JS/jq_sprint/dropdown

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://stackoverflow.com/questions/19222300/slidetoggle-and-li-repeated-clicking-reorder-the-list
*/

$("li").click(function(selected) {
  var list = $("ul");
  var self = $(this);
  var test = 0;
  list.children().slideToggle(1800, function() {
    test += 1
    console.log("adding" + test)
    if (test === 4) {
      console.log("super broke")
      fix()
    }
  });

  function fix() {
    console.log("mega broke")
    list.prepend(self);
  }
});

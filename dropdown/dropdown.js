
/*
  cd Documents/Viking/JS/jq_sprint/dropdown

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://stackoverflow.com/questions/9279842/make-an-unordered-list-into-a-drop-down-menu#9280645

  https://stackoverflow.com/questions/19222300/slidetoggle-and-li-repeated-clicking-reorder-the-list
*/

$("ul").click(function(action) {
  action.preventDefault();
  $('ul').children().slidetoggle(1800);
});

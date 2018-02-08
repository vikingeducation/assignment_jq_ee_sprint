
/*
  cd Documents/Viking/JS/jq_sprint/dropdown

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://stackoverflow.com/questions/9279842/make-an-unordered-list-into-a-drop-down-menu#9280645
*/

$("#myList").hover(function() {
  $( this).children().slideDown(2300);
});

// $( this).children().slideToggle(2300);

$('li').click(function () {
  var self = $(this),
      siblings = self.siblings(),
      count = siblings.length,
      show = siblings.is(':hidden'),
      inprogress = siblings.is(':animated');

  if (inprogress) return;

  siblings.slideToggle(2300, function(){
    count--;
    if( count === 0 && !show){
        self.prependTo('.imp');
    }
  });
});

$("body").on("click", "li", function(event){
  var $li = $(event.target);
  var $input = $($li).parent().prev();
  $input.text($li.text());
  $li.parent().slideUp(250);
});

// $('ul').slideDown(250);

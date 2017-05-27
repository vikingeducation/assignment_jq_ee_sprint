

/*
It should smoothly slide open and closed
*/
$("#list").on("click", function(){
  $(".items").slideToggle();
})

/*
When clicked, the menu closes and that element becomes the
top-level element to indicate it has been selected.
*/
$("ul").on("click","li" ,function(){
  var $text = $(this).text();
  $("#blank").text($text);

})


/*
(Optional) Make it so your hacked-together dropdown
actually submits like a normal form element would.
 Consider how you might do so with hidden fields...???
 */

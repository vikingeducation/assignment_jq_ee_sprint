/*

When the user's mouse moves over the photo,
it should be in the center of a square "targeting"
outline (which should stand out,
so make it a noticeable color).
This outline should not show unless
the mouse is hovering over the photo.
*/



var showThis = function(){
  var $square = $('<div>',{
    id: "square"
  })
  $('#test').append($square);
}
showThis();
/*
When the user clicks, the targeting outline
becomes fixed at that location
and a simple drop-down menu slides down below it.
Pre-populate this menu with a few sample names to choose from.
*/
/*
If the user clicks away from the dropdown, "cancel"
the tagging and resume the process of having the
targeting box follow the mouse on hover.
*/
/*
If the user selects a name from the list,
assign that name to the now-fixed tag box.
The name should be displayed somewhere next to this new tag box.
*/
/*
Resume the hover-targeting phase and
allow the user to continue tagging locations in the photo.
Previous tags should remain on the
screen until the browser reloads and everything is reset.
*/
/*
(Optional) Add a "Remove Tag" link or "X" to
each tag box which allows the user to remove it from the DOM.
*/
/*
(Optional) Make the existing tag boxes
invisible until you hover over them.
*/
/*
NOTE If you have trouble with your tagger toggling visibility
over and over when you don't want it to, consider attaching
your hover listener to a container div for the image and the
mouseover listener to the image itself. Also have a look at CSS pointer-events.
 */

/*

When the user's mouse moves over the photo,
it should be in the center of a square "targeting"
outline (which should stand out,
so make it a noticeable color).
This outline should not show unless
the mouse is hovering over the photo.
*/

var test = function(){
  console.log("test");
}

var mouseIn = function(){
  $(this).on("click", showThis);
}

var mouseOut = function(){
  $(window).on("click", function(){
    $("#square").remove();
  });
}
var hovering = function(){
  $("figure").hover(mouseIn, mouseOut);
}
hovering();



/*
When the user clicks, the targeting outline
becomes fixed at that location
*/
var showThis = function(){
  showSquare();
}

var showSquare = function(){
  event.stopPropagation();
  var $square = $('<div>',{
    id: "square",
  })
  $("#square").remove();
  $square.css({
    "top": event.pageY - 38,
    "left": event.pageX - 40,
  });
  $('figure').append($square);
  addList();
  //repositions square when clicked in square
  $square.on("click", showSquare);

}

/* A simple drop-down menu slides down below it.
Pre-populate this menu with a few sample names to choose from.
*/
//List of names
var names = ['Alex', 'Eugene', 'Professor', 'Paul', 'Sylvinna', 'Origin'];
//propogates list
var addList = function(){
  var $list = $('<ul>',{
    id: "list",
  })
  $("#square").append($list);
  $list.css({
    "margin-top": "74px"
  })
  addListIems();
  setName();
}

var addListIems =  function(){
  names.forEach(function(name){
    var $listItem = $('<li>', {
      class: "list-item",
      html: name
    })
    $("#list").append($listItem);
  })
}

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
var setName = function(){
  $(".list-item").on("click", pickName);
}
//click on name on list
var pickName = function(){
  event.stopPropagation();
  var $listItem = $(".list-item");
  $listItem.on("click", setTag);
}

var setTag = function(){
  //add name to box element
  var nameElement = event.target;
  var name = $(nameElement).text();
  setBox(name);
}
//create  blue box element
var setBox = function(name){
  var $setBox = $('<div>', {
  class: "setBox",
  html: name
  })
  //fix box with name to position
  $setBox.css({ //????
    "top": $("#square").css("top"),
    "left": $("#square").css("left")
  });
  $('figure').append($setBox);
  $('#square').remove();
}





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

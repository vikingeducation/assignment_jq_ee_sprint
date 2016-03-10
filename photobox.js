$( document ).ready(function(){
  var clicked = false;
  var $puppyBox = $('#puppy-box');
  var $targetBox = $('#target');


  $('#puppy').hover( function() {
    $targetBox.toggle();
  });


  $('#puppy').on('mousemove', function(eTarget){
    if(!clicked){
      moveToMouse(eTarget);
    }
  });


  $targetBox.on('click', function(eDropdown){
    $( "#options" ).slideToggle();
    clicked = clicker(clicked);
  });


  var clicker = function(bool) {
    return !bool;
  };


  $( "ul" ).on("click", function(e) {
    console.log(e.target);
    $( "#target" ).attr( 'data-name', e.target.innerHTML );
  });


  var moveToMouse = function(evt) {
    $targetBox.css('left', evt.pageX - 50);
    $targetBox.css('top', evt.pageY - 50);
  };


});

$( document ).ready(function(){
  var clicked = false;
  var $puppyBox = $('#puppy-box');
  var $targetBox = $('#target');



  $('#puppy-box').hover( function() {
    $targetBox.toggle();
  });


  $('#puppy-box').on('mousemove', function(eTarget){
    if(!clicked){
      moveToMouse(eTarget);
    }
  });


  $('#puppy-box').on('click', function(eDropdown){
    console.log(eDropdown.target.id)
    $( "#options" ).slideToggle();
    clicked = clicker(clicked);
  });


  var clicker = function(bool) {
    return !bool;
  };


  $( "ul" ).on("click", function(e) {
    console.log(e.target);
    $( "#target" ).attr( 'data-name', e.target.innerHTML );

    $( "#puppy-box" ).append($("<div id='thetag' style='top: " + $targetBox.position().top + "; left: " + $targetBox.position().left + "; position: absolute;'></div>"))

    $('#thetag').text(e.target.innerHTML)
  });


  var moveToMouse = function(evt) {
    $targetBox.css('left', evt.pageX - 50);
    $targetBox.css('top', evt.pageY - 50);
  };



});

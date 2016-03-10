$( document ).ready(function(){
  var clicked = false;
  var $puppyBox = $('#puppy-box');
  var $targetBox = $('#target');
  var counter = 0;


  $('#puppy-box').hover( function() {
    $targetBox.toggle();
    $targetBox.css('pointer-events', 'none')
  });


  $('#puppy-box').on('mousemove', function(eTarget){
    if(!clicked){
      moveToMouse(eTarget);
    }
  });


  $('#puppy-box').on('click', function(eDropdown){
    console.log(eDropdown.target.id)
    $( "#options" ).slideToggle();
    $targetBox.css('pointer-events', 'auto')
    clicked = clicker(clicked);
  });


  var clicker = function(bool) {
    return !bool;
  };


  $( "ul" ).on("click", function(e) {
    console.log(e.target);

    $( "#target" ).attr( 'data-name', e.target.innerHTML );

    $( "#puppy-box" ).append($("<div id='thetag" + counter + "' style='top: " + $targetBox.position().top + "; left: " + $targetBox.position().left + "; position: absolute;'></div>"))
    $('#thetag' + counter).text(e.target.innerHTML)
    counter += 1;
  });


  var moveToMouse = function(evt) {
    $targetBox.css('left', evt.pageX - 50);
    $targetBox.css('top', evt.pageY - 50);
  };



});

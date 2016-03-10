
$(document).ready(function() {

  var $photoContainer = $('#photo-container');
  var $tagContainer = $("#tag-container");
  $tagContainer.css({"width": "100px", "height": "100px"});
  var getWidth = $tagContainer.width();

  $photoContainer.mousemove(function(event){

    var x = event.pageX;
    var y = event.pageY;

    var styles = {
      "left": x - getWidth / 2,
      "top": y - getWidth / 2
    };

    $tagContainer.css(styles);

  } );

  $photoContainer.hover(

    function(event) {

      $tagContainer.toggle();

    } );

} );

$(document).ready(function() {

  $("img").mousemove( function(e) {
    $("div.tag-box").show().css({
      left: e.clientX - 30,
      top: e.clientY + 200
    });
  });

  $("div.tag-box").on('click', function(e) {
    $("div.tag-box-dropdown").slideToggle(400);
    var $newBox = $("<div></div>").addClass('fixed-box')
    var offset = $("div.tag-box").offset();
    $newBox.css({
      left: offset.left ,
      top: offset.top
    });
    // .html( "left: " + offset.left + ", top: " + offset.top );
    $newBox.appendTo( $('div.sign-wrapper') );
  });



});

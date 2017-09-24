$(document).ready(function() {

  var $newBox = $("<div></div>").addClass('fixed-box');
  var $newDropdownBox = $("<div></div>").addClass('tag-box-dropdown');
  var $mouseBox = $("div.tag-box");

  $("img").mouseover( function(e) {
    if (!$('div.fixed-box').is(":visible")) {
      $mouseBox.show().appendTo( $('div.sign-wrapper') );
      $mouseBox.css({
        left: e.clientX - 30,
        top: e.clientY - 30
      });
    }
  });

  $("div.tag-box").on('click', function(e) {
    var offset = $("div.tag-box").offset();
    $newBox.css({
      left: offset.left ,
      top: offset.top
    });
    $newBox.appendTo( $('div.sign-wrapper') );
    $newDropdownBox.hide().appendTo($newBox);
    $('ul#tagging').appendTo($newDropdownBox);
    $('<li>Andrea</li>').appendTo($('ul#tagging'));
    $('<li>Darek</li>').appendTo($('ul#tagging'));
    $('<li>Mirek</li>').appendTo($('ul#tagging'));


    // $("div.tag-box-dropdown").appendTo( $('div.fixed-box') );
    $("div.tag-box-dropdown").slideDown(400);

    $("div.fixed-box").mouseleave( function(e) {
      $("div.tag-box").remove();
    });
  });

  $("li").click(function() {
    $("div.tag-box-dropdown").slideUp(400);
    var $name = $("<div></div>").addClass('name');
    $name.text( $(this).text() );
    $name.appendTo( $('div.fixed-box') );
    $newBox.addClass('test-box').removeClass('fixed-box');
    $newDropdownBox.remove();
  });

});

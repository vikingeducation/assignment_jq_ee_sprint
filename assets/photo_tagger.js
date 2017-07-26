"use strict";
$( document ).ready(function() {


  $( 'div.photo-container' ).on('click', 'img', function(e){
    var boxSize = $( '.tag-box' ).css('width').slice(0, -2);
    var newTop = (e.pageY - (boxSize / 2));
    var newLeft = (e.pageX - (boxSize / 2));
    $('.tag-box').css('top', newTop);
    $('.tag-box').css('left', newLeft);
  });


});
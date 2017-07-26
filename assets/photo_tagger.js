"use strict";
$( document ).ready(function() {

    // on hover over image
    $('div.photo-container').on('mouseenter', 'img', function(e){
      // create a tagging box
      var $dropdown = $('<select></select>')
                      .append('<option value="1">Bret</option>')
                      .append('<option value="2">Jemaine</option>')
                      .append('<option value="3">Murray</option>')
                      .append('<option value="4" selected>Mel</option>');

      var boxSize = 100;

      var $tagBox = $('<div></div>')
                    .addClass('tag-box')
                    .append($dropdown)
                    .css('top', (e.pageY - (boxSize / 2)) )
                    .css('left', (e.pageX - (boxSize / 2)) );



    });// close mouseenter


  // ------ WIP create box when click on image ----------
  // var $dropdown = $('<select></select>')
  //                 .append('<option value="1">Bret</option>')
  //                 .append('<option value="2">Jemaine</option>')
  //                 .append('<option value="3">Murray</option>')
  //                 .append('<option value="4" selected>Mel</option>');

  // var $tagBox = $('<div></div>')
  //                 .addClass('tag-box')
  //                 .append($dropdown);


  // $('div.photo-container').on('click', 'img', function(e){
  //   var boxSize = $('.tag-box').css('width').slice(0, -2);
  //   var newTop = (e.pageY - (boxSize / 2));
  //   var newLeft = (e.pageX - (boxSize / 2));
  //   $('.tag-box').css('top', newTop);
  //   $('.tag-box').css('left', newLeft);
  // });


});
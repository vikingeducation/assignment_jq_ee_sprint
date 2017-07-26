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

      // insert new box in that location
      $(this).parent().append($tagBox);

      // on mousemove, follow the cursor with the div
      $('div.photo-container').on('mousemove', $tagBox, function(e){
        $tagBox.css({
                 top:   (e.pageY - (boxSize / 2)),
                 left:  (e.pageX - (boxSize / 2))
              });
        // on click of that box
        $('div.photo-container').on('click', $tagBox, function(e){
          console.log('test');
          // // get click locations (X,Y) and stop following
          // $('div.photo-container').off("mousemove", $tagBox);
          // $tagBox.css({
          //          top:   (e.pageY - (boxSize / 2)),
          //          left:  (e.pageX - (boxSize / 2))
          //       });
        });//close click
      });//close mousemove


      // when the cursor leaves, hide the box
      // $('div.photo-container').on('mouseout', $tagBox, function(e){
      //   $tagBox.css('display', 'none');
      // });


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
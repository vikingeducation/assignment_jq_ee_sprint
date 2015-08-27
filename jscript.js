"use strict"

$( document ).ready(function() {
  $('#bob').hide();

  $(".container").mousemove(
    function(e){
      $('#bob').show();
      $('#bob').css({
         left:  e.pageX - 40,
         top:   e.pageY - 40
      });
    }
    // function() {
    //   $('#bob').hide();
    // }
  );

  $(".container").mouseout(
    function() {
      $('#bob').hide();
    }
    );

  $("#bob").click(function(e){
    // console.log("clicked");
    var box = createTaggingBox(e.pageX, e.pageY);
    box.appendTo($('body'));
      });

  function createTaggingBox(x, y) {
    var box = $('<div>').addClass('tagging');
    box.css({
         left:  x - 40,
         top:   y - 40
      });
    return box;
  }

  var list = $("<ul></ul>");








});
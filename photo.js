$(document).ready( function() {


  var makeTagger = function() {
    // create tag div
    $(event.target).after("<div class='tagger'></div>");
    trackMouse();
  }


  var deleteTagger = function() {
    // delete tag div
    $('.tagger').remove();
    //stop tracking mouse
    $(document).off("mousemove", mouse);
  }


  $('img').hover( makeTagger, deleteTagger );


  // on mouse move make div follow mouse
  var trackMouse = function() {
    $('img').mousemove( function() {
      $('.tagger').css('left', event.pageX - 32);
      $('.tagger').css('top', event.pageY - 32);
    });
  }

  // on click, stop tracker mouse movement


})
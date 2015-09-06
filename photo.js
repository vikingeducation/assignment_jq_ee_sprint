$(document).ready( function() {


  var makeTagger = function() {
    $(event.target).after("<div class='tagger'></div>");
    setTaggerPosition(event.pageX, event.pageY);
    //$('.tagger').css('left', event.pageX - 32);
    //$('.tagger').css('top', event.pageY - 32);
    trackMouse();
  }

  var setTaggerPosition = function(x, y) {
    $('.tagger').css('left', x - 32);
    $('.tagger').css('top', y - 32);
  }


  var deleteTagger = function() {
    $('.tagger').remove();
    //stop tracking mouse
    //$(document).off("mousemove", mouse);
  }


  $('img').mouseenter( makeTagger );


  // on mouse move make div follow mouse
  var trackMouse = function() {
    $image = $('img');
    var minX = $image.offset().left
    var minY = $image.offset().top;
    var maxX = minX + $image.width();
    var maxY = minY + $image.height();

    $('.tagger').mousemove( function() {
      setTaggerPosition(event.pageX, event.pageY);

      if (event.pageX < minX || event.pageX > maxX || event.pageY < minY || event.pageY > maxY) {
        deleteTagger();
      };
    });

    // smooth out very fast mouse moves
    $('img').mousemove( function() {
      setTaggerPosition(event.pageX, event.pageY);
    });
  }

  // on click, stop tracker mouse movement


})
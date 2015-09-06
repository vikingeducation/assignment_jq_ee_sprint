$(document).ready( function() {


// Create & Deleting functions
  var makeActiveTagger = function() {
    if ($('.active').length === 0) {
      $(event.target).after("<div class='tagger active'></div>");
      trackMouse();
    }
  }


  var deleteActiveTagger = function() {
    $('.active').remove();
  }




// Movement functions
  var setActivePosition = function(x, y) {
    $('.active').css('left', x - 32);
    $('.active').css('top', y - 32);
  }


  var trackMouse = function() {
    $image = $('img');
    var minX = $image.offset().left
    var minY = $image.offset().top;
    var maxX = minX + $image.width();
    var maxY = minY + $image.height();

    $('.active').mousemove( function() {
      setActivePosition(event.pageX, event.pageY);

      if (event.pageX < minX || event.pageX > maxX || event.pageY < minY || event.pageY > maxY) {
        deleteActiveTagger();
      };
    });

    // smooth out very fast mouse moves
    $('img').mousemove( function() {
      setActivePosition(event.pageX, event.pageY);
    });

    $('.active').click( freezeActiveTagger );
  }


// Tagging functions
  var freezeActiveTagger = function() {
    $(document).off('mousemove');
    // select name
    confirmTag();
    // confirmTag
  }

  var confirmTag = function() {
    var $tagger = $('.active');
    $tagger.removeClass('active');
  }


// Event listeners
  $('img').mouseenter( makeActiveTagger );


})
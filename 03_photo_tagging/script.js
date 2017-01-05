var $hoverTaggingBox = jQuery('.hover-tagging-box');
$('.photo-tagging img')
  .on('mousemove', function(event) {
    $hoverTaggingBox.css({
      left: event.pageX - 50,
      top: event.pageY - 50,
      display: "block"
    });
  }).on('mouseout', function(event) {
    $hoverTaggingBox.hide();
  }).on('click', function(event) {
    var $placedBox = $('<div>')
      .addClass('placed-tagging-box')
      .css({
        left: event.pageX - 50,
        top: event.pageY - 50
      })
    $('.photo-tagging').append($placedBox);
  });

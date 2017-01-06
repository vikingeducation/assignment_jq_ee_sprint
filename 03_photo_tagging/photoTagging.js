var $hoverTaggingBox = jQuery('.hover-tagging-box');

var names = ["Twilight Sparkle", "Pinkie Pie", "Applejack", "Rainbow Dash", "Rarity", "Fluttershy"];

var calcBoxCoords = function(event) {
  var $img = $(event.target);
  var imageEdges = {
    top: $img.offset().top,
    right: $img.offset().left + $img.width(),
    bottom: $img.offset().top + $img.height(),
    left: $img.offset().left
  };
  // check imageEdges
  // $("<div>").width(10).height(10).css({
  //   border: '1px solid red',
  //   top: imageEdges.bottom,
  //   left: imageEdges.right,
  //   position: 'absolute'
  // }).appendTo('body')

  var x = event.pageX - 50;
  var y = event.pageY - 50;
  var boxSize = 106;

  if (x < imageEdges.left) { x = imageEdges.left; }
  if (x + boxSize > imageEdges.right) { x = imageEdges.right - boxSize; }
  if (y < imageEdges.top) { y = imageEdges.top; }
  if (y + boxSize > imageEdges.bottom) { y = imageEdges.bottom  - boxSize; }

  return {
    x: x,
    y: y
  };
};

$('.photo-tagging img')
  .on('mousemove', function(event) {
    var boxCoords = calcBoxCoords(event);
    $hoverTaggingBox.css({
      left: boxCoords.x,
      top: boxCoords.y,
      display: "block"
    });
  }).on('mouseout', function(event) {
    $hoverTaggingBox.hide();
  }).on('click', function(event) {
    var boxCoords = calcBoxCoords(event);
    var $placedBox = $('<div>')
      .addClass('placed-tagging-box')
      .css({
        left: boxCoords.x,
        top: boxCoords.y,
      });
      var $label = $('<div>').appendTo($placedBox);
      var $ul = $('<ul>').appendTo($placedBox);
      $.each(names, function(index, name) {
        var $li = $('<li>').text(name);
        $ul.append($li);
      });
    $('body').append($placedBox);
  });

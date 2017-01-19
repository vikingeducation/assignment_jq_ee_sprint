var crew = ["Picard", "Beverly", "Richer", "Worf", "Data", "Jordy", "Diana"];
var currentTag;
var $targetBox = $(".target-box");

var $mouseX, $mouseY, $xp, $yp;

// mouse enter creates red box
$(".tagable-photo img").on("mouseenter", (function(e) {
  $(".target-box").addClass('show');
}));

// on mouse move reposition
$(".tagable-photo img").on("mousemove", (function(e) {
  $(".target-box").offset({ top: e.pageY - 50,
                           left: e.pageX - 50
                         });
}));

// on mouse exit toggle off
$(".tagable-photo img").on("mouseleave", (function(e) {
  $(".target-box").removeClass('show');
}));

var handleDrop = {
  toggle: function() {
    $(".options").toggleClass('show');
  },

  makePick: function() {
    var $selection = $(this).text();
    var $display = $("#" + currentTag);
    // var test = this.parent();
    $display.text($selection);
    handleDrop.toggle($(".dropDown"));
    $display.addClass("tag-to-bottom");
  }
};

var randomID = function() {
  var return_id = Math.random().toString().slice(2);
  return return_id;
};

var setTag = function(e) {
  currentTag = randomID();
  var $tagContainer = $('<div>').addClass("tag-container")
                                .appendTo(".tagable-photo")
                                .offset({ top: e.pageY - 50,
                                         left: e.pageX - 50 });
  var $placedBox = $('<div>').addClass("placed-box")
                             .appendTo($tagContainer);
  var $tag = $('<div>').insertAfter($placedBox)
                       .addClass("option-display")
                       .attr("id", currentTag);
  var $button = $('<button>').addClass("dropDown")
                             .attr('id', 'display')
                             .appendTo($tag);
  var $option = $('<div>').insertAfter($button)
                          .addClass("options");
  var $options = $('<ul>').appendTo($option)
                          .addClass("options");
  $.each(crew, function(i, name){
    var $li = $('<li>').text(name)
                       .appendTo($options);
  });
};

$(".tagable-photo img").on("click", (function(e) {
  $(".target-box").removeClass('show');
  setTag(e);
  var $selection = $("li");
  $selection.on("click", handleDrop.makePick);
}));

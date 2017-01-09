var handleDrop = {
  toggle: function() {
    $(".options").toggleClass('show');
  },

  makePick: function() {
    // console.log($(this).text());
    var $selection = $(this).text();
    var $display = $("#display"); //how do I use fewer ids?
    $display.text($selection);
    handleDrop.toggle($(".dropDown"));
  }
};

$(document).ready(function() {
  var $dropDown = $(".dropDown");
  var $selection = $("li");
  $dropDown.on("click", handleDrop.toggle);
  $selection.on("click", handleDrop.makePick);
});

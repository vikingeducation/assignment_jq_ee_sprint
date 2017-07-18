$(document).ready(function() {

  $('img').on({
    mouseenter: function() {
      var $box = $('<div></div>')
        .addClass('box');
      $('#img-container').append($box);
    },
    mouseleave: function() {
      $(".box").remove();
    },
    mousemove: function(e) {
      $(".box").css({left: e.pageX - 30, top: e.pageY - 30});
    },
    click: function(e) {
      var $fixedBox = $('<div></div>')
        .addClass('fixed-box');
      $(".box").remove();
      $('#img-container').append($fixedBox);
      $fixedBox.css({left: e.pageX -30, top: e.pageY - 30});
      var $options = $('<ul></ul>')
        .addClass('options')
        .css({left: e.pageX - 60, top: e.pageY + 30});
      $options.append('<li>jeff</li>')
        .append('<li>steve</li>')
        .append('<li>frank</li>');
      $fixedBox.after($options);
      $options.hide();
      $options.slideDown();
    }
  });

  $("li").click(function() {
    console.log('clicked');
    var $selectedOption = $('<div></div>')
      .addClass("selected");
    var text = $(this).text();
  });

});

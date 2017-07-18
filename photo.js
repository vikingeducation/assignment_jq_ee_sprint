$(document).ready(function() {

  $('img').on({
    mouseenter: function() {
      var $box = $('<div></div>')
        .addClass('box');
      $('body').append($box);
    },
    mouseleave: function() {
      $(".box").remove();
    },
    mousemove: function(e) {
      $(".box").css({left: e.pageX - 30, top: e.pageY - 30});
    },
    click: function(e) {
      $(".box").remove();
      var $fixedBox = $('<div></div>')
        .addClass('fixed-box');
      $('#img-container').append($fixedBox);
      $fixedBox.css({left: e.pageX - 30, top: e.pageY - 30});
    }
  });

});

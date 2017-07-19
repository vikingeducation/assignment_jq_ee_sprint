$(document).ready(function() {

  //box that follows mouse
  var $box = $('<div></div>')
    .addClass('box');
  $('#img-container').append($box);
  $box.hide();

  //box while picking name
  var $tempBox = $('<div></div>')
    .addClass('temp-box');
  $('#img-container').append($tempBox);
  $tempBox.hide();

  //list of names
  var $options = $('<ul></ul>')
    .addClass('options')
    .append('<li>jeff</li>')
    .append('<li>steve</li>')
    .append('<li>frank</li>');
  $tempBox.after($options);
  $options.hide();

  var optionsLeft;
  var optionsTop;
  var tempBoxLeft;
  var tempBoxTop;

  $('img').on({
    mouseenter: function() {
      $box.show();
    },
    mouseleave: function() {
      $box.hide();
    },
    mousemove: function(e) {
      $box.css({
        left: e.pageX - 30,
        top: e.pageY - 30
      });
    }
  });

  $('img').click(function(e) {
    if ($tempBox.is(":hidden")) {
      optionsLeft = e.pageX - 60;
      optionsTop = e.pageY + 30;
      tempBoxLeft = e.pageX - 30;
      tempBoxTop = e.pageY - 30;
      $box.hide();
      $tempBox.show()
        .css({
          left: tempBoxLeft,
          top: tempBoxTop
        });
      $options.css({
        left: optionsLeft,
        top: optionsTop
      });
      $options.slideDown();
    }
  });

  $("#img-container").on('click', 'li', function(e) {
    var text = $(this).text();
    var $fixedBox = $('<div></div>')
      .addClass('fixed-box')
      .css({
        left: tempBoxLeft,
        top: tempBoxTop
      })
      .append(text);
    $options.hide();
    $tempBox.hide();
    $('#img-container').append($fixedBox);
  });

  $('body').click(function(e) {
    if($tempBox.is(":visible") && $(e.target).is("h1")) {
      $tempBox.hide();
      $options.hide();
      $box.show();
    }
  });

});

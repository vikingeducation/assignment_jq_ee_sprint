var photoTagging = {
  init: function() {
    photoTagging.target();
    photoTagging.pinTarget();
  },

  target: function() {
    // box appears and follows mouse around over image
    $('img').mousemove( function(event) {
      $('body').append("<div class='hover-box'></div>")
      $box = $('.hover-box')
      $box.offset({
        left: event.pageX,
        top: event.pageY,
      } );
      // photoTagging.hoverBox(event);
    } );

    // box disappears when mouse leaves image
    $('img').mouseout( function(event) {
      $box = $('.hover-box');
      $box.remove();
    });
  },

  createPin: function() {
    $pin = $("<div></div>").addClass("pin-box");
    return $pin;
  },

  createMenu: function() {
    console.log('menu working')
    $menu = $("<ul class='select'>");
    options = ['aaa', 'bbb', 'ccc', 'ddd'];
    $.each(options, function(i, name) {
      $("<li class='option'>").text(name).appendTo($menu);
    });
    $('body').append($menu);
    console.log($menu);
  },

  pinTarget: function(event) {
    $('img').click( 
      // clicking on img renders pin + tag menu
      function(event) {
      $('body').append( photoTagging.createPin() );
      $('.pin-box').offset({left: event.pageX, top: event.pageY});

      photoTagging.createMenu();
      $menu = $('.select');
      $menu.offset({
        left: event.pageX - 30, 
        top: event.pageY + 45 });
      $('.option').slideDown();
      photoTagging.selectTag();
    } ) ;
  },

  selectTag: function(event) {
    $('.pin-box').addClass('pin').removeClass('pin-box');
    $('.option').click( function(event) {
      $target = $(event.target);
      $('.option').replaceWith($target);
      $target.removeClass('option');
      $target.parent().removeClass('select');
    } );
  }

};

$( document ).ready( function() {
  photoTagging.init();
});
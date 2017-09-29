$(document).ready(function() {

  // var $mouseBox = $("div.tag-box").css('pointer-events', 'none');
  var $mouseBox = $("div.mouse-box");
  var $clickedBox = $("div.tag-box").hide();
  var clicker = "no";
  $("div.tag-box-dropdown").hide();

  $("#img-container img").mousemove( function(e) {
    if (clicker == "no") {
      $mouseBox.css({
        left: e.clientX - 30,
        top: e.clientY - 30
      });
    }
  });

  // $('#img-container img').mouseenter(function(e) {
  //   if (!$mouseBox.is(':visible')) {
  //     $mouseBox.show();
  //   }
  // });
  //
  // $("#img-container img").mouseleave( function(e) {
  //   if ($mouseBox.is(":visible")) {
  //     $mouseBox.hide();
  //   }
  // });

  $mouseBox.on('click', function(e) {
    // clicker = "yes";
    var offset = $mouseBox.offset();
    $mouseBox.hide();
    $clickedBox.css({
      left: offset.left,
      top: offset.top
    }).show();
    $("div.tag-box-dropdown").slideDown();

    $('img').not(".tag-box").click( function(e) {
      $("div.tag-box-dropdown").slideUp();
      $clickedBox.hide();
      $mouseBox.show();
    })

    $('li').click( function(e){
      $("div.tag-box-dropdown").slideUp();
      var $fixedBox = $clickedBox.clone();
      // var $fixedBox = $("<div class='tag-box fixed'></div>");
      $fixedBox.find("div.tag-box-dropdown").remove();
      $fixedBox.addClass('fixed-box');
      $fixedBox.appendTo( $('div.sign-wrapper') );
      var $choosenName = $('<div>').addClass('choosen');
      $choosenName.text( $(this).text() );
      $choosenName.appendTo('div.tag-box.fixed-box');
      $fixedBox.removeClass('tag-box');
      $(this).remove();
      $mouseBox.show();
      clicker = "no";
    });

  });

});

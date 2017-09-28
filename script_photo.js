$(document).ready(function() {

  // var $mouseBox = $("div.tag-box").css('pointer-events', 'none');
  var $mouseBox = $("div.mouse-box");
  var $clickedBox = $("div.tag-box").hide();
  // $("div.tag-box-dropdown").css('pointer-events', 'auto');
  // var clicker = "no";
  var $choosenName = $('<div>').addClass('choosen');
  $("div.tag-box-dropdown").hide();

  $("#img-container img").mousemove( function(e) {
    // if (clicker == "no") {
      $mouseBox.css({
        left: e.clientX - 30,
        top: e.clientY - 30
      });
    // }
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

    // $mouseBox.hide();
    // $mouseBox.css({
    //   left: offset.left,
    //   top: offset.top
    // });
    // clicker = "yes";

    $('li').click( function(e){
      $("div.tag-box-dropdown").slideUp();
      $fixedBox = $clickedBox.clone();
      // var $fixedBox = $("<div class='tag-box fixed'></div>");
      $fixedBox.find("div.tag-box-dropdown").remove();
      $fixedBox.addClass('fixed-box');
      $fixedBox.appendTo( $('div.sign-wrapper') );
      $choosenName.text( $(this).text() );
      $choosenName.appendTo('div.tag-box.fixed-box');
      $fixedBox.removeClass('tag-box');
      $(this).remove();
      $mouseBox.show();
      // $mouseBox = $mouseBox.clone();
      // clicker = "no";
    });

    // $('img').click( function(e) {
    //   if (clicker == "yes") {
    //     $mouseBox.css({
    //       left: e.clientX - 30,
    //       top: e.clientY - 30
    //     });
    //   }
    // });

  });

});

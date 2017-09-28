$(document).ready(function() {

  // var $mouseBox = $("div.tag-box").css('pointer-events', 'none');
  var $mouseBox = $("div.tag-box")
  // $("div.tag-box-dropdown").css('pointer-events', 'auto');
  var clicker = "no"
  var $choosenName = $('<div>').addClass('choosen');

  $("#img-container img").mousemove( function(e) {
    // if (clicker == "no") {
      $mouseBox.css({
        left: e.clientX - 30,
        top: e.clientY - 30
      });
      $("div.tag-box-dropdown").hide();
    // }
  });

  $('#img-container img').mouseenter(function(e) {
    if (!$mouseBox.is(':visible')) {
      $mouseBox.show();
    }
  });

  $("#img-container img").mouseleave( function(e) {
    if ($mouseBox.is(":visible")) {
      $mouseBox.hide();
    }
  });

  $('img').click( function(e) {
    var offset = $("div.tag-box").offset();
    $fixedBox = $mouseBox.clone();
    $fixedBox.find("div.tag-box-dropdown").remove().addCLass('fixed-box');
    console.log($fixedBox);
    $fixedBox.css({
      left: offset.left,
      top: offset.top
    });
    // $mouseBox.hide();
    // $mouseBox.css({
    //   left: offset.left,
    //   top: offset.top
    // });
    // clicker = "yes";
    $("div.tag-box-dropdown").slideDown();

    $('li').click( function(e){
      console.log("are you working?");
      $("div.tag-box-dropdown").slideUp();
      $choosenName.text( $(this).text() );
      $choosenName.appendTo($fixedBox);
      $("div.tag-box-dropdown ul").remove($(this));
      $fixedBox.appendTo( $('div.sign-wrapper') );
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

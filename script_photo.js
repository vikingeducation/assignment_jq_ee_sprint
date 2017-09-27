$(document).ready(function() {

  // if (clicker == "no") {
    var $mouseBox = $("div.tag-box").css('pointer-events', 'none');
  // } else {
  //   var $mouseBox = $("div.tag-box");
  // }
  var clicker = "no"
  var $choosenName = $('<div>').addClass('choosen');

  $("#img-container img").mousemove( function(e) {
    if (clicker == "no") {
      $mouseBox.css({
        left: e.clientX - 30,
        top: e.clientY - 30
      });
      $("div.tag-box-dropdown").hide();
    }
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
    $mouseBox.css({
      left: offset.left,
      top: offset.top
    });
    clicker = "yes";
    $("div.tag-box-dropdown").slideToggle();
    $mouseBox = $("div.tag-box").css('pointer-events', 'auto');


    $('li').click( function(e){
      console.log("are you working?");
      $("div.tag-box-dropdown").slideUp();
      $choosenName.text( $(this).text() );
      // $choosenName.appendTo($mouseBox);
      // $choosenName.css({
      //   left: offset.left,
      //   top: offset.top
      // });
    });
    // if () {
    //
    // } else {
    //
    // }
  });



  // $("div.tag-box").on('click', function(e) {
  //   var offset = $("div.tag-box").offset();
  //   $newBox.css({
  //     left: offset.left ,
  //     top: offset.top
  //   });
  //   $newBox.appendTo( $('div.sign-wrapper') );


  //   $newDropdownBox.hide().appendTo($newBox);
  //   $('<ul id="tagging"></ul>').appendTo($newDropdownBox);
  //   $('<li>Andrea</li>').appendTo($('ul#tagging'));
  //   $('<li>Darek</li>').appendTo($('ul#tagging'));
  //   $('<li>Mirek</li>').appendTo($('ul#tagging'));
  //
  //
  //   $("div.tag-box-dropdown").appendTo( $('div.fixed-box') );
  //   $("div.tag-box-dropdown").slideDown(400);
  //
  // });



  //
  // $("li").click(function() {
  //   $newDropdownBox.slideUp(400);
  //   var $name = $("<div></div>").addClass('name');
  //   $name.text( $(this).text() );
  //   $name.appendTo( $newBox );
  //   $newBox.addClass('test-box').removeClass('fixed-box');
  //   $newDropdownBox.remove();
  // });

});

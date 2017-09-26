$(document).ready(function() {

  var $mouseBox = $("div.tag-box").css('pointer-events', 'none');
  var $newBox = $("<div>").addClass('fixed-box');
  var clicker = "no"
  // var names = ["Johnny", "Maria", "Alex", "Sylwester"];
  // var $listNames =  $.each(names, function(index, el){
  //                   $('<li>' + el + '</li>')
  //                 });
  // var $dropDownWrapper = $('div').addClass('tag-box-dropdown');
  // var $unordList = $('ul#tagging');
  // var $newDropdownBox = $("<div></div>").addClass('tag-box-dropdown');

  $("#img-container img").mousemove( function(e) {
    if (clicker != "yes") {
      $mouseBox.css({
        left: e.clientX - 30,
        top: e.clientY - 30
      });
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
    // var $dropdown = $listNames.appendTo($unordList).appendTo($dropDownWrapper);
    var offset = $("div.tag-box").offset();
    $mouseBox.css({
      left: offset.left,
      top: offset.top
    });
    clicker = "yes"
    // $mouseBox.appendTo( $('div.sign-wrapper') );
    $("div.tag-box-dropdown").slideToggle();
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

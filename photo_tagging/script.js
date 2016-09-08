$(document).ready(function() {


  var $img = $('img');
  var $div = $("#tagger");
  var $dropdown = $('<div class="dropdown"><div class="top-drop"></div><div class= "bottom-drop"><ul><li>Matt</li><li>Johnny</li><li>Leo</li></ul></div></div>')
  var $shower = $('<div class="shower"></div>');

  var movingTag = function() {
    $img.bind('mousemove', function(e) {
      $('#tagger').css({
        left: e.pageX - 50,
        top: e.pageY - 50
      });
    });
    closeBtnFunc();
  }

  $div.on('click', function(e) {
    $div.addClass('fixed');
    $img.off('mousemove');
    var $newDrop = $dropdown.clone();
    $(".container").append($newDrop);
    $newDrop.css({
      left: e.pageX - 50,
      top: e.pageY - 50
    });
  });

  $img.on('click', function(e) {
    movingTag();
    $div.removeClass('fixed');
    $(".dropdown").remove();
  });

  $('.container').on('click', ".dropdown ul li", function(e){
    var $parentDrop = $(this).closest('.dropdown');

    $(this).parent().html($(this).clone());

    $parentDrop.removeClass('dropdown').addClass('perma-drop');


    var innerDiv = $parentDrop.children().eq(1);
    innerDiv.removeClass('bottom-drop');
    innerDiv.addClass('blue-background white-text');

    var $closeBtnDiv = $("<div class='close-btn'>&times;</div>");
    $parentDrop.prepend($closeBtnDiv);

    $parentDrop.wrap($shower);
    movingTag();
    $div.removeClass('fixed');

  });

  var closeBtnFunc = function () {
    $(".close-btn").on("click", function() {
    console.log(this);
      $(this).parent().remove();
   });
  }

  movingTag();
});

var displayTarget = function() {
  $('.target').addClass("active");
}

var hideTarget = function() {
  $('.target').removeClass("active");
}

var animateDropdown = function() {
  $('.dropdown').slideDown();
}

var hideDropdown = function() {
  $('.dropdown').slideUp();
}

var tags = [];

function Tag(x, y, name) {
  var self = this;
  this.x = x;
  this.y = y;
  this.html = $('#tag-prototype').clone().removeAttr('id');
  $('body').append(this.html);
  this.html.show();
  this.html.addClass('faded');
  this.html.find('.tagged-name').html(name);
  this.html.css({
    left: x,
    top: y
  });

  this.html.find('.delete-tag').click(function() {
    self.html.fadeOut();
  });
}


$(document).ready(function() {

  $('.kittens').hover(displayTarget, hideTarget)


  $('.kittens').on('mousemove', function(e) {
    // make the box float on mouse move
    if ($(this).hasClass('searching')) {
      $('.target').css({
        left: e.pageX - 50,
        top: e.pageY - 50
      })
    } else {

      }
  })

  // if you click, stop the box from moving
  $('.kittens').click(function() {
    if ($(this).hasClass('searching')) {
      $(this).removeClass('searching');
      $('.target').addClass('clicked');
      animateDropdown();
    } else {
      $(this).addClass('searching');
      $('.target').removeClass('clicked');
      hideDropdown();
    }
  })


  $('.name').click(function(e) {
    var name = $(this).html();
    var position = $('.target').position();
    tag = new Tag(position.left, position.top, name);
    $('.kittens').addClass('searching');
    $('.target').removeClass('clicked');
    hideDropdown();
  });

});

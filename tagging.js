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
      animateDropdown();
    } else {
      $(this).addClass('searching');
      hideDropdown();   
    }   
  })




});
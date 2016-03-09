$(document).ready(function() {

  $('.dropdown-button').click(function() {
    if ($('.dropdown-item').hasClass('revealed')) {
      $('.dropdown-item').removeClass('revealed').slideUp();
    } else {
      $('.dropdown-item').addClass('revealed').slideDown();
    }
  });

  $('.dropdown-item').click(function() {
    var newValue = $(this).html();
    $('#special-thing').val(newValue);
    $('.dropdown-button').html(newValue);
    $('.selected').removeClass('selected')
    $(this).addClass('selected')
    $('.dropdown-item').removeClass('revealed').slideUp();
  });

  $('input[type=submit]').click(function(e) {
    alert($('#special-thing').val());
    e.preventDefault();
  })
});

"use strict"

var validateForm = function() {
  var valid = true;
  $('input, textarea').each(function() {
    var min = $(this).data('min');
    var max = $(this).data('max');
    var length = $(this).val().length;
    if (length > max || length < min) {
      $(this).siblings('.error-message').html("Must be between " + min + " and " + max + " characters.");
      $(this).addClass('invalid');
      $(this).addClass('invalidLength');
      valid = false;
    } else {
      $(this).siblings('.error-message').html("");
      $(this).removeClass('invalid');
    }
  });

  if (!passwordsMatch()) {
    $('#password').addClass('invalid');
    $('#passwordconfirm').addClass('invalid');
    $('.password-match-status').html("Passwords do not match...");
    valid = false;
  } else {
    if(!$(this).has('invalidLength')) {
      $('#password').removeClass('invalid');
      $('#passwordconfirm').removeClass('invalid');
    }
    $('.password-match-status').html("");
  }
  return valid;
}

var passwordsMatch = function() {
  var pw = $('#password').val();
  var pwc = $('#passwordconfirm').val();
  return pw == pwc;
}

$(document).ready(function() {
  // show remaining characters
  $('.char-count input, .char-count textarea').on("input",
    function() {
      // grab max characters from data-max tag
      var max = $(this).data("max");
      var charCount = (max - $(this).val().length);
      var $charCounter = $(this).closest(".char-count").find('.char-counter')
        $charCounter.fadeIn();

      // stop accepting characters at 0
      if (charCount <= 1) {
        $(this).val($(this).val().substring(0,max-1));
      }

      // set html of closest span
      $charCounter.html(charCount + " characters remaining");
    });

  $('.char-count input, .char-count textarea').blur(
      function() {
        var $charCounter = $(this).closest(".char-count").find('.char-counter');
        $charCounter.fadeOut();
      });

  // password matching password confirmation
  $('#passwordconfirm').on("input",
    function(){
      if (!passwordsMatch()) {
        $('.password-match-status').html("Passwords do not match...");
      } else {
        $('.password-match-status').html("");
      }
    });

  $('input[type=submit]').click(function(e){
    if (validateForm()) {
    } else {
      e.preventDefault();
    }
  });
});

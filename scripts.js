$(document).ready(function() {
//When the user types into a text field, display a counter next to the field listing how many characters are remaining (maximum 32):

  //create event listener for typing in textbox

  function textBoxCountDown() {
    if ( $('.textBox').val().length >= 4 && $('.textBox').val().length <= 32) {
      $('.textboxErrorMessage').text('');
      $('.textBox').removeClass('errorText');
    }
    var remaining = 32 - $('.textBox').val().length;
    if (remaining !== 32) {
      $('.text-box #textbox').text(' ' + remaining + ' chars remaining');
    } else {
      $('.text-box #textbox').text('');
    }
  };

  setInterval(textBoxCountDown, 100);

  function textAreaCountDown() {
    if ( $('.textArea').val().length >= 4 && $('.textArea').val().length <= 140) {
      $('.textareaErrorMessage').text('');
      $('.textArea').removeClass('errorText');
    }
    var remaining = 140 - $('.textArea').val().length;
    if (remaining !== 140) {
      $('.text-area #textArea').text(' ' + remaining + ' chars remaining');
    } else {
      $('.text-area #textArea').text('');
    }
  };

  setInterval(textAreaCountDown, 100);

  function passwordCountDown() {
    if ( $('.password').val().length >= 6 && $('.password').val().length <= 16) {
      $('.passwordErrorMessage').text('');
      $('.password').removeClass('errorText');
    }
    var remaining = 16 - $('.password').val().length;
    if (remaining !== 16) {
      $('.text-password #password').text(' ' + remaining + ' chars remaining');
    } else {
      $('.text-password #password').text('');
    }
  };

  setInterval(passwordCountDown, 100);

  function confirmPasswordCountDown() {
    if ( $('.confirmPassword').val().length >= 6 && $('.confirmPassword').val().length <= 16) {
      $('.passwordErrorMessage').text('');
      $('.confirmPassword').removeClass('errorText');
    }
    var remaining = 16 - $('.confirmPassword').val().length;
    if (remaining !== 16) {
      $('.confirm-password #password').text(' ' + remaining + ' chars remaining');
    } else {
      $('.confirm-password #password').text('');
    }
  };

  setInterval(confirmPasswordCountDown, 100);

  //check for password matches:


  function checkPasswordMatch() {
    var password = $('.password').val();
    var confirmPassword = $('.confirmPassword').val();

    if (password != confirmPassword) {
      $('.confirmMessage').text("Passwords do not match!");
    } else {
      $('.confirmMessage').text("Passwords match.");
    }
  }

  $('.confirmPassword').keyup(checkPasswordMatch);

  $('.submit').click(function(event) {
    event.preventDefault();
    checkValidations();
    checkPasswordMatch();
  });

  function checkValidations() {

    if ( $('.textBox').val().length < 4 || $('.textBox').val().length > 32) {
      $('.textBox').addClass('errorText');
      $('.textboxErrorMessage').text('Enter 4-32 characters!').css('color', 'red');
    }

    if ( $('.textArea').val().length < 4 || $('.textArea').val().length > 140) {
      $('.textArea').addClass('errorText');
      $('.textareaErrorMessage').text('Enter 4-140 characters!').css('color', 'red');
    }

    if ( $('.password').val().length < 6 || $('.password').val().length > 16) {
      $('.password').addClass('errorText');
      $('.passwordErrorMessage').text('Enter 6-16 characters!').css('color', 'red');
    }

    if ( $('.confirmPassword').val().length < 6 || $('.confirmPassword').val().length > 16) {
      $('.confirmPassword').addClass('errorText');
      $('.confirmMessage').text('Enter 6-16 characters!').css('color', 'red');
    }
  };

  $('#dropdown').hover(function() {
    $('.opt1').slideDown('slow');
    $('.opt2').slideDown('slow');
    $('.opt3').slideDown('slow');
  }, function() {
    $('.opt1').slideUp('slow');
    $('.opt2').slideUp('slow');
    $('.opt3').slideUp('slow');
  });

  $('.option').hover(function() {
    $(this).toggleClass('optionBackground');
  }, function() {
    $(this).toggleClass('optionBackground');
  });

  $('.option').click(function() {
    $('.topLevel').remove();
    var $selection = $(this);
    $('.option').css('display', 'none');
    $selection.show();
    $(this).addClass('optionBackground');
    $('#dropdown').off();
    $('.option').off();
  });













});
$(document).ready(function() {
//When the user types into a text field, display a counter next to the field listing how many characters are remaining (maximum 32):

  //create event listener for typing in textbox

  function textBoxCountDown() {
    var remaining = 32 - $('.textBox').val().length;
    if (remaining !== 32) {
      $('.text-box #textbox').text(' ' + remaining + ' chars remaining');
    } else {
      $('.text-box #textbox').text('');
    }
  };

  setInterval(textBoxCountDown, 100);

  function textAreaCountDown() {
    var remaining = 140 - $('.textArea').val().length;
    if (remaining !== 140) {
      $('.text-area #textArea').text(' ' + remaining + ' chars remaining');
    } else {
      $('.text-area #textArea').text('');
    }
  };

  setInterval(textAreaCountDown, 100);

  function passwordCountDown() {
    var remaining = 16 - $('.password').val().length;
    if (remaining !== 16) {
      $('.text-password #password').text(' ' + remaining + ' chars remaining');
    } else {
      $('.text-password #password').text('');
    }
  };

  setInterval(passwordCountDown, 100);

  function checkPasswordMatch() {
    var password = $('.password').val();
    console.log('password is ' + password);
    var confirmPassword = $('.confirmPassword').val();
    console.log('confirm password is ' + confirmPassword);

    if (password != confirmPassword)
        $('.confirmMessage').text("Passwords do not match!");
    else
        $('.confirmMessage').text("Passwords match.");
  }

  function confirmPasswordCountDown() {
    var remaining = 16 - $('.confirmPassword').val().length;
    if (remaining !== 16) {
      $('.confirm-password #confirmPassword').text(' ' + remaining + ' chars remaining');
    } else {
      $('.confirm-password #confirmPassword').text('');
      $('.confirm-password .confirmMessage').text('');
    }
  };

  setInterval(confirmPasswordCountDown, 100);

  $('.confirmPassword').keyup(checkPasswordMatch);


});
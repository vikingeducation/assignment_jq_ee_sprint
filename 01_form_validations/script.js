var formEventHandlers = {

  inputLength: function(event) {
    var $originator = $(event.target);
    var $counter = $originator.next();
    $counter.text($originator.val().length || "");
  },

  passwordsMatch: function() {
    var passwordText = $('#password input').val();
    var passwordConfirmationText = $('#password-confirmation input').val();
    if (passwordText === passwordConfirmationText || passwordConfirmationText.length === 0) {
      $('#password-confirmation .warning').text('');
    } else {
      $('#password-confirmation .warning').text("Passwords don't match");
    }
  },

  invalidInput: function(event) {
    var valid = true;
    if ($('#text input').val().length < 4) {
      valid = false;
      $('#text .warning').text("Too short. Must be at least 4 characters.");
    } else {
      $('#text .warning').text("");
    }
    if ($('#textarea textarea').val().length < 4) {
      valid = false;
      $('#textarea .warning').text("Too short. Must be at least 4 characters.");
    } else {
      $('#textarea .warning').text("");
    }
    if ($('#password input').val().length < 6) {
      valid = false;
      $('#password .warning').text("Too short. Must be at least 6 characters.");
    } else {
      $('#password .warning').text("");
    }
    if ($('#password-confirmation input').val().length < 6) {
      valid = false;
      $('#password-confirmation .warning').text("Too short. Must be at least 6 characters.");
    } else {
      $('#password-confirmation .warning').text("");
    }
    if (!valid) {
      setTimeout(function() { alert("CHECK YOURSELF!"); }, 0);
      event.preventDefault();
    }
  }
};

$('form').on('input', formEventHandlers.inputLength);
$('form').on('input', 'input[type=password]', formEventHandlers.passwordsMatch);
$('form input[type=submit]').on('click', formEventHandlers.invalidInput);

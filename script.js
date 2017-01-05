$('form').on('input', function(event) {
  var $originator = $(event.target);
  var $counter = $originator.next();
  $counter.text($originator.val().length || "");
});

$('form').on('input', 'input[type=password]', function() {
  var passwordText = $('#password input').val();
  var passwordConfirmationText = $('#password-confirmation input').val();
  if (passwordText === passwordConfirmationText || passwordConfirmationText.length === 0) {
    $('#password-confirmation .warning').text('');
  } else {
    $('#password-confirmation .warning').text("Passwords don't match");
  }
});

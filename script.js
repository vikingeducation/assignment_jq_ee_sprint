$('form').on('input', function(event) {
  var $originator = $(event.target);
  var $counter = $originator.next();
  $counter.text($originator.val().length || "");
});

$('form').on('input', 'input[type=password]', function() {
  var passwordText = $('#password').val();
  var passwordConfirmationText = $('#password-confirmation').val();
  if (passwordText === passwordConfirmationText || passwordConfirmationText.length === 0) {
    $('#password-confirmation-warning').hide();
  } else {
    $('#password-confirmation-warning')
      .text("Passwords don't match")
      .show();
  }
});

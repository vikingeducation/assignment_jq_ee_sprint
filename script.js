$(document).ready(function() {

  $("#text-field").on("input", function(eventObj) {
    var charsRemaining = 32 - $(this).val().length;

    if (charsRemaining < 32 ) {
      $(this).next().text(charsRemaining + " characters remaining")
    }
    else {
      $(this).next().text("");
    }
  });

  $("#text-area").on("input", function(eventObj) {
    var charsRemaining = 140 - $(this).val().length;

    if (charsRemaining < 140 ) {
      $(this).next().text(charsRemaining + " characters remaining")
    }
    else {
      $(this).next().text("");
    }
  });

  $("input[type='password']").on("input", function(eventObj) {
    var charsRemaining = 16 - $(this).val().length;

    if (charsRemaining < 16 ) {
      $(this).next().text(charsRemaining + " characters remaining")
    }
    else {
      $(this).next().text("");
    }

    var password = $("#password").val();
    var passwordConfirmation = $("#password-confirmation").val();
    console.log(password);
    console.log(passwordConfirmation);
    if (password == passwordConfirmation) {
      $("#password-match-validation").text("");
    } else {
      if (passwordConfirmation.length > 0) {
        $("#password-match-validation").text("Passwords do not match!");
      }
    }
  });
});

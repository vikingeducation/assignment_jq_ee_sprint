"use strict"

// refactor with attributes to determine min/max for different forms.


$(document).ready(function() {
  var $feedbackDiv = $("#text-field-feedback");
  $('#text-field').keyup(function() {

    var inputLength = $("#text-field").val().length;
    if (inputLength) {
      $feedbackDiv.text(32 - inputLength);
    } else {
      $feedbackDiv.text("");
    }
  });

  $('textarea').keyup(function() {
    var inputLength = $('textarea').val().length;
    if (inputLength) {
      $('textarea').after($feedbackDiv.text(140 - inputLength));
    } else {
      $feedbackDiv.text("");
    }
  });

  $('#password').keyup(function() {
    var inputLength = $('#password').val().length;
    if (inputLength) {
      $('#password').after($feedbackDiv.text(16 - inputLength));
    } else {
      $feedbackDiv.text("");
    }
  });


  var $confirmDiv = $('<div></div>');
  $('#password-confirmation').keyup(function() {
    var pw = $('#password').val();
    var pwc = $('#password-confirmation').val();
    if (pw === pwc) {
      $('#password-confirmation').after($confirmDiv.text("Passwords match"));
    } else {
      $('#password-confirmation').after($confirmDiv.text("Passwords don't match"));
    }

    var inputLength = $('#password-confirmation').val().length;
    if (inputLength) {
      $('#password-confirmation').after($feedbackDiv.text(16 - inputLength));
    }
    else {
      $feedbackDiv.text("");
    }
  });

  var $errorDiv = $("<div class='error'></div>");
  $('button').on('click', function(e) {
    $('div.error').remove();
    e.preventDefault();

    var textLength = $("#text-field").val().length;
    var textFeedbackLength = $('textarea').val().length;
    var passwordLength = $('#password').val().length;
    var passwordConfirmationLength = $('#password-confirmation').val().length;

    if (textLength < 4 || textLength > 32) {
      $('#text-field').addClass("error-input");
      $('#text-field').after($errorDiv.clone().text("Invalid text input"));
    }
    if (textFeedbackLength < 4 || textFeedbackLength > 140) {
      $('textarea').addClass("error-input");
      $('textarea').after($errorDiv.clone().text("Invalid text area input"));
    }
    if (passwordLength < 6 || passwordLength > 16) {
      $('#password').addClass("error-input");
      $('#password').after($errorDiv.clone().text("Invalid text input"));
    }
    if (passwordConfirmationLength < 6 || passwordConfirmationLength > 16) {
      $('#password-confirmation').addClass("error-input");
      $('#password-confirmation').after($errorDiv.clone().text("Invalid password input"));
    }
    if ($('#password').val() !== $('#password-confirmation').val()) {
      $('#password-confirmation').addClass("error-input");
      $('#password-confirmation').after($errorDiv.clone().text("Passwords Don't Match!"));
    }
  })
});

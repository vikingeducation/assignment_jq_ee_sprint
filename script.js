"use strict";

$(document).ready(function () {

  $("#input-field-counter").keyup(function (event) {
    if ($(event.target).val().length > 0 && $(event.target).val().length <= 32) {
      $("#char-logger").html("Remaining chars: " + (32 - $(event.target).val().length));
    } else if ($(event.target).val().length > 32) {
      $(event.target).val($(event.target).val().substr(0, 32));
    } else {
      $("#char-logger").html("");
    }
  });

  $("textarea").keyup(function (event) {
    if ($(event.target).val().length > 0 && $(event.target).val().length <= 140) {
      $("#textarea-logger").html("Remaining chars: " + (140 - $(event.target).val().length));
    } else if ($(event.target).val().length > 140) {
      $(event.target).val($(event.target).val().substr(0, 140));
    } else {
      $("#textarea-logger").html("");
    }
  });

  $("#password").keyup(function (event) {
    if ($(event.target).val().length > 0 && $(event.target).val().length <= 16) {
      $("#password-logger").html("Remaining chars: " + (16 - $(event.target).val().length));
    } else if ($(event.target).val().length > 16) {
      $(event.target).val($(event.target).val().substr(0, 16));
    } else {
      $("#password-logger").html("");
    }
  });

  $("#password-confirmation").keyup(function (event) {
    if ($(event.target).val().length > 0 && $(event.target).val().length <= 16) {
      $("#password-confirmation-logger").html("Remaining chars: " + (16 - $(event.target).val().length));
      if ($("#password").val() === $("#password-confirmation").val()) {
        $("#password-confirmation-feedback").html("Your passwords match!");
        $("#password-confirmation-feedback").removeClass("text-danger").addClass("text-success");
      } else {
        $("#password-confirmation-feedback").html("The password confirmation doesn't match the password");
        $("#password-confirmation-feedback").removeClass("text-success").addClass("text-danger");
      }
    } else if ($(event.target).val().length > 16) {
      $(event.target).val($(event.target).val().substr(0, 16));
    } else {
      $("#password-confirmation-feedback").html("");
      $("#password-confirmation-logger").html("");
    }
  });

});
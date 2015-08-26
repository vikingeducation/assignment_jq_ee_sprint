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

  $("button").click(function(event) {
    passTextFieldValidation();
      

    passTextAreaValidation();
      

    passPasswordValidation();
      

    passPasswordConfirmationValidation();
      

    passwordsMatching();
    
    event.preventDefault();
  });


  function passTextFieldValidation(){
    if( $("#input-field-counter input").val().length < 4 || $("#input-field-counter input").val().length > 32 ){
      $("#char-logger").addClass("alert-danger alert");
      $("#char-logger").html("input needs to be between 4 and 32 characters");
      return false;
    }
    else{
      $("#char-logger").removeClass("alert-danger alert");
      $("#char-logger").html("");
      return true;
    }
  }

  function passTextAreaValidation(){
    if( $("textarea").val().length < 4 || $("textarea").val().length > 140 ){
      $("#textarea-logger").addClass("alert-danger alert");
      $("#textarea-logger").html("input needs to be between 4 and 140 characters");
      return false;
    } 
    else{
      $("#textarea-logger").removeClass("alert-danger alert");
      $("#textarea-logger").html("");
      return true;
    }
    
  }

  function passPasswordValidation() {
    if( $("#password").val().length < 6 || $("#password").val().length > 16 ){
      $("#password-logger").addClass("alert-danger alert");
      $("#password-logger").html("input needs to be between 6 and 16 characters");
      return false;
    } 
    else{
      $("#password-logger").removeClass("alert-danger alert");
      $("#password-logger").html("");
      return true;
    }
  }

  function passPasswordConfirmationValidation() {
    if( $("#password-confirmation").val().length < 6 || $("#password-confirmation").val().length > 16 ){
     $("#password-confirmation-logger").addClass("alert-danger alert");
      $("#password-confirmation-logger").html("input needs to be between 6 and 16 characters");
      return false;
    } 
    else{
      $("#password-confirmation-logger").removeClass("alert-danger alert");
      $("#password-confirmation-logger").html("");
      return true;
    }
  }

  function passwordsMatching(){
    if ( $('#password').val() != $("#password-confirmation").val() ){
      $("#password-confirmation-feedback").addClass("alert-danger alert");
      $("#password-confirmation-feedback").html("passwords dont match");
      return false;
    }
    else{
      $("#password-confirmation-feedback").removeClass("alert-danger alert");
      $("#password-confirmation-feedback").html("");
      return true;
    }
  }

});








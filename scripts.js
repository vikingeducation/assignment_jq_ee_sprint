$(document).ready(function() {

  // Form validator using jQuery Form Validation plugin: https://jqueryvalidation.org/
  $("#myForm").validate({
    rules: {
      fullName: {
        minlength: 4,
        maxlength: 32
      },
      description: {
        minlength: 4,
        maxlength: 140
      },
      enterPass: {
        required: true,
        equalTo: "confirm"
      },
      confirm: {
        required: true,
        equalTo: "enterPass"
      }
    },
    messages: {
      fullName: {
        minlength: "Name must be at least 4 characters long",
        maxlength: "Name cannot exceed 32 characters"
      },
      description: {
        minlength: "Description must be at least 4 characters long",
        maxlength: "Description cannot exceed than 140 characters"
      },
      enterPass: {
        required: "Please enter a password",
        minlength: "Your password must be at least 4 characters long",
        equalTo: "Passwords must match"
      },
      confirmPass: {
        required: "Please reenter your password",
        minlength: "Your password must be at least 4 characters long"
        equalTo: "Passwords must match",
      }
    }
  });

  

});

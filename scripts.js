$(document).ready(function() {

  var formValidation = $("#myForm").validate({
    rules: {
      regText: {
        minlength: 4,
        maxlength: 32
      },
      bigText: {
        minlength: 4,
        maxlength: 140
      },
      enterPass: {
        required: true
      },
      confirm: {
        required: true,
        equalTo: "enterPass"
      }
    }
  });



});

var validateLength = {
  init: function(){
    $("form.sign-up").submit( function(event) {
      validateLength.messageOfValidation(4,16, "Text Field", 0, event );
      validateLength.messageOfValidation(4,140, "Text Area", 1, event );
      validateLength.messageOfValidation(6,16, "Password", 2, event )
      validateLength.passwordConfirmation
    }
    );
  },
  counter: function(maxText) {
    $('input#text-field').keyup(function() {
    maxText = 32 - $(this).val().length;
    if (maxText >= 0 && maxText <= 31) {
      $( ".counter" ).text(maxText).show();
    } else if (maxText === 32) {
      $( ".counter" ).hide();
    }
  });
},
  messageOfValidation: function(min, max, fieldType, fieldNumber, event) {
    if ( $("input:eq(" + fieldNumber + ")").val().length > max) {
      $(".error-message:eq(" + fieldNumber + ")").text(fieldType + " cannot be longer than " + max).show();
      event.preventDefault();
    } else if ($("input:eq(" + fieldNumber + ")").val().length < min  ) {
      $(".error-message:eq(" + fieldNumber + ")").text(fieldType + " cannot be shorter than " + min).show();
      event.preventDefault();
    }
  },
  passwordConfirmation: function() {
    if ( $("input#password").val() != $("input#password-conf").val() ) {
      $(".error-message:eq(3)").text("Your password confirmation doesn't match").show();
      event.preventDefault();
    }
  }
};

$(document).ready(function() {

  validateLength.init();
  var maxText = 32;
  validateLength.counter(maxText)

});

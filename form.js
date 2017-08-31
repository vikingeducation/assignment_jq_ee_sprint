$(document).ready(function() {
  handleCharCount($( "#username-input" ), 32, "username-counter");
  handleCharCount($( "#textarea-input" ), 140, "textarea-counter");
  handleCharCount($( "#password-input" ), 16, "password-counter");
  handleCharCount($( "#confirm-password-input" ), 16, "confirm-password-counter");

  $( "#confirm-password-input" ).keyup(function() {
    checkConfirmationMatch();
  });

  $( "#password-input" ).keyup(function() {
    checkConfirmationMatch();
  });

  $( "form" ).submit(function(e) {
    $( ".error-message" ).remove();
    $( ".has-error" ).removeClass("has-error");

    if ( !validateForm() ) {
      return false;
    }
  });
});

function handleCharCount($object, maxLength, id) {
  $object.keyup(function(event) {

    var valueLength = this.value.length;
    var key = event.keyCode || event.charCode;

    if ( key === 8 || key === 46 ) {
      if ( valueLength === 0 ) {
        $( "#" + id ).remove();
      } else {
        addErrorP($object, valueLength, maxLength, id);
      }
    } else if ( valueLength <= maxLength && valueLength > 0 ) {
      addErrorP($object, valueLength, maxLength, id);
    } else {
      // delete last letter
      this.value = this.value.slice(0, -1);
    }
  });
}

function addErrorP($object, valueLength, maxLength, id) {
  var $p = $("<p></p>")
    .attr('class', 'text-muted')
    .attr('id', id)
    .text(maxLength - valueLength + " characters max remaining");

  $( "#" + id ).remove();
  $( $object ).parent().append($p);
}

function checkConfirmationMatch() {
  // remove does not match alert
  $( "#not-matched-message" ).remove();

  var password = $("#password-input").val();
  var confirmPassword = $("#confirm-password-input").val();

  if ( !passwordsMatch() && confirmPassword !== "" ) {
    // add does not match alert
    var $p = $("<p></p>")
      .attr("id", "not-matched-message")
      .attr("class", "text-danger")
      .text("Does not match password");

    $( "#confirm-password-input" ).parent().append($p);
  }
}

function validateForm() {
  var errors = 0

  // username-input 4-36
  if ( !charCountValid($("#username-input"), 4, 36) ) {
    errors++
    var input = $("#username-input");
    input.addClass("has-error");
    addFieldError(input, "Username must be between 4 and 36 characters");
  }

  // Text area -- 4-140 characters
  if ( !charCountValid($("#textarea-input"), 4, 140) ) {
    errors++
    var input = $("#textarea-input");
    input.addClass("has-error");
    addFieldError($("#textarea-input"), "Comment must be between 4 and 140 characters");
  }

  // Password/confirmation -- 6-16 characters
  if ( !charCountValid($("#password-input"), 6, 16) ) {
    errors++
    var input = $("#password-input")
    input.addClass("has-error");
    addFieldError($("#password-input"), "Password must be between 6 and 16 characters");
  }

  if ( !charCountValid($("#confirm-password-input"), 6, 16) ) {
    errors++
    var input = $("#confirm-password-input")
    input.addClass("has-error");
    addFieldError($("#confirm-password-input"), "Password must be between 6 and 16 characters");
  }

  // error for not matched passwords
  if ( !passwordsMatch() ) {
    errors++
    var input = $("#confirm-password-input")
    input.addClass("has-error");
    addFieldError($("#confirm-password-input"), "Password and confirm password must match");
  }

  if ( errors > 0 ) {
    return false;
  } else {
    return true;
  }
}

function addFieldError(field, message) {
  field.addClass("has-error");

  $errorP = $("<p></p>")
    .attr("class", "text-danger error-message")
    .text(message);

  field.parent().append($errorP);
}

function charCountValid($object, min, max) {
  var inputLength = $object[0].value.length;

  if ( inputLength >= min && inputLength <= max ) {
    return true;
  } else {
    return false;
  }
}

function passwordsMatch() {
  var password = $("#password-input").val();
  var confirmPassword = $("#confirm-password-input").val();

  if ( password === confirmPassword ) {
    return true;
  } else {
    return false;
  }
}

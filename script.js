// counters
var textcounter = function (selector, counter, maxCount) {
  $(selector).on('keydown', function() {
      var letterCount = $(this).val().length
      if(letterCount === 0) {
         $(counter).text("")
       } else {
      $(counter).text((maxCount - letterCount) + " characters left" )
      }
    }
  )
}

textcounter("#text-field", "#text-field-counter", 32);
textcounter("#text-area", "#text-area-counter", 140);
textcounter("#password", "#password-counter", 16);
textcounter("#password-conf", "#password-conf-counter", 16);

// validations
var isValidCounter = function(selector, min, max) {
  var $object = $(selector)
  return $object.val().length > min && $object.val().length < max
};

var validPasswords = function(password, passwordconf) {
  return $("#password").val() === $("#password-conf").val();
}

$('#submit').on('click', function(event) {
  event.preventDefault();
  $(".error").removeClass("error")
  var invalidInputs = []
  var invalidMessages = []

  if(!validPasswords("#password", "#password-conf") ){
    invalidInputs.push($("#password"))
    invalidInputs.push($("#password-conf"))
    invalidMessages.push("Your passwords do not match.")
    invalidMessages.push("Your passwords do not match.")

  } else if(!isValidCounter("#password", 6, 16)) {
    invalidInputs.push($("#password"))
    invalidMessages.push("Your password is not the correct length. Password must be between 6 and 16 characters.")
  }

  if (!isValidCounter("#text-field", 4, 32)) {
    invalidInputs.push($("#text-field"))
    invalidMessages.push("Your text is not the correct length. Text field must be between 4 and 32 characters.")
  }

  if(!isValidCounter("#text-area", 4, 140)) {
    invalidInputs.push($("#text-area"))
    invalidMessages.push("Your text area is not the correct length. Text area must be between 4 and 140 characters.")
  }

  if(invalidInputs.length !== 0) {
    for(message in invalidMessages) {
      $("#errors-list").append("<li class= 'error-message'>" + invalidMessages[message] + "</li>")
    }

    for(input in invalidInputs) {
      invalidInputs[input].addClass("error")
    }
  } else {
   $( "#main-form" ).submit();
  }
});

// dropdown

$(".click-me").on("click", function () {
  $(".hiding-options").removeClass("hiding-options");
  $(".option-list li").on("click", function() {
    $(".option-list li").addClass("hiding-options");
    $(this).removeClass("hiding-options");
  })
});


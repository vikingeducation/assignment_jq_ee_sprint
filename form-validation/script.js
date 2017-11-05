"use strict";
function determineCharacters(input){
  let characterKeys = {
    "text-field": 32,
    "textarea-field": 140,
    "password-field": 16,
    "password-confirmation-field":16
  }
  return characterKeys[input];
}

$(".input-field").keyup(function(e){
  let field=e.target;
  let characters = determineCharacters(field.id);
  let charField=e.currentTarget.children[1];
  if ($(field).val().length){
    characters-=$(field).val().length;
    $(charField).html(characters);
  }
  else{
    $(charField).html("");
  }

  if (!matchingPasswords()){
    $("#password-confirmation-field").addClass("error-field");
    let errorMessageField = $("#password-confirmation-field").siblings()[1];
    errorMessageField.className="error-message visible"
    $(errorMessageField).html("The passwords needs to match");
  }
  else{
    $("#password-confirmation-field").removeClass("error-field");
    let errorMessageField = $("#password-confirmation-field").siblings()[1];
    errorMessageField.className="error-message hidden"
  }
});

$("#submit-button").click(function(e){
  let valid=validateForm();
    if (valid){
      $("#submit-input").click();
    }
})

function matchingPasswords(){
  let password = $("#password-field").val();
  let passwordConfirmation = $("#password-confirmation-field").val();
  return (password===passwordConfirmation)
}

function validateForm(){
  $(".error-message").attr("class","error-message hidden");
  $(".error-field").removeClass("error-field");
  let isValid = true;
  let inputFields = Array.from($(".input-field"));
  inputFields.forEach(function(input){
    let field= input.children[0]
    let length= field.value.length;
    let id=field.id
    let maxLength = determineCharacters(id);
    let errorMessageField = input.children[2];
    if (length > maxLength){
      errorMessageField.innerHTML = "This field has a character limit of "+maxLength+". ";
      errorMessageField.className="error-message visible"
      isValid = false;
      $(field).addClass("error-field");
    }
  })
  if ($("#password-field").val().length < 6){
    isValid=false;
    let errorMessageField = $("#password-field").siblings()[1];
    $(errorMessageField).html("The password must be at least 6 characters");
    errorMessageField.className="error-message visible"
    $("#password-field").addClass("error-field");
  }

  if (!matchingPasswords()){
    isValid=false;
    $("#password-confirmation-field").addClass("error-field");
    let errorMessageField = $("#password-confirmation-field").siblings()[1];
    errorMessageField.className="error-message visible"
    $(errorMessageField).html("The passwords needs to match");
  }
  return isValid;


}
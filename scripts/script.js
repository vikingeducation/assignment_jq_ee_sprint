function showRemainingChars(event) {
  var numRemainingChars = charCounter.calculateRemainingChars(event.currentTarget);
  var validationValues = validations.getTextValidationValues(event.currentTarget.name);
  if(numRemainingChars === validationValues.maxChars)
    numRemainingChars = '';
  $(validationValues.charCounter).text(numRemainingChars);
}

function confirmPassword() {
  var $passwordConfirmValue = $('#passwordConfirm')[0].value;
  if($('#password')[0].value !== $passwordConfirmValue && $passwordConfirmValue !== '') {
    $('#passwordError').text('Passwords do not match.');
  }
  else $('#passwordError').text('');
}

function validateInput(event) {
  event.preventDefault();
  var inputFieldsToValidate = ['textField', 'textArea', 'password', 'passwordConfirm'];

  inputFieldsToValidate.forEach(function(field) {
    var validationValues = validations.getTextValidationValues(field);
    var $fieldSelector = $('#' + field);
    var fieldValue = $fieldSelector[0].value;
    if(fieldValue.length < validationValues.minChars || fieldValue.length > validationValues.maxChars) {
      $fieldSelector.addClass('fieldValidationError');
      $(validationValues.validationError).prop('hidden', false);
    }
    else {
      $fieldSelector.removeClass('fieldValidationError');
      $(validationValues.validationError).prop('hidden', true);
    }
  });
  confirmPassword();
}

var validator = {

  init: function() {
    var $passwordConfirm = $('#passwordConfirm');

    $('#textField').keyup(showRemainingChars);
    $('#textArea').keyup(showRemainingChars);
    $('#password').keyup(showRemainingChars);
    $passwordConfirm.keyup(showRemainingChars);
    $passwordConfirm.keyup(confirmPassword);
    $('#login').submit(validateInput);
  }
};

var validations = {
  getTextValidationValues: function(currentTargetName) {
    switch(currentTargetName) {
      case 'textField':
        return {minChars: 4, maxChars: 32, charCounter: '#textFieldCharCounter', validationError: '#textFieldValidationError'};
      case 'textArea':
        return {minChars: 4, maxChars: 140, charCounter: '#textAreaCharCounter', validationError: '#textAreaValidationError'};
      case 'password':
        return {minChars: 6, maxChars: 16, charCounter: '#passwordCharCounter', validationError: '#passwordValidationError'};
      case 'passwordConfirm':
        return {minChars: 6, maxChars: 16, charCounter: '#passwordConfirmCharCounter', validationError: '#passwordConfirmValidationError'};
    }
  }
};

var charCounter = {
  // inputText is the text of the chars to count
  calculateRemainingChars: function(currentTarget) {
    var textLength = currentTarget.value.length;

    var textValidationValues = validations.getTextValidationValues(currentTarget.name);
    return textValidationValues.maxChars - textLength;
  }
};

$(document).ready(validator.init);
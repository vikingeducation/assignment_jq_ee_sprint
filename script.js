$(document).ready( function() {

// bind ==> on
  $('.field-wrapper').bind('change paste keyup', 'input', function() {
    var $input = $(event.target);
    var maxCharacters = maxLength($input[0].id);
    var charactersRemaining = maxCharacters - $input.val().length;
    var $field = $input.siblings('.field-text');

    if (charactersRemaining === maxCharacters) {
      $field.addClass('hidden');
    }
    else {
      $field.removeClass('hidden')
      $field.text(charactersRemaining + " characters remaining.");
    };

    if ($input[0].id === 'confirm-password') {
      checkConfirmation();
    };

  });


// could add as data attributes to validate w/ global validation
  var maxLength = function(inputID) {
    switch(inputID) {
      case 'title':
        return 32;
        break;
      case 'body':
        return 140;
        break;
      default:
        return 16;
        break;
    }
  }


  var minLength = function(inputID) {
    switch(inputID) {
      case 'title':
        return 4;
        break;
      case 'body':
        return 4;
        break;
      default:
        return 6;
        break;
    }
  }



  var checkConfirmation = function() {
    var password = $('#password').val();
    var $confirmation = $('#confirm-password');
    var $fieldText = $confirmation.siblings('.confirm-text');

    if (password === $confirmation.val()) {
      $fieldText.addClass('success');
      $fieldText.removeClass('failure');
      $fieldText.text("Passwords match!");
    }
    else {
      $fieldText.addClass('failure');
      $fieldText.removeClass('success');
      $fieldText.text("Passwords do not match...");
    }
  }



  var validateFieldLength = function(index, field) {
    var $field = $(field);
    var min = minLength($field[0].id);
    var max = maxLength($field[0].id);

    if ($field.val().length >= min && $field.val().length <= max) {
      //success
      updateValidationText($field, '')
      $field.removeClass('invalid');
    }
    else if ($field.val().length < min) {
      //too short
      updateValidationText($field, 'Must be at least ' + min + ' characters.')
      $field.addClass('invalid');
    }
    else {
      //too long
      updateValidationText($field, 'Cannot be more than ' + max + ' characters.')
      $field.addClass('invalid');
    };
  };



  var updateValidationText = function(jqObj, newText) {
    var $textField = jqObj.siblings('.field-text');
    $textField.text(newText);
  };




  $(':submit').on('click', function() {
    event.preventDefault();
    var $fields = $('.field-wrapper input, textarea');
    $fields.each ( validateFieldLength );
    checkConfirmation();
  });


  $('.selected').on('click', function() {
    var $dropdown = $('.select-list');

    if ($dropdown.hasClass('hidden')) {
      $dropdown.slideDown(500);
      $dropdown.removeClass('hidden');
    }
    else {
      $dropdown.slideUp(500);
      $dropdown.addClass('hidden');
    };
  });

  $('.list-option').on('click', function() {
    var $dropdown = $('.select-list');
    var $selection = $(event.target);

    $('.selected').text($selection.text())
    $dropdown.slideUp(500);
    $dropdown.addClass('hidden');
  });


});
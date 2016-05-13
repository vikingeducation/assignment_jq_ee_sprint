"use strict";

$(document).ready(function() {

  var _registerEventListeners = function() {
    var $form = $('#form');

    $form.on('submit', function(e) {
      e.preventDefault();

      _removeErrors();
      _validate();

      return false;
    });

    $('#form input, #form textarea').on('keyup', _charCounter);
  };

  var _removeErrors = function() {
    $('#form .field-with-errors').removeClass('field-with-errors');
    $('#form .error').remove();
  };

  var _createError = function(message) {
    var $errorMessage = $('<span class="error"></span>');
    $errorMessage.text(message);
    return $errorMessage;
  };

  var _charCounter = function(e) {
    _removeErrors();

    if (!_charCountWithinLimits(e.target)) {
      _createError('Invalid number of characters: ' + $(e.target).val().length)
        .insertAfter($(e.target));
    }
  };

  var _charCountWithinLimits = function(element) {
    var min = 4,
        max = 16,
        length = $(element).val().length;
    if (!length) {
      return true;
    }
    console.log(element.id);
    if (element.id === 'text-field') {
      max = 32;
    } else if (element.id === 'textarea') {
      max = 140;
    }
    return (length > min && length < max);
  };

  var _validate = function() {
    _validateTextField();
    _validateTextarea();
    _validatePassword();
    _validatePasswordConfirm();
  };

  var _validateTextField = function() {
    var $textField = $('#text-field');
    try {
      _validatePresenceOf('Text field', $textField.val());
      _validateLengthOf('Text field', $textField.val().length, 4, 32);
    } catch (e) {
      $textField.addClass('field-with-errors');
      _createError(e).insertAfter($textField);
    }
  };

  var _validateTextarea = function() {
    var $textarea = $('#textarea');
    try {
      _validatePresenceOf('Text area', $textarea.val());
      _validateLengthOf('Text area', $textarea.val().length, 4, 140);
    } catch (e) {
      $textarea.addClass('field-with-errors');
      _createError(e).insertAfter($textarea);
    }
  };

  var _validatePassword = function() {
    var $password = $('#password');
    try {
      _validatePresenceOf('Password', $password.val());
      _validateLengthOf('Password', $password.val().length, 4, 16);
    } catch (e) {
      $password.addClass('field-with-errors')
      _createError(e).insertAfter($password);
    }
  };

  var _validatePasswordConfirm = function() {
    var $password = $('#password');
    var $passwordConfirm = $('#password-confirm');
    try {
      _validatePresenceOf('Password confirm', $passwordConfirm.val());
      _validateMatches('Password', 'Password confirm', $password.val(), $passwordConfirm.val());
    } catch (e) {
      $passwordConfirm.addClass('field-with-errors');
      _createError(e).insertAfter($passwordConfirm);
    }
  };

  var _validatePresenceOf = function(field, value) {
    if (!value.length) {
      throw new Error(field + " cannot be blank");
    }
  };

  var _validateLengthOf = function(field, length, min, max) {
    if (length < min) {
      throw new Error(field + " is too short");
    } else if (length > max) {
      throw new Error(field + " is too long");
    }
  };

  var _validateMatches = function(fieldA, fieldB, valueA, valueB) {
    if (valueA !== valueB) {
      throw new Error(fieldA + " must match " + fieldB);
    }
  };


  _registerEventListeners();
});






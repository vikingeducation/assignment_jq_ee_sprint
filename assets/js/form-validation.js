"use strict";


var _validate = function($target, isValid, message) {
  var id = $target.attr('id');
  if (isValid) {
    $target.removeClass('my-invalid');
    !$target.val().length || $target.addClass('my-valid');
  } else {
    $target.removeClass('my-valid')
      .addClass('my-invalid');
  }
  var $message = $('*[my-invalid-message="' + id + '"]');
  message = isValid ? '' : message;
  $message.text(message);
};


var _validationListener = function(e) {
  var $target = $(e.target);
  var attributes = Object.keys(_validationListeners);
  var isValids = [];
  var messages = [];
  $.each(attributes, function(index, attribute) {
    if ($target.attr('my-' + attribute)) {
      var result = _validationListeners[attribute]($target);
      isValids.push(result.isValid);
      if (!result.isValid) {
        messages.push(result.message);
      }
    }
  });
  var isValid = isValids.reduce(function(prev, current) { return prev && current; });
  _validate($target, isValid, messages.join(', '));
};


var _minLength = function($target) {
  var minLength = +$target.attr('my-min-length');
  var length = $target.val().length;
  return {
    isValid: length >= minLength || !length,
    message: (minLength - length) + ' characters left'
  };
};


var _maxLength = function($target) {
  var maxLength = +$target.attr('my-max-length');
  var length = $target.val().length;
  return {
    isValid: length <= maxLength || !length,
    message: (length - maxLength) + ' characters over limit'
  };
};


var _matches = function($target) {
  var referenceId = '#' + $target.attr('my-matches')
  var $reference = $(referenceId);
  var targetValue = $target.val();
  var referenceValue = $reference.val();
  return {
    isValid: targetValue === referenceValue || !targetValue.length,
    message: 'Must match: ' + referenceId.replace('#', '')
  };
};


var _validationListeners = {
  "min-length": _minLength,
  "max-length": _maxLength,
  "matches": _matches
};


function _registerEventListeners() {
  $.each(['input', 'textarea'], function(tagNameIndex, tagName) {
    $('body').on('keyup', tagName, _validationListener);
  });
}


$(document).ready(function() {
  _registerEventListeners();
});







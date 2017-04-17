"use strict";

const CONSTANTS = {
  CLASS: {
    MESSAGE: 'message',
    ERROR: 'error'
  },
  MESSAGE: {
    CHARS_REMAINING: {
      EXP: /\[amt\]/i,
      MSG: "[amt] characters remaining"
    }
  },
  ERROR: {
    NOT_ENOUGH_CHARS: {
      EXP: /\[amt\]/i,
      MSG: "Enter more than [amt] characters"
    },
    TOO_MANY_CHARS: {
      EXP: /\[amt\]/i,
      MSG: "Enter less than [amt] characters"
    },
    PASSWORD_DOESNT_MATCH: {
      EXP: undefined,
      MSG: "Passwords must match"
    }
  },
  TEXTFIELD_CHAR_LIMIT: {
    MIN: 4,
    MAX: 32,
  },
  TEXTAREA_CHAR_LIMIT: {
    MIN: 4,
    MAX: 140
  },
  PASSWORD_CHAR_LIMIT: {
    MIN: 6,
    MAX: 16
  }
}

let formValidator = {
  init: () => { // Initialize form inputs and properties.
    jQuery.fn.getInputType = function() {
      if (this.prop("tagName") === "TEXTAREA") return "textarea";
      else if (this.prop("tagName") !== "INPUT") return undefined;
      return this.attr("type").toLowerCase();
    }

    // Reference our form.
    let $form = $('form');

    // Add delegate listener for inputs.
    $form.on("keyup", "input, textarea", (e) => {
      let $target = $(e.target);
      switch ($target.getInputType()) {
        case "password":
          formValidator.matchPasswords($target);
          formValidator.countChars($target, CONSTANTS.PASSWORD_CHAR_LIMIT);
          break;
        case "textarea":
          formValidator.countChars($target, CONSTANTS.TEXTAREA_CHAR_LIMIT);
          break;
        default:
          formValidator.countChars($target, CONSTANTS.TEXTFIELD_CHAR_LIMIT);
      }
    }).submit(function(e) {
      return formValidator.validateForm();
    });
  },

  countChars: ($el, limit) => { // Counts characters in a textarea or input field.
    let count = $el.val().length;
    if (count == 0) {
      formValidator.clearMessageError($el);
    } else {
      if (count < limit.MIN) {
        formValidator.showError($el, CONSTANTS.ERROR.NOT_ENOUGH_CHARS, limit.MIN);
        return false;
      } else if (count > limit.MAX) {
        formValidator.showError($el, CONSTANTS.ERROR.TOO_MANY_CHARS, limit.MAX);
        return false;
      } else {
        formValidator.showMessage($el, CONSTANTS.MESSAGE.CHARS_REMAINING, limit.MAX - count);
        return true;
      }
    }
  },

  messageElement: (() => { // Message element for status on fields.
    let newElement = $('<span>', {
      class: CONSTANTS.CLASS.MESSAGE,
      style: 'display: none'
    });

    return newElement;
  })(),

  showMessage: ($el, msg, val) => { // Shows appropriate message.
    // Does the element exist already?
    let msgElement = $el.siblings('span');
    if (msgElement.length == 0) {
      // Clone our template and insert it.
      msgElement = formValidator.messageElement.clone();
      msgElement.insertAfter($el);
    } else {
      msgElement.removeClass(CONSTANTS.CLASS.ERROR)
        .addClass(CONSTANTS.CLASS.MESSAGE);
    }

    // Parse the message we need.
    msg = formValidator.parseMessageString(msg, val);

    // Set the text.
    msgElement.text(msg).fadeIn(250);

    return msgElement;
  },

  showError: ($el, err, val) => { // Shows appropriate error.
    formValidator.showMessage($el, err, val)
      .removeClass(CONSTANTS.CLASS.MESSAGE)
      .addClass(CONSTANTS.CLASS.ERROR);
  },

  clearMessageError: ($el) => { // Removes any current messages or errors.
    $el.siblings('span').fadeOut(250);
  },

  parseMessageString: (msg, val) => { // Parses the regular expression message string.
    return msg.MSG.replace(msg.EXP, val);
  },

  matchPasswords: ($el) => {
    // Get the confirm element first.
    let $confirmElement = $('#' + $el.data('confirm-id'));

    // Get both values.
    let leftVal = $el.val();
    let rightVal = $confirmElement.val();

    // Set to default for reset purposes.
    $el.removeClass();
    $confirmElement.removeClass();

    // Validate.
    if (leftVal.length > 0 && rightVal.length > 0) {
      if (leftVal != rightVal
          || (leftVal.length < CONSTANTS.PASSWORD_CHAR_LIMIT.MIN
            || rightVal.length < CONSTANTS.PASSWORD_CHAR_LIMIT.MIN)) {
        $el.addClass('invalid');
        $confirmElement.addClass('invalid');
      } else {
        if (leftVal.length > 0 && rightVal.length > 0) {
          $el.addClass('valid');
          $confirmElement.addClass('valid');
          return true;
        }
      }
    }
    return false;
  },

  validateForm: () => {
    let valid = true;
    [].forEach.call($('form').find('input, textarea'), (el) => {
      let $element = $(el);
      if ($element.val().length == 0) {
        valid = false;
        return;
      }
      switch ($element.getInputType()) {
        case "password":
          if (!formValidator.matchPasswords($element)
              || !formValidator.countChars($element, CONSTANTS.PASSWORD_CHAR_LIMIT))
                valid = false;
          break;
        case "textarea":
          if (!formValidator.countChars($element, CONSTANTS.TEXTAREA_CHAR_LIMIT))
            valid = false;
          break;
        case "text":
          if (!formValidator.countChars($element, CONSTANTS.TEXTFIELD_CHAR_LIMIT))
            valid = false;
      }
    });
    return valid;
  }

};

$(document).ready(formValidator.init);

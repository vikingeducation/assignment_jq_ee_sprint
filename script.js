'use strict';

var keyHandlers = {
  init: function() {
    $('#text-input').on('keyup', keyHandlers.handleText);
    $('#text-area').on('keyup', keyHandlers.handleTextArea);
    $('input[type=password]').on('keyup', keyHandlers.handlePassword);
  },

  handleText: function(event) {
    keyHandlers.checkLength($(event.target), 32);
  },

  handleTextArea: function(event) {
    keyHandlers.checkLength($(event.target), 140);
  },

  handlePassword: function(event) {
    // select password inputs
    let $section = $(event.target).parent();
    let $input = $section.children('#password-input');
    let $repeat = $section.children('#password-repeat');

    // check the input's length
    keyHandlers.checkLength($input, 16);
    // check the repeat's match
    keyHandlers.checkMatch($input, $repeat);
  },

  checkMatch: function($input, $repeat) {
    if ($repeat.val().length){
      // there is something entered, display something
      let message = 'Passwords Differ';
      if ($input.val() === $repeat.val()){
        message = 'Passwords Match'
      }
      keyHandlers.updateLabel($repeat, message);

    } else {
      // nothing entered, hide the message
      keyHandlers.removeLabel($repeat);
    }
  },

  checkLength: function($element, maxLength) {
    let remaining = maxLength - $element.val().length;

    if (remaining === maxLength) {
      // no characters entered
      keyHandlers.removeLabel($element);
    } else {
      // some characters entered
      let message = remaining;
      if (remaining < 0) {
        // too many characters
        message = 'Too Long!';
      }
      keyHandlers.updateLabel($element, message);
    }
  },

  removeLabel: function($element){
    // remove label
    keyHandlers.locateLabel($element)
      .remove();
  },

  updateLabel: function($element, message){
    // locate label
    let $label = keyHandlers.locateLabel($element);

    // set label value
    $label.text(message);
  },

  locateLabel: function($element) {
    // search for label
    let $label = $element.next('.input-feedback');

    // build one if needed
    if ($label.length === 0) {
      $label = $('<strong>')
        .addClass('input-feedback');
      $label.insertAfter($element);
    }

    return $label;
  }
}

var buttonHandler = {
  init: function() {
    $('button').on('click', buttonHandler.handleSubmit);
  },
  handleSubmit: function(event) {
    event.preventDefault();
    console.log(event.target);
  }
}


$(
  function() {
    keyHandlers.init();
    buttonHandler.init();
  }
)

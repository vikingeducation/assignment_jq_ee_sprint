var keyHandlers = {
  init: function() {
    $('#text-input').on('keyup', keyHandlers.handleText);
    $('#text-area').on('keyup', keyHandlers.handleTextArea);
    $('input[type=password').on('keyup', keyHandlers.handlePassword);
  },

  handleText: function(event) {
    keyHandlers.checkLength($(event.target), 32);
  },

  handleTextArea: function(event) {
    keyHandlers.checkLength($(event.target), 140);
  },

  handlePassword: function(event) {
    keyHandlers.checkLength($(event.target), 16);
  },

  checkLength: function($element, maxLength) {
    let remaining = maxLength - $element.val().length;

    if (remaining === maxLength) {
      // no characters entered
      keyHandlers.removeLabel($element);
    } else {
      // some characters enterd
      keyHandlers.updateLabel($element, remaining);
    }
  },

  removeLabel: function($element){
    // locate label
    $label = keyHandlers.locateLabel($element);
    // hide label
    $label.hide();
  },

  updateLabel: function($element, remaining){
    // locate label
    $label = keyHandlers.locateLabel($element);
    $label.show();

    // set label value
    if (remaining < 0) {
      // too many characters
      $label.text('Too Long!');
    } else{
      // inform the user
      $label.text(remaining);
    }
  },

  locateLabel: function($element) {
    return $element.next('.input-feedback');
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

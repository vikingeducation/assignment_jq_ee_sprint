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
      keyHandlers.removeLabel($element);
    } else {
      keyHandlers.updateLabel($element, remaining);
    }
  },

  removeLabel: function($element){
    console.log('label removed');
    // locate label
    // hide label
  },

  updateLabel: function($element, remaining){
    console.log('label updated');
    // locate label
    // set label value
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

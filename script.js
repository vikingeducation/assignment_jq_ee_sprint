var keyHandlers = {
  init: function() {
    $('#text-input').on('keyup', keyHandlers.handleText);
    $('#text-area').on('keyup', keyHandlers.handleTextArea);
    $('input[type=password').on('keyup', keyHandlers.handlePassword);
  },
  handleText: function(event) {
    console.log(event.target);
  },
  handleTextArea: function(event) {
    console.log(event.target);
  },
  handlePassword: function(event) {
    console.log(event.target);
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

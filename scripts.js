var keyupHandlers = {
  init: function() {
    $('#form').submit(function(e) {
      e.preventDefault();
    });
    $('#textfield').keyup(keyupHandlers.charCountDisplay);
    $('#textarea').keyup(keyupHandlers.charCountDisplay);
    $('#password').keyup(keyupHandlers.charCountDisplay)
    $('#confirm-password').keyup(keyupHandlers.charCountDisplay, keyupHandlers.matchPassword)
    $('#submit').mouseup(keyupHandlers.validateForm)
},

  charCountDisplay: function(val) {
    var thismax = $(this).attr('maxlength');
    var current = $(this).val().length;
    if (current < thismax && current > 0){
      var remaining = thismax - current;
      $(this).prev().text(remaining + " characters remaining")
    }
    else {
      $(this).prev().text('')
    }
  },
  matchPassword: function(val) {
    var original = $('#password').val();
    var newPass = $(this).val();
    var currentLength = newPass.length
    if (newPass !== original.slice(0,currentLength)){
      $(this).css("background-color", "red")
    }
    else {
      $(this).css("background-color", "white")
    }
  },
  validateForm: function(){
    if ($('#textfield').val().length < 4){
      $('#textfield').prev().text("Must be at least 4 chars!").css("color", "red")
    };
    if ($('#textarea').val().length < 4) {
      $('#textarea').prev().text("Must be at least 4 chars!").css("color", "red")
    };
    if ($('#password').val().length < 6) {
      $('#password').prev().text("Must be at least 6 chars!").css("color", "red")
    };
    if ($('#confirm-password').val() !== $('#password').val()) {
      $('#confirm-password').prev().text("Must match your Password!").css("color", "red")
    };

  }


};





$(document).ready( function() {
  keyupHandlers.init();

})

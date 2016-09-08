$(document).ready(function () {
  validations.init();
});

var validations = {
  init: function () {
    // $('.form-group').each(function () {
    //   $(this).on('keyup', validations.charcount);
    // });
    $('#username').on('keyup', function(e) { validations.charcount(e, 32) });
    $('#description').on('keyup', function(e) { validations.charcount(e, 140) });
    $('#password').on('keyup', function(e) { 
      validations.charcount(e, 16);
      validations.passwordMatch();
    });
    $('#confirm').on('keyup', function(e) { 
      validations.charcount(e, 16);
      validations.passwordMatch();
    });
  },

  // checks value length of tag
  // creates a new tag that displays value
  // inserts new tag after textfield
  charcount: function (event, max) {
    var len = max - event.target.value.length;
    // var keyid = event.keyCode;
    if (len !== max) {
      if ( $(event.target).next().is("br")) {
        var $newTag = $('<span>');
        $newTag.insertAfter(event.target);
      }
      
      $(event.target).next().text("Characters remaining: " + len);
    } else {
      $(event.target).next().text("");
    }
  },

  passwordMatch: function() {
    if ($("#password").val() !== $("#confirm").val()) {
      $("#password").addClass("red");
      $("#confirm").addClass("red");
    } else {
      $("#password").removeClass("red");
      $("#confirm").removeClass("red");
    }
  },

  // Text field -- 4-32 characters
  // Text area -- 4-140 characters
  // Password/confirmation -- 6-16 characters
  // Password -- must match confirmation
  // display red error message and indicate which field is wrong
  inputValidations: function (event) {
    if (($("#username").val().length > 4) && ($("#username").val().length < 32 )) {

    }

  }


};
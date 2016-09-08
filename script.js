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
    $('#password').on('keyup', function(e) { validations.charcount(e, 16) });
    $('#confirm').on('keyup', function(e) { validations.charcount(e, 16) });
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
      
      $(event.target).next().text("Characters remaing: " + len);
    } else {
      $(event.target).next().text("");
    }
  },

  passwordMatch: function() {

  }
};
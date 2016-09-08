$(document).ready(function () {
  validations.init();
});

var validations = {
  init: function () {
    $('.form-group').each(function () {
      $(this).on('keypress', validations.charcount);
    });
  },

  // checks value length of tag
  // creates a new tag that displays value
  // inserts new tag after textfield
  charcount: function (event) {
    var len = event.target.value.length + 1;

    if ( $(event.target).next().is("br")) {
      var $newTag = $('<span>');
      $newTag.text(len);
      $newTag.insertAfter(event.target);
    }
    else {
      $(event.target).next().text(len);
    }
  }
};
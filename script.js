var formValidation = {

  fields: '.validation-required',

  init: function() {
    $('form').on('keyup', formValidation.fields, formValidation.displayRemainingChars);
    $('form').on('keyup', '#confirmation', formValidation.displayConfirmationMatch);
    $('form').on('click', '#submit', formValidation.validateLength)
  },

  displayRemainingChars: function(e) {
    var currentCharCount = $(this).val().length;
    if (currentCharCount > 0) {
      var remainingCharCount = parseInt($(this).attr('maxlength')) - currentCharCount;
      $(this).siblings('.remaining')
        .show()
        .html(remainingCharCount + ' characters remaining');
    } else {
      $(this).siblings('.remaining')
        .hide();
    }
  },

  displayConfirmationMatch: function(e) {
    var password = $('#password').val();
    var $this = $(this);
    if ($this.val().length > 0 && password !== $this.val()) {
      $this.siblings('.unmatched')
        .show()
        .html('The passwords don\'t match')
        .addClass('error');
    } else if ($this.val().length === 0 || password === $this.val()) {
      $this.siblings('.unmatched')
        .html('')
        .hide();
    }
  },

  addErrorMessage: function(m) {
    var msg = $('<span>')
      .addClass('error')
      .html(m)
    return msg
  },

  validateLength: function(e) {
    var $this = $(this);
    var isValid = true;
    $this.closest('form').find(formValidation.fields).each(function(i, el) {
      var $el = $(el);
      var charCount = $el.val().length;
      if (charCount < $el.attr('minlength') || charCount > $el.attr('maxlength')) {


        $el.siblings('.error')
          .html('This should be between ' + $el.attr('minlength') + ' and ' + $el.attr('maxlength') + ' characters long');
        $el.addClass('input-alert');
        isValid = false;
      } else {
        $el.removeClass('input-alert');
        $el.siblings('.error').remove();
      }
    });

    if (!isValid) {
      e.preventDefault();
    }
  }

}

$(document).ready(function() {
  formValidation.init();
});
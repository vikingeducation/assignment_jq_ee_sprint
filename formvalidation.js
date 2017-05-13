var formValidation = {

  fields: '.validation-required',

  init: function() {
    $('form').on('keyup', formValidation.fields, formValidation.displayRemainingChars);
    $('form').on('keyup', '#confirmation', formValidation.displayConfirmationMatch);
    $('form').on('click', '#submit', formValidation.validateFields);
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

  validateLength: function(el) {
    var charCount = el.val().length;
    if (charCount < el.attr('minlength') || charCount > el.attr('maxlength')) {
      var msg = 'Please use between ' + el.attr('minlength') + ' and ' + el.attr('maxlength') + ' characters';
      formValidation.appendErrorMsg(el, msg);
      return false;
    } else {
      formValidation.removeErrorMsg(el);
      return true;
    }
  },

  removeErrorMsg: function(el) {
    console.log('remove error', el);
    if (el.siblings('.error').length) {
      el.siblings('.error').remove();
    }
  },

  appendErrorMsg: function(el, msg) {
    if (el.siblings('.error').length) {
      el.siblings('.error').html(msg);
    } else {
      var m = $('<span>')
        .addClass('error')
        .html(msg);
      el.parent().append(m);
    }
  },

  validatePresence: function(el) {
    console.log('validate presence', el.val());
    if (el.val()) {
      formValidation.removeErrorMsg(el);
      return true;
    } else {
      formValidation.appendErrorMsg(el, 'Can\'t be blank');
      return false;
    }
  },

  validateFields: function(e) {
    var $this = $(this);
    var isValid = true;
    $this.closest('form').find(formValidation.fields).each(function(i, el) {
      var $el = $(el);
      var charCount = $el.val().length;
      switch ($el.attr('data-validation')) {
        case 'length':
          isValid = formValidation.validateLength($el);
          break;
        case 'presence':
          isValid = formValidation.validatePresence($el);
          break;
      }
    });

    if (!isValid) {
      e.preventDefault();
    }
  }


}
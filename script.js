'use strict'

$(document).ready(() => {
  _registerListeners();
});

const _registerListeners = () => {
  $.each(['input', 'textarea'], (_index, tagName) => {
    _validationListener(tagName);
  });
};

const _validationListener = tagName => {
  $('body').on('keyup', tagName, (e) => {
    const $target = $(e.target);
    const listeners = Object.keys(_validationListeners);

    let messages = [];

    $.each(listeners, (_index, listener) => {
      if($target.attr(`data-${listener}`)) {
        let results = _validationListeners[listener]($target);

        if(!results.isValid) {
          messages.push(results.message);
        }
      }
    })

    _validate($target, messages);
  });
};

const _validate = ($target, messages) => {
  const errorMessageClass = `js-error-message-${$target.attr('id')}`

  $target.removeClass('invalid')
  $(`.${errorMessageClass}`).remove(0);

  if(messages.length) {
    $target.addClass('invalid')

    $target.after($('<span/>')
      .addClass(errorMessageClass)
      .text(messages.join(',')));
  }
}

const _maxLength = $target => {
  const maxLength = $target.attr('data-max-length');
  const actualLength = $target.val().length;

  return {
    isValid: (actualLength <= maxLength || !actualLength),
    message: `${actualLength - maxLength} over limit`
  }
}

const _minLength = $target => {
  const minLength = $target.attr('data-min-length');
  const actualLength = $target.val().length;

  return {
    isValid: (actualLength >= minLength || !actualLength),
    message: `${minLength - actualLength} characters left`
  }
}

const _validationListeners = {
  'max-length': _maxLength,
  'min-length': _minLength
}

$(document).ready(() => {
  $('input').on('keyup', trackLength.displayAvailableLength);

  $('#password_confirmation.js-password-feedback')
    .on('keyup', password.confirmPassword);

  $('.js-submit').on('click', validations.validate);

  dropDown.render();
});

const trackLength = {
  maxLength: {
    name: 32,
    summary: 140,
    password: 16,
    password_confirmation: 16
  },

  displayAvailableLength: event => {
    const targetId = $(event.target)[0].id;
    const maxLengthForTarget = trackLength.maxLength[targetId];
    const availableLength = maxLengthForTarget - event.target.value.length
    const containerClass = `js-${targetId}`

    const $container = $(`.${containerClass}`)

    if(targetId) {
      if(!$container.length) {
        $(event.target).after($('<div/>')
          .text(trackLength.maxLength[targetId])
          .addClass(containerClass)
          .css('display', 'inline-block')
        )
      }

      trackLength.updateAvailableLength(
        containerClass, availableLength, maxLengthForTarget
      )
    }
  },

  updateAvailableLength: (containerClass, availableLength, maxLength) => {
    const $container = $(`.${containerClass}`)

    if(availableLength !== maxLength) {
      $container.show().text(availableLength);
    } else {
      $container.hide();
    }
  }
}

const password = {
  confirmPassword: event => {
    const doNotMatch = 'Passwords do not match'
    const passwordFeedbackClass = 'js-password-feedback-results'

    const $passwordFeedback = $(`.${passwordFeedbackClass}`)
    const $passwordField = $('#password.js-password-feedback')

    const $passwordConfirmationField =
      $('#password_confirmation.js-password-feedback')

    if($passwordField.val() !== $passwordConfirmationField.val()) {
      if(!$passwordFeedback.length) {
        $passwordConfirmationField.after($('<div/>')
          .text(doNotMatch)
          .addClass(passwordFeedbackClass)
          .css('display', 'inline-block')
        )
      } else {
        $passwordFeedback.show();
        $passwordFeedback.text(doNotMatch);
      }
    } else {
      $passwordFeedback.hide();
    }
  }
}

const validations = {
  maxLength: {
    textField: 32,
    textArea: 140,
    password: 16
  },

  minLength: {
    textField: 4,
    textArea: 4,
    password: 6
  },

  validate: event => {
    event.preventDefault();

    validations.validateLength(
      $("input[type='text']"),
      validations.maxLength.textField,
      validations.minLength.textField
    );


    validations.validateLength(
      $("input[type='textarea']"),
      validations.maxLength.textArea,
      validations.minLength.textArea
    );

    validations.validateLength(
      $("input[type='password']"),
      validations.maxLength.password,
      validations.minLength.password
    );
  },

  validateLength: ($field, max, min) => {
    if ($field.val().length >= max || $field.val().length <= min) {
      $field.addClass('errorBox');
    } else {
      $field.removeClass('errorBox');
    }
  }
}

const dropDown = {
  render: () => {
    const $dropDownList = $('.js-dropdown-list')
    const $dropDownItem = $('.js-dropdown-item')

    $dropDownList.children().hide();

    $('<li/>').prependTo($dropDownList).show();

    $dropDownList.on('click', event => {
      $dropDownList.children().toggle(600);

      $dropDownList.children().removeClass('selected');

      $(event.target).addClass('selected');

      $('.selected').toggle(300);
    });
  }
}

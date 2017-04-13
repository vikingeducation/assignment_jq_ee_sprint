$(document).ready(() => {
  $('input').on('keyup', trackLength.displayAvailableLength);

  $('#password_confirmation.js-password-feedback')
    .on('keyup', password.confirmPassword);
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

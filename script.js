$(() => {
	let PASSWORD_MATCH = false;

	function init() {
		inputFunctions.inputLimitCounter(140, '.comment-box', '.textarea-counter', '.textarea-counter-message');
		inputFunctions.inputLimitCounter(32, '.username-box', '.username-area-counter', '.username-area-message');
		inputFunctions.inputLimitCounter(16, '.password-box', '.password-area-counter', '.password-area-message');
		inputFunctions.inputLimitCounter(16, '.cpassword-box', '.cpassword-area-counter', '.cpassword-area-message');

		authFunctions.passwordChecker('.password-box', '.cpassword-box');

		formFunctions.formValidator();
	}

	const inputFunctions = {
		inputLimitCounter: function(number, el, counterElement, counterMessageElement) {
			let keysLeft = parseInt($(counterElement).text());

			if (keysLeft === number) {
				$(counterMessageElement).hide();
			}

			$(el).keyup(function(e) {
				let contents = $(el).val();
				let len = $(el).val().length;
				let remaining = keysLeft - len;

				if (remaining === 0 || remaining < 0) {
					// remove some letters to allow breathing room
					contents = contents.slice(0, contents.length / 2);
					remaining = number - contents.length;
					$(counterElement).text(contents.length);

					// notify user of problem
					alert("You've reached the maximum characters allowed!");
	
					$(el).val(contents);

				} else if (remaining === number) {
					$(counterMessageElement).hide();

				} else {
					$(counterMessageElement).show();
				}

				$(counterElement).text(remaining);
			});
		}
	}

	const authFunctions = {
		passwordChecker: function(passwordElement, confirmPasswordElement) {
			let matches = false;

			$(confirmPasswordElement).keyup(function(e) {
				let password = $(passwordElement).val() + '';
				password = password.split('');

				let inputArray = e.target.value.split('');
				let lastKeyPressed = e.target.value[e.target.value.length - 1];

				if (inputArray.length === password.length) {
					for (let i = 0; i < inputArray.length; i++) {
						if (inputArray[i] === password[i]) {
							matches = true;

						} else {
							matches = false;
						}
					}

				} else {
					matches = false;
				}

				if (inputArray.length > 0) {
					$('.cpassword-alert').show();
				} else {
					$('.cpassword-alert').hide();
				}

				if (matches === true) {
					$('.cpassword-alert').hide();
				}

				PASSWORD_MATCH = matches;
			});

		}
	}

	const formFunctions = {
		formValidator: function() {
			let correctUserLength = false;
			let correctTextAreaLength = false;
			let correctPasswordLength = false;

			$('.form-btn').click(function(e) {
				e.preventDefault();

				let usernameLength = $('.username-box').val().length;
				let textAreaLength = $('.comment-box').val().length;

				let passwordLength = $('.password-box').val().length;
				let passwordConfirmationLength = $('.cpassword-box').val().length;

				if (usernameLength < 4 || usernameLength > 32) {
					$('.username-box').addClass('error-border');
					$('.username-error').show();
				} else {
					$('.username-box').removeClass('error-border');
					$('.username-error').hide();
					correctUserLength = true;
				}

				if (textAreaLength < 4 || textAreaLength > 140) {
					$('.comment-box').addClass('error-border');
					$('.commentarea-error').show();
				} else {
					$('.comment-box').removeClass('error-border');
					$('.commentarea-error').hide();
					correctTextAreaLength = true;
				}

				if (passwordLength < 6 || passwordLength > 16) {
					$('.password-box').addClass('error-border');
					$('.password-error').show();
				} else {
					$('.password-box').removeClass('error-border');
					$('.password-error').hide();
					correctPasswordLength = true;
				}

				if (PASSWORD_MATCH === false) {
					$('.cpassword-box').addClass('error-border');
					$('.cpassword-error').show();
				} else {
					$('.cpassword-box').removeClass('error-border');
					$('.cpassword-error').hide();
				}
				
				if (correctUserLength && correctPasswordLength && correctTextAreaLength && PASSWORD_MATCH) {
					alert('Thank you for registering!!');
				}

			});
		}
	}

	init();
});
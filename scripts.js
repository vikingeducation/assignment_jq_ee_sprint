"use strict";


let checkChars = {

	maxValue: 0,
	minValue: 0,
	password: "",
	passwordConfirmation: "",

	fieldValidations: {
		textField: false,
		textArea: false,
		password: false,
		passwordConfirmation: false,
		passwordsMatch: false
	},


	setRange: function(inputType, currentValue) {
		
		switch (inputType) {
			case "textField":
				this.maxValue = 32;
				this.minValue = 4;
				if (currentValue >= this.minValue && currentValue <= this.maxValue) {
					this.fieldValidations.textField = true;
				} else {
					this.fieldValidations.textField = false;
				};
				break;
			case "textArea":
				this.maxValue = 140;
				this.minValue = 4;
				if (currentValue >= this.minValue && currentValue <= this.maxValue) {
					this.fieldValidations.textArea = true;
				} else {
					this.fieldValidations.textArea = false;
				};
				break;
			case "password":
				this.maxValue = 16;
				this.minValue = 6;
				if (currentValue >= this.minValue && currentValue <= this.maxValue) {
					this.fieldValidations.password = true;
				} else {
					this.fieldValidations.password = false;
				};
				break;
			case "passwordConfirmation":
				this.maxValue = 16;
				this.minValue = 6;
				if (currentValue >= this.minValue && currentValue <= this.maxValue) {
					this.fieldValidations.passwordConfirmation = true;
				} else {
					this.fieldValidations.passwordConfirmation = false;
				};
				break;	
			default:
				this.maxValue = 0;
				this.minValue = 0;
				break;
		}

		return;
	},

	// setMin: function(inputType, currentValue) {
	// 	if (inputType === "textField" || inputType === "textArea") {
	// 		this.minValue = 4;
	// 	} else if (inputType === "password" || inputType === "passwordConfirmation") {
	// 		this.minValue = 6;
	// 	} else {
	// 		this.minValue = 0;
	// 	}
	// },

	checkPasswordMatch: function(inputType, currentValue) {

		if (inputType === "password") {
			this.password = currentValue;
			if (this.password === this.passwordConfirmation) {
				this.fieldValidations.passwordsMatch = true;
				return true;
			} else {
				this.fieldValidations.passwordsMatch = false;
				return false;
			}
		} else if (inputType === "passwordConfirmation") {
			this.passwordConfirmation = currentValue;
			if (this.passwordConfirmation === this.password) {
				this.fieldValidations.passwordsMatch = true;
				return true;
			} else {
				this.fieldValidations.passwordsMatch = false;
				return false;
			}
		} else {
			return false;
		}

	}

};

let $formAction = $(".the-form").children();
let $submitButton = $('#submit-button');

setTimeout(function() {
	$formAction.keyup(function(event) {

		let currentItem = event.target.name,
			currentItemText = event.target.value,
			currentItemLength = event.target.value.length,
			$currentItemSpan = $(this).next(),
			$passwordConfirmationSpan = $('.password-notify');

		$currentItemSpan.removeClass("notify-red");

		checkChars.setRange(currentItem, currentItemLength);

		let currentMax = checkChars.maxValue,
			currentMin = checkChars.minValue;

		if (currentItemLength === 0) {
			$currentItemSpan.hide();
		} else if (currentItemLength > 0) {
			$currentItemSpan.show();
			$currentItemSpan.text(currentMax - currentItemLength + " characters remaining");
		}

		if (currentItem === "password" || currentItem === "passwordConfirmation") {
			let doMatch = checkChars.checkPasswordMatch(currentItem, currentItemText);
			if (currentItemLength === 0) {
				$passwordConfirmationSpan.hide();
			} else if (currentItemLength > 0 && doMatch) {
				$passwordConfirmationSpan.show();
				$passwordConfirmationSpan.text(" - passwords match!");
			} else if (currentItemLength > 0 && !doMatch) {
				$passwordConfirmationSpan.show();
				$passwordConfirmationSpan.text(" - passwords DO NOT match.");
			}
		}

	});

	$submitButton.click(function(event) {
		event.preventDefault();
		
		if (checkChars.fieldValidations.textField === false) {
			$('.notify-text-field').show()
				.addClass("notify-red")
				.text("must be 4 - 32 characters in length");
		}

		if (checkChars.fieldValidations.textArea === false) {
			$('.notify-text-area').show()
				.addClass("notify-red")
				.text("must be 4 - 140 characters in length");
		}

		if (checkChars.fieldValidations.password === false) {
			$('.notify-password').show()
				.addClass("notify-red")
				.text("must be 6 - 16 characters in length");
		}

		if (checkChars.fieldValidations.passwordsMatch === false) {
			$('.notify-password-confirmation').show()
				.addClass("notify-red")
				.text("passwords must match");
		}
	});

}, 0);








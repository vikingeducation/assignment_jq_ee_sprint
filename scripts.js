"use strict";


// THE FORM VALIDATION

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



// THE DROPDOWN

let $selectList = $('.select-list');
let $selectLine = $('.select-line');
let listToggle = true;

$selectList.hide();

setTimeout(function() {
	$selectLine.click(function(event) {
		if (listToggle === true) {
			$selectList.slideDown();
			listToggle = false;
		} else {
			$selectList.slideUp();
			listToggle = true;
		}
		
	});

}, 0);

setTimeout(function() {
	$selectList.click(function(event) {
		$('#select-line-text').text(event.target.textContent);
		$selectList.slideUp();
		listToggle = true;
	});

}, 0);



// THE PHOTO TAGGING BOX

$('.photo-box').hide();
$('.photo-box-fixed').hide();

$('.photo-div').mouseenter(function() {
	$('.photo-box').show();
});


$('.photo-div').mousemove(function(event) {
	console.log("X-axis: " + event.pageX + ", Y-axis: " + event.pageY);
	
	$('.photo-box').css({
		'left': (event.pageX - 50) + 'px',
		'top': (event.pageY - 50) + 'px'
	});
});


$('.photo-div').mouseleave(function() { //YOUAREHERE  - problem is that once mouse enters .photo-div, it is technically over .photo-box & therefore leaving .photo-div won't work/is irrelevant
	$('.photo-box').hide();
});

setTimeout(function() {
	$('.photo-box').click(function(event) {
		$('.photo-box').toggle();
		$('.photo-box-fixed').toggle();
		$('.photo-box-fixed').css({
			'left': (event.pageX - 50) + 'px',
			'top': (event.pageY - 50) + 'px'
		});
		
	});
}, 0);

setTimeout(function() {
	$('.photo-div img').click(function(event) {
		$('.photo-box').toggle();
		$('.photo-box-fixed').toggle();
		
	});
}, 0);















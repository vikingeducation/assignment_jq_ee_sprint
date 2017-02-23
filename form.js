$(document).ready(function() {
	formValidation.init();
});

var $validationLog = $("#validation-log");

var formValidation = {

	init: function(){

		// Set up event listeners
		$("#textinput").keyup(function(event) {
			formValidation.countChars(event, 32);
		});
		$("textarea").keyup(function(event) {
			formValidation.countChars(event, 140);
		});
		$("#passwordinput").keyup(function(event) {
			formValidation.countChars(event, 16);
		});
		$("#passwordconfirmationinput").keyup(function(event) {
			formValidation.passwordMatch(event);
		});
		$("#submitbutton").click(function(event) {
			event.preventDefault();
			
			// Empty validation log
			$(event.target).next().empty();

			formValidation.validateFields();
		});

	},

	countChars: function(event, max) {
		var $target = $(event.target);
		var charCount = $target.val().length;
		var $display = $target.next(); // Select (invisible) label to display info

		$display.addClass("show-display").text(max-charCount + " characters remaining");

		if(charCount === 0) {
			$display.removeClass("show-display");
		}
	},

	passwordMatch: function(event) {
		var $target = $(event.target);
		var $display = $target.next(); // Select (invisible) label to display info

		var $pwd = $("#passwordinput").val();
		var $pwdConfirm = $("#passwordconfirmationinput").val();

			if ($pwdConfirm !== $pwd && $pwdConfirm.length > 0) {
				$display.removeClass("success").addClass("show-display failure").text("Passwords do not match");		
			}	else if ($pwdConfirm === $pwd) {
					$display.removeClass("failure").addClass("show-display success").text("Passwords match");			
				} else if ($pwdConfirm.length === 0) {
						$display.removeClass("show-display");
					}
	},

	validateFields: function() {
		formValidation.validateInputLength($("#textinput"), "Your name", 4, 32);
		formValidation.validateInputLength($("textarea"), "Your comment", 4, 140);
		formValidation.validateInputLength($("#passwordinput"), "Your password", 6, 16);
		formValidation.validatePassword();
	},

	validateInputLength: function($field, fieldName, minChars, maxChars) {
		$validationLog.addClass("show-display");

		var $errorMessage = $("<p>").text(`${fieldName} must be between ${minChars} and ${maxChars} characters long.`);

		if ($field.val().length < minChars || $field.val().length > maxChars) {
			$validationLog.append($errorMessage);
		}
	},

	validatePassword: function() {
		$validationLog.addClass("show-display");

		var $errorMessage = $("<p>").text("Passwords must match.");

		var $pwd = $("#passwordinput").val();
		var $pwdConfirm = $("#passwordconfirmationinput").val();

		if ($pwd !== $pwdConfirm) {
			$validationLog.append($errorMessage);
		}
	}
};


"use strict";

$(document).ready(function() {
	

	// check length of inputs

	$('.form-field input, .form-field textarea').on("input", function() {
		var max = $(this).data("max");
		var length = $(this).val().length;

		if (length > max) {
			$(this).val( $(this).val().slice(0, -1))
		} else if (length > 0) {
			$(this).siblings(".error-notify").html("");
			$(this).siblings(".char-count").fadeIn(1000);
			$(this).siblings(".char-count").html((max - length) + " characters left")
		} else {
			$(this).siblings(".char-count").fadeOut(1000);
		}
	});


	// check Password Confirmation Match

	$('.form-field .pw-confirmation').on("input", function() {
		var pw = $(".form-field input[type=password").first().val();
		var pwConf = $(this).val();

		if (pwConf.length === 0) {
			$(this).siblings(".pw-match").html("");
		} else if (pw === pwConf) {
			$(this).siblings(".pw-match").html("Match!");
		} else {
			$(this).siblings(".pw-match").html("No Match...");
		}
	});


	// Check Validations after Submit

	$('input[type=submit]').on("click", function(event) {
		event.preventDefault();

		$('input, textarea').each(function() {
			var min = $(this).data("min");
			var max = $(this).data("max");
			var length = $(this).val().length;

			if (length < min || length > max) {
				$(this).siblings(".error-notify").html("Try something in between " + min + " and " + max);
				$(this).addClass("error-field")
			}
		});

	});
});
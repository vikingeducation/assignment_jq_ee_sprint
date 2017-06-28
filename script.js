$(document).ready(
	function() {
		charCount = function(currentInput, maxChars) {
			var charsLeft = maxChars - currentInput.value.length;

			var name = "#" + $(currentInput).attr("name")

			$(name).removeClass("alert");
			
			if (charsLeft === maxChars) {
				$(name).text("");
			}
			else {
				$(name).text(charsLeft);
			}
		};

		passwordVerify = function($firstField, $secondField) {
			if ($firstField.val() !== $secondField.val()) {
				$("#not-confirmed").text("The passwords do not match.");
				return false;
			}
			else {
				$("#not-confirmed").text("");
				return true;
			};
		};

		verifyAll = function() {
			var nameChars = $("input[name=name]").val().length;
			var stuffChars = $("textarea").val().length;
			var passChars =  $("input[name=password]").val().length;
			var passConfirmChars = $("input[name=password-confirm]").val().length;
			console.log(passConfirmChars);

			if (nameChars < 4) {
				$("#name").text("Name must be between 4 and 32 characters.")
					.addClass("alert");
			};

			if (stuffChars < 4) {
				$("#stuff").text("Stuff must be between 4 and 140 characters.")
					.addClass("alert");
			};

			if (passChars < 6) {
				$("#password").text("Password must be between 6 and 16 characters.")
					.addClass("alert");
			};

			if (passConfirmChars < 6) {
				$("#password-confirm").text("Password must be between 6 and 16 characters.")
					.addClass("alert");
			};
		}

		$("input[type=text]").on("keyup", function(e) {
			charCount(this, 32)
		});

		$("textarea").on("keyup", function(e) {
			charCount(this, 140);
		})

		$("input[type=password]").on("keyup", function(e) {
			charCount(this, 16)
		});
			
		$("input[name=password-confirm]").on("keyup", function(e) {
				passwordVerify($(this), $("input[name=password]"));
			});

		$("form").on("submit", function(e) {
			e.preventDefault();
			verifyAll();
		});
});
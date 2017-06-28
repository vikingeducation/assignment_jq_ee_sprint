$(document).ready(
	function() {
		charCount = function(currentInput, maxChars) {
			var charsLeft = maxChars - currentInput.value.length;

			var name = "#" + $(currentInput).attr("name")
			$(name).text(charsLeft);
		};

		$("input[type=text]").on("keyup", function(e) {
			charCount(this, 32)
		});

		$("textarea").on("keyup", function(e) {
			charCount(this, 140);
		})

		$("input[type=password]").on("keyup", function(e) {
			charCount(this, 16)
		});
});
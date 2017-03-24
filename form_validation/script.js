$(document).ready(function(){

	console.log("script running");

	$("form").on("keyup", function(eventObj){
		var $target = $(eventObj.target);
		if ($target.attr("name") == "text") {
			var charsLeft = (32 - $target.val().length);
			if (charsLeft < 32) {
				$("#text-counter").html("Remaining characters: " + charsLeft);
			} else {
				$("#text-counter").html("");
			}
		} else if ($target.attr("name") == "textarea") {
			var charsLeft = (140 - $target.val().length);
			if (charsLeft < 140) {
				$("#textarea-counter").html("Remaining characters: " + charsLeft);
			} else {
				$("#textarea-counter").html("");
			}
		} else if ($target.attr("name") == "password") {
			var charsLeft = (16 - $target.val().length);
			if (charsLeft < 16) {
				$("#password-counter").html("Remaining characters: " + charsLeft);
			} else {
				$("#password-counter").html("");
			}
		} else if ($target.attr("name") == "password-confirm") {
			if (($target.val() == $(":password").first().val()) || $target.val().length == 0) {
				$("#password-feedback").html("");
			} else {
				$("#password-feedback")
					.html("Passwords don't match")
					.addClass("red");
			}
		} 
	});

	$("form").on("submit", function(eventObj){
		var textLength = $("input[name='text']").val().length;
		var textareaLength = $("textarea").val().length;
		var passwordLength = $("input[name='password']").val().length;
		var passwordsMatch = ($("input[name='password']").val() == $("input[name='password-confirm']").val());
		if (textLength < 4 || textLength > 32) {
			$("#text-counter")
				.html("Must have between 4-32 characters")
				.addClass("red");
		} else {
			$("#text-counter")
				.html("")
				.removeClass("red");
		}
		if (textareaLength < 4 || textLength > 140) {
			$("#textarea-counter")
				.html("Must have between 4-140 characters")
				.addClass("red");
		} else {
			$("#textarea-counter")
				.html("")
				.removeClass("red");
		}
		if (passwordLength < 6 || textLength > 16) {
			$("#password-counter")
				.html("Must have between 6-16 characters")
				.addClass("red");
		} else {
			$("#password-counter")
				.html("")
				.removeClass("red");
		}
		if (!passwordsMatch) {
			$("#password-feedback")
				.html("Passwords don't match")
				.addClass("red");
		} else {
			$("#password-feedback")
				.html("")
				.removeClass("red");
		}
		eventObj.preventDefault();
	});









});
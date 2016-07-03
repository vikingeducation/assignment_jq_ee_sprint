'use strict;'

var controller = {
	init: function(){
		view.init();
	}
}

var view = {
	init: function(){
		// set delegated listener on the input
		// if inputLength === 0, set display string to ""
		// if inputLength <= 32, set display string to (32 - inputLength) + " characters left"
		// if inputLength >32, retrieve the first 32 characters of the value and set the value to that. Display will say "0 characters left"
		$(":text").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.displayCharactersLeft(inputLength, event.target, "#input-characters-left", 32);
		});

		// Doing the same for the text area.
		$("textarea").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.displayCharactersLeft(inputLength, event.target, "#textarea-characters-left", 140)
		});

		// Doing the same for the password
		$("#password").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.displayCharactersLeft(inputLength, event.target, "#password-characters-left", 16);
		});

		// Doing the same for the password
		$("#confirm-password").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.displayCharactersLeft(inputLength, event.target, "#confirm-characters-left", 16);
		});

		// Doing the same for the password
		$("#confirm-password").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.comparePasswords(inputLength, event.target);
		});
	},

	displayCharactersLeft: function(inputLength, target, divId, maxCharacters){
		if (inputLength === 0) {
			$(divId).text("");
		} else if (inputLength <= maxCharacters) {
			var charactersLeft = maxCharacters - inputLength;
			$(divId).text(charactersLeft + " characters left.");
		} else {
			$(target).val( $(target).val().substr(0, maxCharacters) );
			$(divId).text("0 characters left.");
		};
	},

	comparePasswords: function(inputLength, target){
		var password = $("#password").val();
		var confirmPassword = $(target).val();
		if (inputLength === 0) {
			$("#compare-passwords").text("");
		} else if ( password !== confirmPassword ) {
			$("#compare-passwords").text("Passwords don't match");
		} else {
			$("#compare-passwords").text("Matched!");
		};
	}
}


$(document).ready(function(){
    controller.init();
});
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
			view.displayCharactersLeft(inputLength, event.target, "#input-message", 32);
		});

		// Doing the same for the text area.
		$("textarea").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.displayCharactersLeft(inputLength, event.target, "#textarea-message", 140)
		});

		// Doing the same for the password
		$("#password").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.displayCharactersLeft(inputLength, event.target, "#password-message", 16);
		});

		// Doing the same for the password
		$("#confirm-password").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.displayCharactersLeft(inputLength, event.target, "#confirm-message", 16);
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
	}
}


$(document).ready(function(){
    controller.init();
});
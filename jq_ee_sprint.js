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

		// Listener that will check whether the confirm-password field and the password fields are the same
		$("#confirm-password").on( 'keyup', function(){
			var inputLength = $(event.target).val().length;
			view.comparePasswords(inputLength, event.target);
		});

		// Listener that will check when the submit button is clicked
		// If it's clicked and the password and confirm-password values aren't the same
		// we need to turn off the usual action of the submit button
		// then highlight the offending field in red and display a red error message next to it indicating what went wrong.
		$(":submit").on( 'click', function(event){
			var passwordDiv = $(".password").first();
			var confirmPasswordDiv = $(".confirm-password").first();
			var textDiv = $(".text").first();
			var textareaDiv = $(".textarea").first();



			// adding error class and message if text input is invalid
			var textFieldInvalidMessage = 'Text field must be between 4 and 32 characters long.';
			if ( !view.textFieldIsValid() ) {
				view.addErrorClassAndMessage( textDiv, textFieldInvalidMessage );
			} else {
				view.removeErrorClassAndMessage( textDiv, textFieldInvalidMessage );
			};

			// adding error class and message if textarea is invalid
			var textarrayInvalidMessage = "Text area must be between 4 and 140 characters long."; 
			if ( !view.textareaIsValid() ) {
				view.addErrorClassAndMessage( textareaDiv, textarrayInvalidMessage );
			} else {
				view.removeErrorClassAndMessage( textareaDiv, textarrayInvalidMessage );
			};

			// adding error class and message if password is invalid
			var passwordInvalidMessage = "Password must be 6 and 16 characters long."; 
			if ( !view.passwordIsValid() ) {
				view.addErrorClassAndMessage( passwordDiv, passwordInvalidMessage );
			} else {
				view.removeErrorClassAndMessage( passwordDiv, passwordInvalidMessage );
			};

			// adding error class and message if confirm-password is invalid
			var confirmationInvalidMessage = "Confirmation must be 6 and 16 characters long."
			if ( !view.confirmPasswordIsValid() ) {
				view.addErrorClassAndMessage( confirmPasswordDiv, confirmationInvalidMessage );
			} else {
				view.removeErrorClassAndMessage( confirmPasswordDiv, confirmationInvalidMessage );
			};

			// Disabling or enabling the submit button
			if ( view.passwordConfirmed() && view.textFieldIsValid() && view.textareaIsValid() && view.passwordIsValid() ) {
				$(":submit").prop( {disabled: false} );
			} else {
				event.preventDefault();
			};
		});

		// Dropbox click events
		// slideDown(2500);
		// slideUp(2500);
		// on click of #drop-down
		// if #options is hiddel, slideDown
		// else slideUp
		$("#drop-down").on( 'click', function(event){
			// Slide down the options if they're hidden
			// otherwise slide it up
			if ( $("#options").is( ":hidden" ) ){
				$("#options").slideDown(1500)
			} else { 
				$("#options").slideUp(1500)
			};
		});

		// The sub-elements should change background color when the menu is opened and they are hovered over
		// I'm thinking we should add a class on .mouseenter() and remove a class on .mouseleave()
		// or .hover( inHandler, outHandler )
		$("#options").children().hover( 
			function(event){ $(event.target).addClass("hover");
							 $(event.target).css( 'cursor', 'pointer' );
								 }, 
			function(event){ $(event.target).removeClass("hover");
							 $(event.target).css( 'cursor', 'default' );
			 } )


		// This part will be when the user clicks on one of the options
		// then change text of drop-down
		$("#options").children().click(function(){
			$("#selected").text( $(event.target).text() );
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
		} else if ( !view.passwordConfirmed() ) {
			$("#compare-passwords").text("Passwords don't match");
		} else {
			$("#compare-passwords").text("Matched!");
		};
	},

	textFieldIsValid: function(){
		var textValue = $(":text").first().val();
		if ( textValue.length >= 4 && textValue.length <= 32 ) {
			return true
		} else {
			return false
		};
	},

	textareaIsValid: function(){
		var textareaValue = $("textarea").first().val();
		if ( textareaValue.length >= 4 && textareaValue.length <= 140 ) {
			return true
		} else {
			return false
		};
	},

	passwordIsValid: function(){
		var password = $("#password").val();
		if ( password.length >= 6 && password.length <= 16 ) {
			return true
		} else {
			return false
		};
	},

	confirmPasswordIsValid: function(){
		var confirmPassword = $("#confirm-password").val();
		if ( confirmPassword.length >= 6 && confirmPassword.length <= 16 ) {
			return true
		} else {
			return false
		};
	},

	passwordConfirmed: function(){
		var password = $("#password").val();
		var confirmPassword = $("#confirm-password").val();
		if ( password === confirmPassword ) {
			return true
		} else {
			return false
		};
	},

	// Need to check all the p's inside if targetToAddTo has class "error"
	addErrorClassAndMessage: function(targetToAddTo, message){
		var errorMessage = "<p>" + message + "<p>";
		if ( !$(targetToAddTo).hasClass("error") ){
			$( targetToAddTo ).addClass("error");
			$( targetToAddTo ).append( errorMessage );
		};
	},

	removeErrorClassAndMessage: function(targetToRemoveFrom, message){
		var pAll = $("p");
		if ( $(targetToRemoveFrom).hasClass("error") ){
			for (var i = 0; i < pAll.length; i++){
				if (pAll[i].textContent === message){
					pAll[i].remove();
				};
			};
			$( targetToRemoveFrom ).removeClass("error");
		};
	}
}


$(document).ready(function(){
    controller.init();
});
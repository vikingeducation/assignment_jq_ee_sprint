$( document ).ready(function(){

	// Hook up our char count listener to the 
	// setCharCount function below
	$('.add-char-count').keyup(function(e){
		var char_count_parent = $(e.currentTarget).siblings('.char-count');
		setCharCount(this, char_count_parent);
	});

	
	// Hook up our password match listener to the 
	// doPasswordsMatch function below
	$('.password-matching').keyup(function(e){
		var password_match_parent = $('#password').siblings('.matching-password');
		doPasswordsMatch(this, password_match_parent);
	});

	// Set up our validations trigger when the submit button is pressed
	$('input[type="submit"]').click(function(e){
		var trigger;
		var errors = new Array;
		var error_inputs = new Array;
		var flash = new Array;
		// Here are all of our validations. Any one of them hitting
		// will set trigger to false and throwing our errors.
		if($('#form-text').val().length < 4 || $('#form-text').val().length > 32 ){
			trigger = false;
			errors.push("Form text must be 4-32 characters long.");
			error_inputs.push("#form-text");
		} 

		if ($('#text-area').val().length < 4 || $('#text-area').val().length > 140){
			trigger = false;
			errors.push("Text area must be 4-140 characters long.");
			error_inputs.push("#text-area");
		} 

		if(!doPasswordsMatch($('#password'), $('#password').siblings('.matching-password'))){
			trigger = false;
			errors.push("Passwords do not match.");
			error_inputs.push("#password");
			error_inputs.push("#password-confirmation");
		} 

		if($('#password').val().length < 6 || $('#password').val().length > 16){
			trigger = false;
			errors.push("Passwords must be 6-16 characters long.");
			error_inputs.push("#password");
			error_inputs.push("#password-confirmation");
		} 

		if(trigger != false){
			trigger = true;
			flash.push("Form valid and submitted!");
		}

		if(errors.length != 0){
			addErrorClass(error_inputs);
			displayErrors(errors);
			e.preventDefault();
		} else {
			displayFlash(flash);
		}
	})


	var displayErrors = function(errors){
		if(errors.length === 0){
			$('#errors').hide();
		} else {
			$('#errors').show();
			errors.forEach(function(message){
				$('#errors').append('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">x</span></button>' + message + '</div>');
			})
		}
	}


	// Having errors with the flash getting removed 
	// immediately when the form validates.
	// TODO: Would need to incorporate some kind of 
	// session, cookie, or GET variable into here but 
	// will skip this for now.
	var displayFlash = function(flash){
		if(flash.length === 0){
			$('#flash').hide();
		} else {
			$('#flash').show();
			flash.forEach(function(message){
				$('#flash').append('<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">x</span></button>' + message + '</div>');
			})
		}
	}

	
	var addErrorClass = function(error_inputs){
		// Remove the error class from valid 
		// input if the form is submitted again.
		$('.has-error').removeClass('has-error');

		$(error_inputs).each(function(i, el){
			$(el).addClass('has-error');
		});
	}


	var doPasswordsMatch = function(input, password_match_parent){
		var input_length = $(input).val().length;
		
		hideIfEmpty(password_match_parent, input_length);
		
		// Return false if the password is empty
		if($('#password').val().length === 0){
			return false;
		}

		if($('#password').val() == $('#password-confirmation').val()){
			password_match_parent.removeClass('non-matched').addClass('matched');
			password_match_parent.children('p').html("Passwords Match!");
			return true;
		} else if($('#password').val() != $('#password-confirmation').val()){
			password_match_parent.removeClass('matched').addClass('non-matched');
			password_match_parent.children('p').html("Passwords not matched.");
			return false;
		}
	}


	var setCharCount = function(input, char_count_parent){
		// Set the length of our input
		var input_length = $(input).val().length;

		// Set our input maximum length
		var max_length;
		switch(input.id){
			case 'form-text': 
				max_length = 32;
				break;
			case 'text-area': 
				max_length = 140;
				break;
			case 'password': 
				max_length = 16;
				break; 
			case 'password-confirmation':
				max_length = 16; 
				break;
		}

		hideIfEmpty(char_count_parent, input_length);

		// Prevent the user from typing more if the max length 
		// has been reached.
		if(input_length >= max_length){
			$(input).val(($(input).val().slice(0,max_length-1)));
		}

		// No matter what's going on let's show the 
		// char count in our char count area.
		$(char_count_parent).children('p').html((max_length - input_length) + ' characters remaining');
	}

	var hideIfEmpty = function(el, input_length){
		// Check to see if our char_count_parent is visible or not
		// show if it is hidden, hide if the input length is 0.
		if(!el.is(":visible")){
			el.show();
		} else if(input_length === 0){
			el.hide();
		}
	}

});
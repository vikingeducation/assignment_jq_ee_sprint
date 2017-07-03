// "use strict";

var eventListeners = function(){

	$("#validation-form").on({
		focus: function(){ formValidation.target( $(this) ) },
		blur: function(){ formValidation.target( $(this) ) },
		keyup: function(){ formValidation.inputCharRem( $(this) ) },
	}, "label[class='text-input']" );

	$("#validation-form").on({
		focus: function(){ formValidation.target( $(this) ) },
		blur: function(){ formValidation.target( $(this) ) },
		keyup: function(){ formValidation.textareaCharRem( $(this) ) },
	}, "label[class='textarea-input']" );

	$("#validation-form").on({
		focus: function(){ formValidation.target( $(this) ) },
		blur: function(){ formValidation.target( $(this) ) },
		keyup: function(){ passValidation.passCharRemain( $(this) ) },
	}, "label[class='password']" );

	$("#validation-form").on({
		focus: function(){ passValidation.target( $(this) ) },
		blur: function(){ passValidation.target( $(this) ) },
		keyup: function(){ passValidation.passMatchTest( $(this) ) },
	}, "label[class='pass-conf']" );

	$("#submit-form").click(function(){ 
		var inputReturn = formValidation.testInputs( $(this) );
		var textareaReturn = formValidation.testTextareaInputs( $(this) );
		var passReturn = passValidation.testInputs();

		if (inputReturn === true &&
			textareaReturn === true &&
			passReturn === true) 
		{
			console.log('ready to submit');
		} else {
			console.log('not ready to submit');
		}
	});

};
	
var formValidation = {

	textInputVal: function($target){
		return $target.children('input').val();
	},

	textAreaVal: function($target){
		return $target.children('textarea').val();
	},

	target: function($target){
		var $childTarget = $target.children('.toggle');
		this.show($childTarget);
	},

	show: function($elem){
		if ($elem.hasClass('hide')) {
			$elem.removeClass('hide').addClass('show');
		} else if ($elem.hasClass('show')) {
			$elem.removeClass('show').addClass('hide');
		}
	},

	inputCharRem: function($target){
		var inputLength = 32 - this.textInputVal($target).length;
		$target.children('.input').html(inputLength); // input class selector
	},

	textareaCharRem: function($target){
		var inputLength = 140 - this.textAreaVal($target).length;
		$target.children('.input').html(inputLength); // input class selector
	},

	testInputs: function($target) {
		var inputsVal = [];
		var returnValues = [];
		var inputs = $target.parent().find("input[type='text']").get();
		var inputError = $target.parent().find('.input-error').get();

		// Add each input value to the array inputaVal
		for (var i = 0; i < inputs.length; i++) {
			inputsVal.push( inputs[i].value );
		}

		// Test each item in the array, if less that 4 characters add a red border and notification of error to the input field(s) with less than 4 characters
		for (var i = 0; i < inputsVal.length; i++) {
			if (inputsVal[i].length >= 4) {
				inputs[i].className -= 'red-border';
				inputError[i].innerHTML = '';
				returnValues.push('true');
			} else {
				inputs[i].className += ' red-border' ;
				inputError[i].innerHTML = 'Your input must be greater than 4 characters.';
				returnValues.push('false');
			}
		};

		// Return the value if the checks
		for (var i = 0; i < returnValues.length; i++) {
			if (returnValues[i] === 'false') {
				return false;
			}
		}

		return true;
	},

	testTextareaInputs: function($target) {
		var textareaVal = [];
		var returnValues = [];
		var textareas = $target.parent().find("textarea").get();
		var inputError = $target.parent().find('.textarea-error').get();

		// Add each input value to the array inputaVal
		for (var i = 0; i < textareas.length; i++) {
			textareaVal.push( textareas[i].value );
		}

		// Test each item in the array, if less that 4 characters add a red border and notification of error to the input field(s) with less than 4 characters
		for (var i = 0; i < textareaVal.length; i++) {
			if (textareaVal[i].length >= 4) {
				textareas[i].className -= 'red-border';
				inputError[i].innerHTML = '';
				returnValues.push('true');
			} else {
				textareas[i].className += ' red-border' ;
				inputError[i].innerHTML = 'Your input must be greater than 4 characters.';
				returnValues.push('false');
			}
		};

		// Return the value if the checks
		for (var i = 0; i < returnValues.length; i++) {
			if (returnValues[i] === 'false') {
				return false;
			}
		}

		return true;
		
	},

};

var passValidation = {

	passInput: function(){
		return ($('#password').val());
	},

	passConfInput: function(){
		return ($('#pass-conf').val());
	},

	passCharRemain: function(){
		var inputLength = 16 - this.passInput().length;
		$('#pass-char-remain').html(inputLength);
	},

	target: function(){
		// make "match" hide on blur
		if ( $('#match').hasClass('hide') === true ) {
			$('#match').removeClass('hide').addClass('show');
		} else {
			$('#match').removeClass('show').addClass('hide');
		}
		
		// make yes and no spans hide on blur
		if ( $('#no').hasClass('show') === true ) {
			$('#no').removeClass('show').addClass('hide');
		} else if ( $('#yes').hasClass('show') === true ) {
			$('#yes').removeClass('show').addClass('hide');
		}

	},

	passMatchTest: function(){
		if (this.passInput() === this.passConfInput()) {
				$('#no').removeClass('show').addClass('hide');
				$('#yes').removeClass('hide').addClass('show');
		} else {
				$('#yes').removeClass('show').addClass('hide');
				$('#no').removeClass('hide').addClass('show');
		}
	},

	testInputs: function($target) {
		// check to make sure passwords match and check to make sure passwords are at least 6 characters long				
		if (this.testInputsMatch() === true && 
			this.testInputsLength() === true) {
				return true;
		} else { 
			return false; 
		}
	},

	testInputsMatch: function(){
		if (this.passInput() === this.passConfInput()) {
			$('#password').removeClass('red-border');
			$('#pass-conf').removeClass('red-border');
			$('#pass-error').html('');
			return true;
		} else {
			$('#password').addClass('red-border');
			$('#pass-conf').addClass('red-border');
			$('#pass-error').html('The passwords do not match.');
			return false;
		}
	},

	testInputsLength: function(){
		if (this.passInput().length >= 6) {
			$('#password').removeClass('red-border');
			$('#pass-conf').removeClass('red-border');
			$('#pass-error').html('');
			return true;
		} else {
			$('#password').addClass('red-border');
			$('#pass-conf').addClass('red-border');
			$('#pass-error').html('The password must be greater than 6 characters.');
			return false;
		}
	},


};

$(document).ready(function(){ eventListeners() });






















$( document ).ready(function() {

	$('form').on('input', 'input, textarea',function(e){
    	var new_length = getNewLength(e.target.id, this.value.length);
    	var $charsRemainingP = $(this).parent().next().children().first();
    	$charsRemainingP.removeClass('error-message');
		if(this.value.length == 0){
			$charsRemainingP.text("");
		}
		else{
    		$charsRemainingP.text(new_length + " Characters Remaining");
    	}
    });

    $('form').on('keydown', 'input, textarea',function(e){
    	var new_length = getNewLength(e.target.id, this.value.length);
		if(new_length == 0 && e.which != 8){
			return false;
		}
		else{
    		return true;
    	}
    });

    $('form').on('input', 'input, textarea',function(e){
    	if(e.target.id == "thePasswordConfirmation"){
    		var $passwordField = $( this ).parent().parent().prev().children().first().children().first();
    		var $confirmEvaluationP = $(this).parent().next().next().children().first();
    		if(this.value.length == 0){
    			$confirmEvaluationP.text("");
    		}
    		else{
	    		if ($passwordField.val() == e.target.value){
	    			$confirmEvaluationP.text("It matches with password");
	    		}
	    		else{
	    			$confirmEvaluationP.text("It does not match with password");
	    		}
	    	}
    	}
    });

    $("form").submit(function(e){
    	e.preventDefault();
    	$('#theText').parent().next().children().first().text("");
    	$('#theTextArea').parent().next().children().first().text("");
    	$('#thePassword').parent().next().children().first().text("");
    	$('#thePasswordConfirmation').parent().next().children().first().text("");
    	$('#thePasswordConfirmation').parent().next().next().children().first().text("");
    	if ( checkPasswordMatch() && checkLength() ){
    		$( 'h4' ).removeClass('before-submission');
    	}
    	else{
    		printErrors();
    	}
  	});
});

function printErrors(){
	if (!checkTextFieldLen()){
		$('#theText').parent().next().children().first().text("Text too short, it should be at least 4 chars long");
		$('#theText').parent().next().children().first().addClass('error-message');
	}
	if (!checkTextAreaLen()){
		$('#theTextArea').parent().next().children().first().text("Text too short, it should be at least 4 chars long");
		$('#theTextArea').parent().next().children().first().addClass('error-message');
	}
	if (!checkPasswordLen()){
		$('#thePassword').parent().next().children().first().text("Password too short, it should be at least 4 chars long");
		$('#thePassword').parent().next().children().first().addClass('error-message');
	}
	if (!checkPasswordMatch()){
		$('#thePasswordConfirmation').parent().next().next().children().first().text("Passwords do not match");
		$('#thePasswordConfirmation').parent().next().next().children().first().addClass('error-message');
	}
}

function checkPasswordMatch(){
	return ( $('#thePassword').val() == $('#thePasswordConfirmation').val() );
}

function checkLength(){
	return ( 	checkTextFieldLen() &&
    			checkTextAreaLen() &&
    			checkPasswordLen() &&
    			checkPasswordConfirmLen()
    		);
}

function checkTextFieldLen(){
	return (
				($('#theText').val().length >= 4) && 
				($('#theText').val().length <= 32)
			);
}

function checkTextAreaLen(){
	return (
				($('#theTextArea').val().length >= 4) && 
				($('#theTextArea').val().length <= 140)
			);
}

function checkPasswordLen(){
	return (
				($('#thePassword').val().length >= 4) && 
				($('#thePassword').val().length <= 16)
			);
}

function checkPasswordConfirmLen(){
	return (
				($('#thePasswordConfirmation').val().length >= 4) && 
				($('#thePasswordConfirmation').val().length <= 16)
			);
}

function getNewLength(id, curLength) {
	switch(id) {
	    case "theText":
	        new_length = 32 - curLength;
	        break;
	    case "theTextArea":
	        new_length = 140 - curLength;
	        break;
	    default:
	        new_length = 16 - curLength;
	        break;
	}
	return new_length;
}
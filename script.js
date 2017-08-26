$(document).ready( function(){
	"use strict";
	console.log("Done loading ...");

	//capture and process keystrokes
	$('.count').keyup(function() {
		var $this = $(this);
		var value = $this.val(); // the ongoing value
		var length = value.length;
		var charRemaining = $this.attr('maxlength')-length;
		var id = this.id;
		var $label = $('label[for="' + id + '"]'); // example: label[for"textfield"]
		var password1 = $('#password1').val();
		var password2 = $('#password2').val();		

		//show chars remaining and handle password sameness check
		if (length) {
			if (id=='password2') {
				if (password2 !== password1) {
					$label
						.removeClass('hidden-count')
						//put the html as contents of <label></label>
						.html(charRemaining + ' characters remaining with <span class=error>password mismatch</span>');
				} else {
					$label
						.removeClass('hidden-count')
						//put the html as contents of <label></label>
						.html(charRemaining + ' characters remaining');					
				}
			} else {
				$label
					.removeClass('hidden-count')
					//put the html as contents of <label></label>
					.html(charRemaining + ' characters remaining');
			}		
		} else {
			$label.addClass('hidden-count');	
		}

	});

	//handle submit validation
	$('input[type="submit"]').click(function(event) { 
		$('.validate').each(function(index,element){
			var $this = $(this);
			// using $myTextfield.attr('minlength') will produce default error handling by browser
			// thus need to use data-minlength as below
			var min = $this.data('minlength');
			var max = $this.attr('maxlength');
			var value = $this.val();
			var length = value.length;
			var charRemaining = max-length;
			var id = this.id;
			var $label = $('label[for="' + id + '"]'); // example: label[for"textfield"]
			var password1 = $('#password1').val();
			var password2 = $('#password2').val();		

			if ((length < min ) || (max < length)) {
				$label.removeClass('hidden-count');
				var $errorCode;
				if (id === "password2") {
					if ( password2 !== password1) {
						$errorCode = "Field must be " + min + "-" + max + " characters and password mismatch";
					} else {
						$errorCode = "Field must be " + min + "-" + max + " characters";
					}
				} else {
					$errorCode = "Field must be " + min + "-" + max + " characters";
				}
				var $errorCodeStyled = $('<span>')
					.addClass('error')
					//put the html as contents of <span></span>
					.html($errorCode);
				$label
					//put the html (span tags) as content of <label></label>
					.html($errorCodeStyled);
				$this.addClass('error-highlight');					
				//needed to prevent submission to form action (when submit button clicked)
				event.preventDefault();	
			} 

		});
	});

});
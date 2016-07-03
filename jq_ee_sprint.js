'use strict;'

var controller = {
	init: function(){
		view.init();
	}
}

var view = {
	init: function(){
		// set delegated listener on the input
		// if input_length === 0, set display string to ""
		// if input_length <= 32, set display string to (32 - input_length) + " characters left"
		// if input_length >32, retrieve the first 32 characters of the value and set the value to that. Display will say "0 characters left"
		$(":text").on( 'keyup', function(){
			var input_length = $(event.target).val().length;
			if (input_length === 0) {
				$("#input-message").text("");
			} else if (input_length < 33) {
				var characters_left = 32 - input_length;
				$("#input-message").text(characters_left + " characters left.");
			} else {
				$(event.target).val( $(event.target).val().substr(0, 32) );
				$("#input-message").text("0 characters left.");
			};
		});
	}
}


$(document).ready(function(){
    controller.init();
});
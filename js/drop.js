


// $(document).ready(function(){ eventListeners() });

var eventListeners = function() {
	$('#drop-list').on('click', function(){
		// console.log(this);
		dropdown.show();
	});

	$('.drop-item').on('click', function(){
		// console.log(this);
		dropdown.fill(this);
	});
};

var dropdown = {

	show: function() {
		var listItems = $('#drop-list').children('.drop-item');
		// console.log( listItems );	
		var $listItems = $(listItems);
		// console.log( $listItems );
		if ($listItems.hasClass('hide') === true) {
			$listItems.slideDown().removeClass('hide').addClass('show');
		} else {
			$listItems.slideUp().removeClass('show').addClass('hide');
		}
		
	},

	fill: function(li) {
		console.log(li);
		var li = li.innerText;
		console.log(li);

		$('#topping').html(li);
	}


};




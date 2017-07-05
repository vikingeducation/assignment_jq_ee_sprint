function dropEventListeners() {

		$('#drop-list').on({
			click: function(){ dropdown.show(); }
		});

		$('.drop-item').on('click', function(){
			dropdown.fill(this);
		});

};

var dropdown = {
	show: function() {
		var listItems = $('#drop-list').children('.drop-item');
		var $listItems = $(listItems);
		
		if ($listItems.hasClass('hide') === true) {
			$listItems.slideDown().removeClass('hide').addClass('show');
		} else {
			$listItems.slideUp().removeClass('show').addClass('hide');
		}
		
	},

	fill: function(li) {

		var li = li.innerText;

		$('#topping').html(li);
	},
};


$(document).ready(function(){ dropEventListeners() });



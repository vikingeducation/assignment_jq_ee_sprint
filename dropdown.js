$(document).ready(function() {
	dropdownMenu.init();
})

var dropdownMenu = {

	init: function() {

		$("li:first-of-type").click(function(event) {
			dropdownMenu.slideDown(event);
		});

		$("li").not(":first-of-type").hover(function(event) {
			dropdownMenu.hoverElement(event);
		});

		$("li").not(":first-of-type").click(function(event) {
			dropdownMenu.selectElement(event);
		});

	},

	slideDown: function(event) {
		$(event.target).siblings().slideToggle();
	},

	hoverElement: function(event) {
		$(event.target).toggleClass("invert");
	},

	selectElement: function(event) {
		var $selectedItemContent = $(event.target).text();

		$("li:first-of-type").text($selectedItemContent);
	}
};
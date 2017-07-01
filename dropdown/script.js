$(document).ready(function() {
	slideMenu = function() {
		$(".selection").slideToggle(300, function() {
			$(this).toggleClass("hidden");
		});
	};

	makeSelection = function(selection) {
		$("#main").text(selection.text());
		$("input").val($("#main").text());
	}

	$("#main").on("click", slideMenu);

	$(".selection").on("click", function() {
		makeSelection($(this));
		slideMenu();
	})
});
$(document).ready(function() {
	$(".list").hide();

	$(".list").on("mouseenter", "li", function() {
		$(this).addClass("li-hover");
	});

	$(".list").on("mouseleave", "li", function() {
		$(this).removeClass("li-hover");
	});


	$('.selector').on("click", function() {
		if ( $(".list").css("display") === "none" ) {
			$('.list').slideDown(300);
		} else {
			$('.list').slideUp(300);
		}
	})

	$(".list").on("click", "li", function() {
		var li = $(this).html();
		$(".selector").val( li );
		$('.list').slideUp(300);
	})
});
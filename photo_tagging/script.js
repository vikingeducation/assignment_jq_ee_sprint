$(document).ready(function(){

	console.log("script running");

	$("img").on("mousemove", function(e){
		if ($("img").hasClass("tagging")) {
			return;
		}
		$("#tagger").css({
			left: e.pageX - 20,
			top: e.pageY - 20
		});
	});

	$("img").on("mouseenter", function(e){
		if ($("img").hasClass("tagging")) {
			return;
		}		
		$("#tagger").removeClass("invisible");
	});

	$("img").on("mouseleave", function(e){
		if ($("img").hasClass("tagging")) {
			return;
		}			
		$("#tagger").addClass("invisible");
	});

	$("p").on("click", function(e){
		

			console.log("p clicked");
			

			$('<div></div>')
				.addClass("fixed-square")
				.appendTo("body")
				.css({
					left: x,
					top: y
				})
				.html($(e.target).html());

			$("#dropdown").addClass("invisible");
			$("img").removeClass("tagging");
		
	});

	$("img").on("click", function(eventObj){
		if (!$("img").hasClass("tagging")) {
			console.log("img clicked");
			$("img").addClass("tagging");
			$("#dropdown").removeClass("invisible");
			x = eventObj.pageX - 20;
			y = eventObj.pageY - 20;
		} else {
			$("#dropdown").addClass("invisible");
			$("img").removeClass("tagging");
		}
	});












});
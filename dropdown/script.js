$(document).ready(function(){

	console.log("script running");

	$(document).on("click", ".start", function(){
		$("div").addClass("open");
	});

	$(document).on("click", ".open", function(eventObj){
		if (!$(eventObj.target).hasClass("selected")) {
			$("div").removeClass("selected");
			$(eventObj.target).addClass("selected");
			$("body").prepend(eventObj.target);
			$("div").removeClass("open");
			if (!$(eventObj.target).hasClass("start")) {
				$(".start").remove();
			}
		}
	});

	$(document).on("click", ".selected", function(eventObj){
		$("div").toggleClass("open");
	});








});
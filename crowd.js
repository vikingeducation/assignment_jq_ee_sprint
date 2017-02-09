
$(document).ready(function () {
	var mousePositionLeft;
	var mousePositionTop;
	var leftPos;
	var topPos;
	var listPositionLeft;
	var listPositionTop;
	
	/*keep track of mouse position on page, 
	show target box when mouse enters image,
	target box moves around with mouse,
	target box disappers after mouse leaves image
	*/
	$(document).mousemove(function (event) {
		mousePositionLeft = event.pageX - 25;
		mousePositionTop = event.pageY - 25;
		listPositionLeft = event.pageX - 64.7;
		listPositionTop = event.pageY + 10;
		leftPos = mousePositionLeft.toString() + "px";
		topPos = mousePositionTop.toString() + "px";
		namesLeftPos = listPositionLeft.toString() + "px";
		namesTopPos = listPositionTop.toString() + "px";
	});

	$("img").mouseenter(function () {
		$("div").toggle(true);
	});

	$("img").mousemove(function() {
		$("div").toggle(true);
		$("div").css("left", leftPos);
		$("div").css("top", topPos);
	});
	
	// create new box when click on image
	$("div").mousedown(function () {
		$("div").toggle(false);
		$("body").append("<section></section>");
		$("section").addClass("target-select");
		$("section:last").css("left", $("div").css("left"));
		$("section:last").css("top", $("div").css("top"));
		
		// create dropdown menu of names	
		$("body").append("<ul><li>Frank</li><li>Jenn</li><li>Kevin</li><li>Jess</li></ul>");
		$("ul:last").css("left", namesLeftPos);
		$("ul:last").css("top", namesTopPos);

		// remove section box if name not chosen
		// at least one section must be present
		if ($("ul").eq(-2).css("display") == "block") {
			$("section").eq(-2).remove();
			$("ul").eq(-2).remove();	
		}

	});

	// dropdown menu of names slides up when click on list
	// name chosen input into new box
	$("body").on("click", "li", function (event) {
		$("ul").slideUp();
		$("section:last").append("<span></span>");
		$("span:last").append(event.target.textContent);
	});
	
	$("img").mouseup(function () {
		$("div").toggle(false);
	});


	$("img").mouseleave(function () {
		$("div").toggle(false);
	});

});


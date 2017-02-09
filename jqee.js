
$(document).ready(function () {

	var getMaxLength = function (jqObj) {
		return parseInt(jqObj.attr("maxlength"));
	}

	var getLengthAvail = function (jqObj) {
		return getMaxLength(jqObj) - (jqObj.val().length);
	}

	$("input:text").keyup(function () {
		var maxLength = getMaxLength($(this));
		var lengthAvail = getLengthAvail($(this));
		$(this).removeClass("error");
		$("#text-counter span").text(lengthAvail);
		$("#text-counter").show();
		if (lengthAvail === maxLength) {
			$("#text-counter").hide();
		}
	});

	$("textarea").keyup(function () {
		var maxLength = getMaxLength($(this));
		var lengthAvail = getLengthAvail($(this));
		$(this).removeClass("error");
		$("#textarea-counter span").text(lengthAvail);
		$("#textarea-counter").show();
		if (lengthAvail === maxLength) {
			$("#textarea-counter").hide();
		}
	});

	$("input[name='confirmation']").keyup(function () {
		$("#text-confirmation").show();
		if ($(this).val().length === 0) {
			$("#text-confirmation").hide();
		} else if ($(this).val() === $("input[name='password']").val()) {
			$("#text-confirmation").text("Password matches!");
		} else {
			$("#text-confirmation").text("Password not matching");
		}
	});

	 /* validations: 1. text-field needs min length of 4 characters,
	 	2. text-area needs min length of 4 characers,
	 	3. password AND confirmation need min length of 6 characters,
	 	4. highlight confirmation input box if password !== input password.
	 	****HIGHLIGHT BOXES THAT DO NOT MEET THESE VALIDATIONS!!!!
	 	*/

	 $("input:button").click(function (event) {
	 	event.preventDefault();
	 	if ($("input:text").val().length < 4) {
	 		$("input:text").addClass("error");
	 		$("#text-counter").addClass("red").show().text("Must be at least 4 characters");
	 	}
	 	if ($("textarea").val().length < 4) {
	 		$("textarea").addClass("error");
	 		$("#textarea-counter").addClass("red").show().text("Must be at least 4 characters");
	 	}
	 	if ($("input[name='password']").val().length < 6) {
	 		$("input[name='password']").addClass("error");
	 		$("#error-message").show().addClass("red");
	 	}
	 	if ($("input[name='password']").val() !== $("input[name='confirmation']").val()) {
	 		$("input[name='confirmation']").addClass("error");
	 		$("#text-confirmation").addClass("red");
	 	}		
	 });	
	 
	 // Drop down menu
	 var clickCounter = 0;
	 $("button").click(function () {
	 	event.preventDefault();
	 	
	 	clickCounter += 1;
	 	if (clickCounter % 2 !== 0) {
	 		$("div").slideDown();
	 	} else if(clickCounter % 2 === 0) {
	 		$("div").slideUp();
	 	}
	});

	$("div span").mouseenter(function () {
		$(this).addClass("mouseenter");
	});
	$("div span").mouseleave(function () {
		$(this).removeClass("mouseenter");
	});	
	$("div span").click(function () {
		$("button").text($(this).text());
		$("div").slideUp();
		clickCounter = 0;
	});



});









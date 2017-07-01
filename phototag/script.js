$(document).ready(function() {
	var handlers = {
		imgHandler: function() {
				$("img").on("mouseover", function(e) {
				displayTarget(e);
			});
		},

		containerHandler: function() {
			$("#img-container").hover(
				function() {
					$("#target").removeClass("hidden");
				},
				function() {
					$("#target").addClass("hidden");
			});

			$("#img-container").on("click", function(e) {
				cancelTarget(e);
			});
		},

		targetHandler: function() {
				$("#target").on("click", function(e) {
				var $targetBox = makeBox(e);
				var $nameList = assembleNames(["Grumpy", "Dopey", "Sneezy", "Doc"]);
				targetClicked(e, $targetBox, $nameList);
			});
		},

		liHandler: function() {
			$("li").not(".tag").on("click", function(e) {
				chooseTag(e, $(this));
				e.stopPropagation();
			});
		}
	};

	var displayTarget = function(e) {
		var left = e.pageX - 50;
		var top = e.pageY - 50;

		$("#target").css({
       left: left,
       top: top,
    });
	};

	var assembleNames = function(names) {
		$nameList = $("<ul></ul>");

		names.forEach(function(name) {
			$nameList.append($("<li></li>")
				.text(name)
				.addClass("hidden"));
		});

		return $nameList
	};

	var makeBox = function(e) {
		$targetBox = $("<div></div>")
			.addClass("box");

		return $targetBox;
	};

	var targetClicked = function(e, $targetBox, $nameList) {
		e.stopPropagation();
		var left = e.pageX - 50;
		var top = e.pageY - 50;

		var $newContainer = $("<div></div>")
			.addClass("container active")
			.css({
				position: "absolute",
				left: left,
				top: top
			});

		$("#img-container").off("mouseenter");

		$newContainer.append($targetBox);
		$newContainer.append($nameList);

		$("#target").addClass("hidden");

		$("#img-container").append($newContainer);

		$($newContainer.find("li")).slideDown(300, function() {
			$(this).removeClass("hidden");
		});

		handlers.liHandler();
	};

	var cancelTarget = function(e, $currentTarget) {
		$(".active").remove();

		$("#target").removeClass("hidden");
		handlers.containerHandler();
		displayTarget(e);
	};

	var chooseTag = function(e, $element) {
		$element.addClass("tag");
		$element.off("click");

		$(".active").removeClass("active");

		$("li").not(".tag").slideUp(300, function() {
			$(this).addClass("hidden");
		});

		$("#target").removeClass("hidden");
		displayTarget(e);
		handlers.containerHandler();
	};

	var addHandlers = function() {
		handlers.imgHandler();
		handlers.containerHandler();
		handlers.targetHandler();
	};

	addHandlers();
});
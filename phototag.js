// Create red bordered div on mouse enter
// Div should be centered around mouse
// If user clicks, list of names should pop out
// Border color changes to green
// If user selects name, div should stick on image
// New red bordered div gets created

$(document).ready(function() {
	photoTagger.init();
});

var photoTagger = {

	init: function() {
		// Initialize appearance phototagger when entering picture
		$(".image-container").mouseenter(function(event){
			photoTagger.tagInit(event);
		});
		// Move tagging box around in the picture
		$(".image-container").mousemove(function(event){
			photoTagger.movingAround(event);
		});
		// Make phototagger disappear upon mouse leave from picture
		$(".image-container").mouseleave(function(event){
			photoTagger.destroyTag(event);
		});
		// Make phototagger attach to picture
		$(".image-container").click(function(event){
			photoTagger.attach(event);
		});

	},

	tagInit: function(event) {
		var $tagger = $("<div>").addClass("photo-tagger").attr("id", "moving-tagger");
		photoTagger.position(event, $tagger).insertAfter("img");
	},

	position: function(event, tagger) {
		var xCoordinate = event.pageX - $(".image-container").offset().left;
		var yCoordinate = event.pageY - $(".image-container").offset().top;

		return tagger.css({
			"top": yCoordinate - 40,
			"left": xCoordinate - 40
		});
	},

	movingAround: function(event) {
		photoTagger.position(event, $("#moving-tagger"));
	},

	destroyTag: function(event) {
		$("#moving-tagger").remove();
	},
	attach: function(event) {
		var $taggerToAttach = $("#moving-tagger").removeAttr("id");
		var $listOfNames = $("<ul>").addClass("tag-names")
			.append($("<li>").text("Jake"))
			.append($("<li>").text("John"))
			.append($("<li>").text("Sara"));

		$taggerToAttach.append($listOfNames).addClass("attached");

		$taggerToAttach.find("ul").click("li", function(event){
			var $selectedName = $(event.target).addClass("selected-name");
			$(this).find("li").remove();
			$(this).append($selectedName);
		})
	}

};

			

			
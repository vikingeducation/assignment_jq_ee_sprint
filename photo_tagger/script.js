'user strict';

$(document).ready(function() {

	var tagger = {
		createTarget: function() {
			var $target = $("<div></div>")
					   .addClass("target");
		    $target.insertAfter( $('img') );
		    $target.hide();
		},

		showTagger: function() {
			$('.target').show();
		},

		hideTagger: function() {
			$('.target').hide();
		}
	}

	var dropDown = {
		createDropDown: function(target) {
			var $dropdown = $("<ul>")
							.addClass("list")
							.html("<li>Paul</li>" + 
								   "<li>Jack</li>" +
								   "<li>Chris</li>");
			$dropdown.insertAfter(target);
		    $dropdown.hide();
		},

		openDropDown: function(target) {
			$('.list').css({ left: target.css("left"),
	 						 top: parseInt( target.css("top") ) + 70
							})
			$('.list').slideDown();
			interaction.clickListElement(target);
		},

		closeDropDown: function() {
			$('.list').slideUp();
		},

	}

	var interaction = {
		imageHover: function() {
			$('img').hover( tagger.showTagger, tagger.hideTagger );

			$('img').on("mousemove", function(event) {
				if ($('img').hasClass("searching")) {
					$(".target").css({
									"left": event.pageX - 35,
									"top": event.pageY - 35
								 });
				}
			})

			$('.wrapper').on("click", function() {
				if ($('img').hasClass("searching")) {
					$('img').removeClass("searching");
					var $target = $('.target');
					$target.addClass("clicked").removeClass('target');
					dropDown.createDropDown($target);
					dropDown.openDropDown($target);
				}
			})
		},

		clickListElement: function(target) {
			$('.list').on("click", "li", function() {
				$name = $('<div></div>')
						.addClass("name-tag")
						.html( $(this).html() );

				$name.css({
					position: "absolute",
					left: target.css("left"),
					top: parseInt( target.css("top") ) + 90
				})

				$name.insertAfter(target);
				$(".list").remove();
				
				$("img").addClass("searching")
				tagger.createTarget();
			})
			
		}
	}

	var init = {
		start: function() {
			tagger.createTarget();
			interaction.imageHover();
		}
	}

	init.start();
});
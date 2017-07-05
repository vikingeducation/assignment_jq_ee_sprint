"use strict";

var eventListeners = function() {
	$('#the-fam-img').on({
		click: function(){ tag.main( this ) },
	});
	$('.img-container').on({
		mouseenter: function(){ tag.showBox() },
		mouseleave: function(){ tag.hideBox() },
	});
}

var tag = {

	loops: [],

	count: function(){

		for (var i = this.loops.length; i < this.loops.length + 1; i++) {
			this.loops.push('loop' + i);
			return i;
		}
	},

	main: function(img) {
		
		var loopNum = this.count();
		var $firstTag = this.stick(img, loopNum);
		this.drop($firstTag, loopNum);
		this.listItemClick();
		this.taggedItemClick();
	},

	stick: function(img, num) {
		var img = img;
		var $img = $(img);
		var tags = [];
		
	// Get the coordinates of the image
		var imgPos = img.getBoundingClientRect();
		var imgTop = imgPos.top;
		var imgLeft = imgPos.left;
		
	// get the coordinates of the click event
		var x = event.clientX;
		var y = event.clientY;

	// create element in DOM 
		$img.after("<div class='show tag'></div>");

	// add top and left positioning of the mouse click to the last div created by subtracting the mouse click x & y coordinates from the x & y coordinates of the top left corner of the image 
		$firstTag.css('top', y - imgTop); 
		$firstTag.css('left', x - imgLeft);

	// select all of the added divs
		var $tags = $img.siblings();

	// select the last div added
		var firstTag = $tags[0];
		var $firstTag = $(firstTag);

	// Add a unique id to the last div created
		var tagId = 'tag' + num;
		$firstTag.attr('id', tagId);

	// Add list of names to tag box
		$firstTag.append('<ul class="drop"><li id="tagged"><br></li><li class="name hide">Jessica</li><li class="name hide">Finnley</li><li class="name hide">Colin</li></ul>');

		return $firstTag;
		
	},

	drop: function($firstTag, loopNum) {
	// get tag id
		var tagIdSelected = $firstTag.attr('id');
		tagIdSelected = '#' + tagIdSelected;

	// get the list items of the tag who's id was selelcted
		var $names = $(tagIdSelected).find('.name');

		if ($names.hasClass('hide') === true) {
			$names.slideDown().removeClass('hide').addClass('show');
		} else {
			$names.slideUp().removeClass('show').addClass('hide');
		}

	},

	listItemClick: function() {
		$('.name').click(function(){ 

			var tagged = this.innerText;

			$('#tagged').html(tagged);

			var $list = $('.drop').children('.name');

			$list.slideUp().removeClass('show').addClass('hide');

		});

	},

	taggedItemClick: function($list) {
		var $list = $('.drop').children('.name');

		$('#tagged').click(function() {

			if ($('#tagged').siblings().hasClass('hide') === true) {
				$list.slideDown().removeClass('hide').addClass('show');
			} else {
				$list.slideUp().removeClass('show').addClass('hide');
			}

		});
	},

	showBox: function() {
		var $tags = $('.img-container').children('div');
		
		if ($tags.hasClass('hide') === true) {
			$tags.removeClass('hide').addClass('show');
		}
	},

	hideBox: function() {
		var $tags = $('.img-container').children('div');
		
		if ($tags.hasClass('show') === true) {
			$tags.removeClass('show').addClass('hide');
		}
	},

}



$(document).ready(function(){ eventListeners() });
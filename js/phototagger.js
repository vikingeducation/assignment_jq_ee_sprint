"use strict";

var eventListeners = function() {
	$('#the-fam-img').on({
		click: function(){ console.log('test');tag.main( this ) },
	});
	$('.img-container').on({
		mouseenter: function(){ tag.showBox() },
		mouseleave: function(){ tag.hideBox() },
	});

}

var tag = {

	loops: [], // store the amount of loops

	count: function(){
	// loop each iteration--this is done in order to give the tag boxes a unique id
		for (var i = this.loops.length; i < this.loops.length + 1; i++) {
			this.loops.push('loop' + i);
			return i;
		}
	},

	main: function(img) {
		
		var loopNum = this.count();
		var $firstTag = this.stick(img, loopNum);
		this.drop($firstTag, loopNum);
		this.listItemClick($firstTag, loopNum);
		this.taggedItemClick($firstTag, loopNum);
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

	// select all of the added divs
		var $tags = $img.siblings();

	// select the last div added
		var firstTag = $tags[0];
		var $firstTag = $(firstTag);

	// add top and left positioning of the mouse click to the last div created by subtracting the mouse click x & y coordinates from the x & y coordinates of the top left corner of the image 
		$firstTag.css('top', y - imgTop); 
		$firstTag.css('left', x - imgLeft);

	// Add a unique id to the last div created
		var tagId = 'tag' + num;
		$firstTag.attr('id', tagId);

	// Add list of names to tag box
		$firstTag.append('<ul class="drop"><li id="tagged"><br></li><li class="name hide">Jessica</li><li class="name hide">Finnley</li><li class="name hide">Colin</li></ul>');

		return $firstTag;
		
	},

	getId: function($firstTag, loopNum) {
	// get tag id
		var tagIdSelected = $firstTag.attr('id');
		tagIdSelected = '#' + tagIdSelected;

	// get the list items of the tag who's id was selelcted
		var tagIdSelected = $(tagIdSelected);

		return tagIdSelected;
	},

	drop: function($firstTag, loopNum) {
	// get tag id
		var tagIdSelected = this.getId($firstTag, loopNum);

	// get the list items of the tag who's id was selelcted
		var $list = $(tagIdSelected).find('.name');

		if ($list.hasClass('hide') === true) {
			$list.slideDown().removeClass('hide').addClass('show');
		} else {
			$list.slideUp().removeClass('show').addClass('hide');
		}

	},

	listItemClick: function($firstTag, loopNum) {

		$('.name').click(function(){ 
		// get the list item selected
			var $liClicked = $(this);

		// get the grandparent div of the list item selected
			var $div = $liClicked.parent().parent();

		// get the list item for the displayed name when dropdown is not visible
			var $tagged = $div.find('#tagged');

		// fill in the list item that is always visible with the name that was clicked
			$tagged.html( $liClicked.text() );

		// hide dropdown slider after a name is selected
			var $list = $('.drop').children('.name');
			$list.slideUp().removeClass('show').addClass('hide');

		});

	},

	taggedItemClick: function($firstTag, loopNum) {
	// get tag id
		var tagIdSelected = this.getId($firstTag, loopNum);

	// get the list items of the tag who's id was selelcted
		var $list = $(tagIdSelected).find('.name');

	// open and close name dropdown when a different name wants to be selected
		$('#tagged').click(function() {

			if ($('#tagged').siblings().hasClass('hide') === true) {
				$list.slideDown().removeClass('hide').addClass('show');
			} else {
				$list.slideUp().removeClass('show').addClass('hide');
			}

		});
	},

	showBox: function() {
	// show the tag box when the mouse is hovered over the image
		var $tags = $('.img-container').children('div');
		
		if ($tags.hasClass('hide') === true) {
			$tags.removeClass('hide').addClass('show');
		}
	},

	hideBox: function() {
	// hide the tag box when the mouse is not hovered over the image
		var $tags = $('.img-container').children('div');
		
		if ($tags.hasClass('show') === true) {
			$tags.removeClass('show').addClass('hide');
		}
	},

}



$(document).ready(function(){ eventListeners() });
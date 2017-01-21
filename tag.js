var curX = 0;
var curY = 0;
var slideCompleted

$( document ).ready(function() {

	$( "#theImageContainer" ).hover(function(e){
		console.log('first hover in');
		overall_hover_in_handler(e);
	}, function(e){
		overall_hover_out_handler(e);
	});

	$( "#theImage" ).click(function(e){
		if(e.pageX - 40 <= curX && e.pageY - 40 <= curY){
			var targetID = '#x' + curX + 'y' + curY;
			$(targetID).children().first().next().slideDown();
			$( "#theImage" ).off('mousemove');
			$( "#theImageContainer" ).off('mouseenter');
			$( "#theImageContainer" ).off('mouseleave');
			var $selected = $(targetID).children().first().next().children().first();
			var $friend1 = $selected.next();
			var $friend2 = $friend1.next();
			var $friend3 = $friend2.next();
			$friend1.click(function(e){
				select_tag($selected, targetID, 'Ronaldo', e);
			});
			$friend2.click(function(e){
				select_tag($selected, targetID, 'Rivaldo', e);
			});
			$friend3.click(function(e){
				select_tag($selected, targetID, 'Romario', e);
			});
		}
		else{
			var targetID = '#x' + curX + 'y' + curY;
			$(targetID).remove();
			overall_hover_in_handler(e);
			$( "#theImageContainer" ).hover(function(e){
				console.log('first hover in');
				overall_hover_in_handler(e);
			}, function(e){
				overall_hover_out_handler(e);
			});
		}
	});

});

function overall_hover_in_handler(e){
	$target = create_target(e.pageX, e.pageY);
	curX = e.pageX;
	curY = e.pageY;
	move_target($target, e.pageX, e.pageY);
	$( "#theImage" ).on('mousemove', function(e){
		move_target($target, e.pageX, e.pageY);
	});
}

function overall_hover_out_handler(e){
	remove_target();
}

function select_tag(selected, targetID, selection, e){
	selected.children().first().text(selection);
	selected.css('border-bottom', '4px solid red');
	selected.css('border-left', '4px solid red');
	selected.css('border-right', '4px solid red');
	selected.css('background-color', 'green');
	selected.children().first().css('text-decoration', 'none');
	selected.children().first().css('color', 'black');
	$(targetID).children().first().next().slideUp();
	$(targetID).append(selected);
	//$newTarget = create_target(e.pageX, e.pageY);
	//move_target($newTarget, e.pageX, e.pageY);
	$( "#theImageContainer" ).hover(function(e){
		console.log('second hover in');
		overall_hover_in_handler(e);
	}, function(e){
		overall_hover_out_handler(e);
	});
}

function remove_target(){
	$('#x' + curX + 'y' + curY).remove();
}

function move_target(target, x, y){
	var newX = x - 40;
	var newY = y - 40;
	target.css('top', newY + 'px');
	target.css('left', newX + 'px');
	target.attr('id', 'x' + newX + 'y' + newY);
	curY = newY;
	curX = newX;
}

function create_target(x, y){
	var $targetWrapper = $('<div></div>').attr('id', 'x' + x + 'y' + y).addClass('target-wrapper');
	var $targetSquare = $('<div></div>').addClass('target-square');
	var $friendList = $('<div></div>').addClass('friend-list');
	var $friend1 = $('<div></div>').attr('id', 'selected').addClass('friend');
	var $friend2 = $('<div></div>').attr('id', 'friend1').addClass('friend');
	var $friend3 = $('<div></div>').attr('id', 'friend2').addClass('friend');
	var $friend4 = $('<div></div>').attr('id', 'friend3').addClass('friend');
	var $atag1 = $('<a></a>').attr('href', '#').text('');
	var $atag2 = $('<a></a>').attr('href', '#').text('Ronaldo');
	var $atag3 = $('<a></a>').attr('href', '#').text('Rivaldo');
	var $atag4 = $('<a></a>').attr('href', '#').text('Romario');
	$('.container').append($targetWrapper);
	$targetWrapper.append($targetSquare);
	$targetWrapper.append($friendList);
	$friendList.append($friend1);
	$friendList.append($friend2);
	$friendList.append($friend3);
	$friendList.append($friend4);
	$friend1.append($atag1);
	$friend2.append($atag2);
	$friend3.append($atag3);
	$friend4.append($atag4);
	return $targetWrapper;
}
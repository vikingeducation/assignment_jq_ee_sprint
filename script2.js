//set up divs to make border + name field to be left on the image
function tagRest(event){
	let willAppend = $('<div></div>');
	willAppend.css("top", $('#mouseFollow').css("top"));
	willAppend.css("left", $('#mouseFollow').css("left"));
	willAppend.css("border-width", `2px`);
	willAppend.css("border-style", `solid`);
	willAppend.css("border-color", "#61BC47");
	willAppend.css("height", `100px`);
	willAppend.css("width", `100px`);
	willAppend.css("position", `absolute`);

	let nameBelow = $('<div></div>');
	nameBelow.css({ "top": `${parseInt(willAppend.css("top")) + 104}px`,
		      "left": willAppend.css("left"),
		      "border-width": "2px",
		      "border-color": "#61BC47",
		      "border-style": "solid",
		      "height": "25px",
		      "width": "100px",
		      "position": "absolute",
		      "background": "#61BC47",
		      "text-align": "center"
	});
	nameBelow.html(event.target.textContent);


	$('body').append(willAppend);
	$('body').append(nameBelow);
}

//clean up listeners to prevent duplication and $('img') click lets you click away
function tagPart(event){
	$('#mouseFollow').off();
	$('#dropList').show();
	$('#dropList li').show();
	$('img').click(function(eventQ){
		eventQ.stopPropagation();
		$('#dropList').hide();
		$('#dropList li').hide();
		$('#dropList').off();
		$('#dropList li').off();
		enterMouseFunction(eventQ);
	});
	$('#dropList li').click(function(event4){
		event4.stopPropagation();
		$('#dropList').hide();
		$('#dropList li').hide();
		tagRest(event4);
		$('#dropList li').off();
		$('#mouseFollow').off();
		enterMouseFunction(event4);
	});	
}

function enterMouseFunction(event){
	$('#mouseFollow').removeClass("hidden");
	$('#dropList').hide();
	$('#dropList li').hide();
	$('#mouseFollow').css("left", `${event.pageX-50}px`);
	$('#mouseFollow').css("top", `${event.pageY-50}px`);
	
	//compicated to keep the selector inside the image, I would have just made it a child, but that kept breaking things
	if(event.pageX - 50 < $('img').position().left){
		$('#mouseFollow').css("left", `${$('img').position().left}px`);
		if(event.pageY - 50 < $('img').position().top){
			$('#mouseFollow').css("top", `${$('img').position().top}px`);
		}else if(event.pageY + 50 > $('img').position().top + parseInt($('img').css("height"))){
			$('#mouseFollow').css("top", `${$('img').position().top + parseInt($('img').css("height")) - 100}px`);
		}else{
			$('#mouseFollow').css("top", `${event.pageY-50}px`);
		}
	}else if(event.pageY - 50 < $('img').position().top){
		$('#mouseFollow').css("top", `${$('img').position().top}px`);
		if(event.pageX - 50 < $('img').position().left){
			$('#mouseFollow').css("left", `${$('img').position().left}px`);
		}else if(event.pageX + 50 > $('img').position().left + parseInt($('img').css("width"))){
			$('#mouseFollow').css("left", `${$('img').position().left + parseInt($('img').css("width")) - 100}px`);
		}else{
			$('#mouseFollow').css("left", `${event.pageX-50}px`);
		}
	}else if(event.pageX + 50 > $('img').position().left + parseInt($('img').css("width"))){
		$('#mouseFollow').css("left", `${$('img').position().left + parseInt($('img').css("width")) - 100}px`);
		if(event.pageY - 50 < $('img').position().top){
			$('#mouseFollow').css("top", `${$('img').position().top}px`);
		}else if(event.pageY + 50 > $('img').position().top + parseInt($('img').css("height"))){
			$('#mouseFollow').css("top", `${$('img').position().top + parseInt($('img').css("height")) - 100}px`);
		}else{
			$('#mouseFollow').css("top", `${event.pageY-50}px`);
		}
	}else if(event.pageY + 50 > $('img').position().top + parseInt($('img').css("height"))){
		$('#mouseFollow').css("top", `${$('img').position().top + parseInt($('img').css("height")) - 100}px`);
		if(event.pageX - 50 < $('img').position().left){
			$('#mouseFollow').css("left", `${$('img').position().left}px`);
		}else if(event.pageX + 50 > $('img').position().left + parseInt($('img').css("width"))){
			$('#mouseFollow').css("left", `${$('img').position().left + parseInt($('img').css("width")) - 100}px`);
		}else{
			$('#mouseFollow').css("left", `${event.pageX-50}px`);
		}

	}else{
	$('#mouseFollow').css("left", `${event.pageX-50}px`);
	$('#mouseFollow').css("top", `${event.pageY-50}px`);
	}
	$('#mouseFollow').mousemove(function(event2){
		event2.stopPropagation();
		if(event2.pageX - 50 < $('img').position().left){
			$('#mouseFollow').css("left", `${$('img').position().left}px`);
			if(event2.pageY - 50 < $('img').position().top){
				$('#mouseFollow').css("top", `${$('img').position().top}px`);
			}else if(event2.pageY + 50 > $('img').position().top + parseInt($('img').css("height"))){
				$('#mouseFollow').css("top", `${$('img').position().top + parseInt($('img').css("height")) - 100}px`);
			}else{
				$('#mouseFollow').css("top", `${event2.pageY-50}px`);
			}
		}else if(event2.pageY - 50 < $('img').position().top){
			$('#mouseFollow').css("top", `${$('img').position().top}px`);
			if(event2.pageX - 50 < $('img').position().left){
				$('#mouseFollow').css("left", `${$('img').position().left}px`);
			}else if(event2.pageX + 50 > $('img').position().left + parseInt($('img').css("width"))){
				$('#mouseFollow').css("left", `${$('img').position().left + parseInt($('img').css("width")) - 100}px`);
			}else{
				$('#mouseFollow').css("left", `${event2.pageX-50}px`);
			}
		}else if(event2.pageX + 50 > $('img').position().left + parseInt($('img').css("width"))){
			$('#mouseFollow').css("left", `${$('img').position().left + parseInt($('img').css("width")) - 100}px`);
			if(event2.pageY - 50 < $('img').position().top){
				$('#mouseFollow').css("top", `${$('img').position().top}px`);
			}else if(event2.pageY + 50 > $('img').position().top + parseInt($('img').css("height"))){
				$('#mouseFollow').css("top", `${$('img').position().top + parseInt($('img').css("height")) - 100}px`);
			}else{
				$('#mouseFollow').css("top", `${event2.pageY-50}px`);
			}
		}else if(event2.pageY + 50 > $('img').position().top + parseInt($('img').css("height"))){
			$('#mouseFollow').css("top", `${$('img').position().top + parseInt($('img').css("height")) - 100}px`);
			if(event2.pageX - 50 < $('img').position().left){
				$('#mouseFollow').css("left", `${$('img').position().left}px`);
			}else if(event2.pageX + 50 > $('img').position().left + parseInt($('img').css("width"))){
				$('#mouseFollow').css("left", `${$('img').position().left + parseInt($('img').css("width")) - 100}px`);
			}else{
				$('#mouseFollow').css("left", `${event2.pageX-50}px`);
			}

		}else{
		$('#mouseFollow').css("left", `${event2.pageX-50}px`);
		$('#mouseFollow').css("top", `${event2.pageY-50}px`);
		}
	});
	$('#mouseFollow').click(function(event3){
		event3.stopPropagation();
		tagPart(event3);
	});
}

// Reset everything when leaving the area
function leaveMouseFunction(event){
	$('#mouseFollow').addClass("hidden");
	$('#dropList li').off();
	$('#mouseFollow').off();
}

function doAssignment(){
	$('#tagImg').mouseenter(function(event){
		enterMouseFunction(event);
	});
	$('#tagImg').mouseleave(function(event){
		leaveMouseFunction(event);
		});
}

$(function(){doAssignment()});

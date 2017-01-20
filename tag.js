var mouse_is_inside = false;

$( document ).ready(function() {

	$( ".image-container img" ).mouseover(function(e) {
  		move_target_to(e.pageX - 50, e.pageY - 50);
	});

	$( ".image-container" ).hover(function(e) {
  			$('.target').css('display', 'block');
		}, function(){
			$('.target').css('display', 'none');
	});

	/*$( '.target-square' ).mousedown(function(e){
		$( ".image-container img" ).off("mouseover");
		$( ".image-container" ).off("hover");
		$( '.target-square' ).css('pointer-events', 'none');
  		move_target_to(e.pageX - 50, e.pageY - 50);
	});*/
});

function move_target_to(x, y){
	$('.target').css('display', 'block');
  	$('.target').css('top', y + "px");
  	$('.target').css('left', x + "px");
}
var mouse_is_inside = false;


$( document ).ready(function() {

	$( "#theImageContainer" ).hover(function(e){
		$( "#theImage" ).on('mousemove', function(e){
			move_target(e.pageX - 50, e.pageY - 50);
		});
		move_target(e.pageX - 50, e.pageY - 50);
	}, function(e){
        $('.target').hide();
        $('#theSelected').hide();
        $('#theOther1').hide();
        $('#theOther2').hide();
	});

	$( "#theImage" ).click(function(e){
		$( "#theImage" ).off('mousemove');
		$( "#theSelected" ).slideDown('fast', function(){
			$( "#theOther1" ).slideDown('fast',function(){
				$( "#theOther2" ).slideDown('fast');
			});
		});
	});
});

function move_target(x, y){
	$('.target').css('display', 'block');
  	$('.target').css('top', y + "px");
  	$('.target').css('left', x + "px");
  	var newTop = y + 100;
  	$( "#theSelected" ).css('top', newTop + "px");
  	$( "#theSelected" ).css('left', x + "px");
  	newTop = newTop + 30;
  	$( "#theOther1" ).css('top', newTop + "px");
  	$( "#theOther1" ).css('left', x + "px");
  	newTop = newTop + 30;
  	$( "#theOther2" ).css('top', newTop + "px");
  	$( "#theOther2" ).css('left', x + "px");
}
// FORM-PAGE
$(function() {
	$('.text').keyup(function() {
	var count = $(this).val();
		var character = count.length;
		var max = 32;
		$('.count')
		.html(max - character)
		.show();
		if(character === 0){
			$('.count').hide();
		}
	});
	$('.text').mouseleave(function() {
		$('.count').hide();
	});
	$('.password').keyup(function() {
	var count = $(this).val();
		var character = count.length;
		var max = 16;
		$('.count2')
		.html(max - character)
		.show();
		if(character === 0){
			$('.count2').hide();
		}
	});
	$('.password').mouseleave(function() {
		$('.count2').hide();
	});
	$('.passwordconf').keyup(function() {
	var count = $(this).val();
		var character = count.length;
		var max = 16;
		$('.count3')
		.html(max - character)
		.show();
		if(character === 0){
			$('.count3').hide();
		}
	});
	$('.passwordconf').mouseleave(function() {
		$('.count3').hide();
	});

		$('textarea').keyup(function() {
	var count = $(this).val();
		var character = count.length;
		var max = 140;

		$('.count1')
		.html(max - character)
		.show();
		if(character === 0){
			$('.count1').hide();
		}
	});

	$('textarea').mouseleave(function() {
		$('.count1').hide();
	});
		
	
		alert("hi");

		$('#submit').click(function() {
			var counter = $('input').val();
			var character = counter.length;
			function confirm(value){
				if(character < 4){
					$(value).css('background-color', 'red');
					$('#submit').hide();
				} else if(character > max) {
					$(value).css('background-color', 'red');
					alert('too much');
				}
			}
			confirm('.text');
			confirm('.password');
			confirm('.passwordconf');
			confirm('textarea');

		});

			var password = $('.password').val();
			var passwordConf = $('.passwordconf').val();

				if(password !== passwordConf){
					$('.password').css('background-color', 'green');
				}

			// PHOTO-TAGGER

			$('ul').hover( function() {
				$(this).css('background-color', 'blue');
			});

			$('.image').mouseover( function() {
				$('.dropdown')
				.show(100)
				.css( {position:"absolute", top:event.pageY, left: event.pageX});
			});

			$('.image').mouseleave( function() {
				$('.dropdown').hide(100);
			});

			$( ".image").click( function(event) {
  				$(".dropdown").css( {position:"fixed", top:event.pageY, left: event.pageX});
			});

			$('ul').click(function() {
				$(this).val();
			})
});


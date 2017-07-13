// FORM-PAGE
$(function() {
    $('.input').keyup( function() {
	  var identifier = $(this).attr('data-panelid');
	  var chooser = "." + "count" + $(this).attr('data-panelid');
      var max = $(this).attr('data-panelid');
	  var count = $(this).val();
	  var character = count.length;
	  $(chooser)
	    .html(max - character)
	    .show();
	  if( character === 0) {
		  $(chooser).hide();
	    }
    });

    $('.input').mouseleave( function() {
    	$(chooser).hide();
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

				// DROP-DOWN

				
				$('.top').click(function() {
					$('.slidedown').slideToggle(500);
				});

				$('.id').click( function() {
					var identifier = $(this).attr('data-panelid');
				    var chooser = "." + "content" + $(this).attr('data-panelid');
					$('id').css({
						'display': "flex",
						"justify-content": "space-around",
						"flex-direction": "row"
					});
					$(chooser).slideToggle(1000);
				});


				$('li').mouseover( function () {
					$(this).css('background-color', 'blue');
				});

				$('li').mouseleave( function() {
					$(this).css('background-color',"white");
				});

				$('li').click(function() {
					var identifier = $(this).attr('data-panelid');
				    var chooser = "." + "content" + $(this).attr('data-panelid');
					$(this).siblings().slideToggle();
				});

			// PHOTO-TAGGER


			$('.image').mousemove( function() {
				$('.dropdown')
				.show(100)
				.css( {'position':'absolute', 'top':event.pageY - 70, 'left':event.pageX - 70,
						'display': 'flex', 'flex-direction': 'row', 'flex-wrap' : ' wrap', 'height': '100px'});
				$('.container').hide();
			});

			$('.image').mouseout(function() {
				$('dropdown').hide(200);
			});

			$('.image').click(function() {
				$('.dropdown')
				.css({'position':'fixed',
			         'display': 'flex',
			         'justify-content': 'space-around', 
			         'flex-direction': 'row'});
				$('.container').slideToggle(500);
			});


});


// FORM-PAGE
$(function() {
    $('.input').keyup( function() {
	  var identifier = $(this).attr('data-panelid');
	  var chooser = "." + "count" + identifier;
      var max = identifier;
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
    	var identifier = $(this).attr('data-panelid');
	    var chooser = "." + "count" + identifier;
    	$(chooser).hide(100);
    });

		alert("hi");


		$('#passwordconf').keyup( function() {
			var password = $('#password').val();
			var passwordConf = $('#passwordconf').val();
			if(password !== passwordConf) {
				var identifier = $(this).attr('data-panelid');
	            var chooser = "." + "count" + identifier;
	            $(chooser)
	            .html("<p>passwords don't match</p>")
	            .show();
	            if( passwordConf.length === 0){
	            	$(chooser).hide();
	            }
			} 
		});


		// doesn't work
		$('form').submit(function() {
			var password = $('#password').val();
			var passwordConf = $('#passwordconf').val();
		    var identifier = $(this).attr('data-panelid');
            var max = identifier;
	        var chooser = "." + "count" + identifier;
	        var lessThan = $.trim($(".input").val()).length;
	        var match = password !== passwordConf;
    	   if (lessThan < 4  || lessThan > max  || match || password === '' || passwordConf === "") {
    	   	alert('');
    	   	return false;
    	   }
    	});


				// DROP-DOWN

				
				$('.top').click(function() {
					$('.slidedown').slideToggle(500);
					if ($('.top').html() == "<h2>Click to hide dropdown</h2>") { 
					   $('.top').html("<h2>Click to view dropdown</h2>"); 
					} else {
					   $('.top').html("<h2>Click to hide dropdown</h2>");

					}
				});

				$('.id').click( function() {
					var identifier = $(this).attr('data-panelid');
				    var chooser = "." + "content" + $(this).attr('data-panelid');
					$('id').css({
						'display': "flex",
						"justify-content": "space-around",
						"flex-direction": "row"
					});
					$(chooser).slideToggle(500);
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

			$('.image').mouseleave(function() {
				$('.dropdown').fadeOut();	
			});

			$('.image').click(function() {
				$('.dropdown')
				.css({'position':'fixed', 'top':event.pageY - 70, 'left':event.pageX - 70,
			         'display': 'flex',
			         'justify-content': 'space-around', 
			         'flex-direction': 'row'});
				$('.container')
				.slideToggle(500);
			});

			$('li').click(function() {
				var name = $(this).text();
				$('.target').text(name);
				$('lia').mouseout( function() {
					$('dropdown').hide(200);
				});
			});


});


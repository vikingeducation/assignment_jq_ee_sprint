$(document).ready(function() {
	"use strict";
/*********************************************************/	
/*                    Form Validation                    */
/*********************************************************/	
	
	$('.counter').on('click change keyup paste', function() {
		
		var $this = $(this),
				id = $this.attr('id'),
				maxlength = $this.attr('maxlength'),
			  str = $this.val(),
				length = str.length,
				remaining = maxlength - length,
				errorMessage = "",
				$label = $('label[for="' + id + '"]').eq(0),
				$confirm,
				confirmLength,
				confirmRemaining,
				confirmMessage,
				$confirmLabel,
				confirmStr;

		$this.removeClass('error-highlight');
		
		if (id === 'passwordConfirm') {
			if (length && $('#password').val() !== str) {
				errorMessage = " <span class='error'>Password confirmation error</span>";
			}
		}
		else if (id === 'password') {
			$confirm = $('#passwordConfirm').eq(0);
			confirmStr = $confirm.val();
			confirmLength = confirmStr.length;
			confirmRemaining = $confirm.attr('maxlength') - confirmLength;
			if (confirmLength) {
				if (confirmStr === str) {
					confirmMessage = "";
				}
				else
				{
					confirmMessage = " <span class='error'>Password confirmation error</span>";
				}
				$confirmLabel = $('label[for="passwordConfirm"]').eq(0);
				$confirmLabel.removeClass('hidden').html(confirmRemaining + " characters remaining" + confirmMessage);
			}
		}
		
		if (length) {
			$label.removeClass('hidden').html(remaining + " characters remaining" + errorMessage);
		} else {
			$label.addClass('hidden');
		}
	});
	
	function validateFormElement(id) {
		
		var $elem = $('#' + id).eq(0),
				$label = $('label[for="' + id+ '"]').eq(0),
				str = $elem.val(),
				length = str.length,
				minimum = $elem.data('minlength'),
				maximum = $elem.attr('maxlength'),
				errorFlag = false;
		
		if (length < minimum || length > maximum) {
			$label
				.removeClass('hidden')
				.html("<span class='error'>Error - must be " + minimum + " to " + maximum + " characters</span>");
			$elem.addClass('error-highlight');
			errorFlag = true;
		}
		else {
			$label.addClass('hidden');
		}
				
		return errorFlag;
	}
	
	$('input[type="submit"]').on('click', function(event) {
		
		var $confirm = $('#passwordConfirm').eq(0),
				$confirmLabel = $('label[for="passwordConfirm"]').eq(0),
				errorFlag;
			
		errorFlag = validateFormElement("text");
		errorFlag = validateFormElement("textarea") || errorFlag;
		errorFlag = validateFormElement("password") || errorFlag;
		
		if ($('#password').eq(0).val() !== $confirm.val()) {
			$confirmLabel.removeClass('hidden').html("<span class='error'>Error - must match password</span>");
			$confirm.addClass('error-highlight');
			errorFlag = true;
		}
		else {
			$confirmLabel.addClass('hidden');
		}
		
		if (errorFlag) {
			event.preventDefault();
		}
	});

/*********************************************************/	
/*                     Dropdown menu                     */
/*********************************************************/	
	
	$('#options').hide();
	
	function toggleDropdown() {
		
		$('#options').slideToggle('fast', function() {
			$arrow = $('#arrow').eq(0);
			if ($arrow.html().charCodeAt(0) == 0x25bc) {
				$arrow.html(String.fromCodePoint(0x25b2));
			}
			else
			{
				$arrow.html(String.fromCodePoint(0x25bc));
			}
		});
	}
	
	$('#dropdown > li:first-child').on('click', function() {		
		toggleDropdown();
	});
	
	$('#options li').on('click', function() {
		var selectedText = this.innerHTML;
		$('#selection').html(selectedText);
		$('#choice').val(selectedText);
		toggleDropdown();
	});

/*********************************************************/	
/*                     Photo Tagging                     */
/*********************************************************/	

	var tracking = true,
			zindex = 1;
	
	function repositionCaptureBox(event) {
		
		var side = Math.round($('#zone').outerWidth() * 0.15),
				thickness = Math.max(Math.round(side * 0.075, 2)),
				$box = $('#capture div').eq(0),
				offset = $('#zone img').offset(),
				xcoord,
				ycoord;
				
		xcoord = Math.round(event.pageX - (offset.left + side / 2 + thickness));
		ycoord = Math.round(event.pageY - (offset.top + side / 2 + thickness));
		
		$('#capture').css({top: ycoord + 'px', left: xcoord + 'px', borderWidth: thickness + 'px'});
		$box.css({width: side + 'px', height: side + 'px'});
		$('#capture ul').css({borderTopWidth: thickness + 'px'});
		$('#capture li').css('font-size', Math.round(side * 0.12) + 'px');
	}
	
	$('#zone').hover(
		function() {
			var $this = $(this);			
			$this.addClass('hover');
			$('#capture').show();
			$this.mousemove(function(event) {
				if (tracking) {
					repositionCaptureBox(event);
				}
			});
		}, function() {
			var $this = $(this);			
			$this.removeClass('hover');
			if (tracking) {
				$('#capture').hide();
			}
			$this.off('mousemove');
		}
	);
	
	$('#zone').on('click', function(event) {
		tracking = !tracking;
		if (tracking) {
			repositionCaptureBox(event);
			$('#capture ul').hide();
		}
		else {
			$('#capture ul').slideDown('fast');
		}
	});
	
	function createNameBox(name) {
		
		var $nameBox = $('<div class="name-box"><div></div><p>' + name + '</p></div>'),
				$nameBoxDiv = $nameBox.find('div').eq(0),
				$nameBoxPara = $nameBox.find('p').eq(0),
				$captureBox = $('#capture').eq(0),			
				$captureBoxDiv = $('#capture div').eq(0),
				borderWidth = $captureBox.css('border-width'),
				fontSize = $('#capture li').css('font-size'),
				nFontSize = parseFloat(fontSize),
				borderBottomWidth = Math.round(parseFloat(borderWidth) + nFontSize * 1.5),
				bottom;
		
		$('#capture').after($nameBox);
		
		$nameBox.css({top: $captureBox.css('top'), left: $captureBox.css('left'), borderWidth: borderWidth, 'z-index': zindex++});
		$nameBox.css('border-bottom-width', borderBottomWidth + 'px');
		$nameBoxDiv.css({width: $captureBoxDiv.css('width'), height: $captureBoxDiv.css('height')});
		bottom = Math.round((borderBottomWidth + nFontSize) / 2);
		$nameBoxPara.css({fontSize: fontSize, bottom: -bottom + 'px'});
	}
	
	$('#capture ul').on('click', function(event) {
		createNameBox(event.target.innerHTML);
	});

});

$('td').on('focus keypress', '.sam_notes', function(e) {

  var $this = $(this);
  var msgSpan = $this.parents('td').find('.counter_msg');
  var ml = parseInt($this.attr('maxlength'), 10);
  var length = this.value.length;
  var msg = ml - length + ' characters of ' + ml + ' characters left';

  msgSpan.html(msg);
});

$(document).ready(function() {
  var counter = 0;
  var mouseX = 0;
  var mouseY = 0;

  $("#imgtag img").click(function(e) { // make sure the image is click
    var imgtag = $(this).parent(); // get the div to append the tagging entry
    mouseX = e.pageX - $(imgtag).offset().left; // x and y axis
    mouseY = e.pageY - $(imgtag).offset().top;
    $('#tagit').remove(); // remove any tagit div first
    $(imgtag).append('<div id="tagit"><div class="box"></div><div class="name"><div class="text">Type any name or tag</div><input type="text" name="txtname" id="tagname" /><input type="button" name="btnsave" value="Save" id="btnsave" /><input type="button" name="btncancel" value="Cancel" id="btncancel" /></div></div>');
    $('#tagit').css({
      top: mouseY,
      left: mouseX
    });

    $('#tagname').focus();
  });

  $('#tagit #btnsave').live('click', function() {
    name = $('#tagname').val();
    counter++;
    $('#taglist ol').append('<li rel="' + counter + '"><a>' + name + '</a> (<a class="remove">Remove</a>)</li>');
    $('#imgtag').append('<div class="tagview" id="view_' + counter + '"></div>');
    $('#view_' + counter).css({
      top: mouseY,
      left: mouseX
    });
    $('#tagit').fadeOut();
    // add backend code here, use mouseX and mouseY for the axis and counter.
    // ............
  });

  $('#tagit #btncancel').live('click', function() {
    $('#tagit').fadeOut();

  });

  $('#taglist li').live('mouseover mouseout', function(event) {
    id = $(this).attr("rel");
    if (event.type == "mouseover") {
      $('#view_' + id).show();
    } else {
      $('#view_' + id).hide();
    }
  });

  $('#taglist li a.remove').live('click', function() {
    id = $(this).parent().attr("rel");
    $(this).parent().fadeOut('slow');
    $('#view_' + id).remove();
  });
});
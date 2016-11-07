var validation = {
  displayRemainingChar: function(inputObject){
    var max = parseInt($(inputObject.target).attr("maxlength"))
    var count = (max - $(inputObject.target).val().length).toString();
    var span = $(inputObject.target).next('span');
    if (count == max) {
      span.text('');
    } else if (count > 0) {
      span.text(' (Remaining Chars: ' + count + ' )');
    }
  }
}

$(document).ready( function() {
  $('input#username').on('input',function(e){
    validation.displayRemainingChar(e)
  });
  $('#info').on('input', function(e){
    validation.displayRemainingChar(e)
  });
});
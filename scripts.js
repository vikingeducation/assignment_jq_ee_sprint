$( document ).ready( function() {

  $("#name-form").keyup(function() {

  var max = 32;
  var currentLength = $(this).val().length;

  if (currentLength == 0) {
     $("#char-count").text('');
  } else if (currentLength > max) {
    $("#char-count").text('too many characters!');
  } else {
    var charsLeft = max - currentLength;
    $("#char-count").text( charsLeft + ' characters left');
  }

  })

});

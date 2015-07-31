$( document ).ready( function() {

  $("#name-form").keyup(function() {

    var max = 32;
    var currentLength = $(this).val().length;

    if (currentLength == 0) {
       $("#char-count-name").text('');
    } else if (currentLength > max) {
      $("#char-count-name").text('too many characters!');
    } else {
      var charsLeft = max - currentLength;
      $("#char-count-name").text( charsLeft + ' characters left');
    }

  });

  $("#comment-form").keyup(function() {

    var max = 140;
    var currentLength = $(this).val().length;

    if (currentLength == 0) {
       $("#char-count-comment").text('');
    } else if (currentLength > max) {
      $("#char-count-comment").text('too many characters!');
    } else {
      var charsLeft = max - currentLength;
      $("#char-count-comment").text( charsLeft + ' characters left');
    }

  });
});

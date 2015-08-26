$(document.ready(function(){
  function charCount(identifier, maximum) {
    var count = $(identifier).val().length;
    if (count < maximum) {
      $("<p>test</p>").appendTo($(identifier)[0]);
    }
  }

  $('.text-1').keyup(charCount('.text-1', 32));


}))
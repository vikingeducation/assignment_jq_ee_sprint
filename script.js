
$(document).ready(function(){
  
  $('input[type="text"]').on('keyup', function(e){
    var $target = $(e.target);
    var maxLength = 32;
    var textLength = ($target.val()).length;
    var remainingChars = maxLength - textLength

    $validationDiv = $('<span class = "validation">' + remainingChars +' characters remaining(out of ' + maxLength + ')</span>');


    
    if ($target.next().filter('.validation').length && textLength) {
      $target.next().replaceWith($validationDiv);
    } else if (textLength) {
      $target.after($validationDiv);
    } else if ($target.next().filter('.validation').length) {
      $target.next().remove();
    };
    
  
    
    
  });
  
  var charRemainingSpan = function(length, max){
    
    
  };
  
});
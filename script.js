
$(document).ready(function(){
  
  $('input[type="text"]').on('keypress', function(e){
    var $target = $(e.target);
    var textLength = ($target.value).length;
    var max = 32
    $validationDiv = $('<span class = "validation">' + textLength +' characters remaining(out of ' + max + ')</span>');
    
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
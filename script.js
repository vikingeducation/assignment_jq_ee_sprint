$(document).ready(function(){
  // :text selects all input type='text' elements
  // Is a psuedoclass selector
  $('input:text').on('keyup', function(eventObj){
    var $target = $(eventObj.target);
    var maxLength = 32;

    validateLength(maxLength, $target);

    // Used for debugging purposes
    console.log(eventObj.target);
    console.log($target.val().length);
  });

  var validateLength = function(maxLength, target){

    var inputTextLength = target.val().length;
    var remainingChars = maxLength - inputTextLength;

    var message = $('<span class="message"> ' + remainingChars + ' characters remaining out of ' + maxLength + '</span>');
    var errorMessage = $('<span class="message"> Error, too many characters</span>');

    if(inputTextLength == 0){
      target.siblings().filter('.message').remove();
    } else if (inputTextLength <= 32){
      target.siblings().filter('.message').remove();
      target.after(message);
    } else if (inputTextLength > 32){
      target.siblings().filter('.message').remove();
      target.after(errorMessage);
    }
  };

});
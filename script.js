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

  $('textarea').on('keyup', function(eventObj){
    var $target = $(eventObj.target);
    var maxLength = 140;

    validateLength(maxLength, $target);
  });

  // Passwords

  $('#password').on('keyup', function(eventObj){
    var $target = $(eventObj.target);
    var maxLength = 16;

    validateLength(maxLength, $target);
  });

  $('#password-confirmation').on('keyup', function(eventObj){
    var $target = $(eventObj.target);
    var password = $('#password').val();

    $passwordError = $('<span class="password-message"> Passwords   don&apos;t match!</span>');

    if ($target.val() !== password && !$target.siblings().filter('.password-message').length){
      $target.after($passwordError);
    } else if($target.siblings().filter('.password-message').length && $target.val() === password){
      $target.siblings().filter('.password-message').remove();
    }
  });



  $('input:submit').on('click', function(eventObj){
    eventObj.preventDefault();
    $form = $(eventObj.target).parent();

    //clear validation messages
    $('.message').remove();
    $('.password-message').remove();


    var highlightField = function(field){
      field.addClass("errors");
    };

    var lengthErrors = function(element, min, max){
      if (element.val().length > max || element.val().length < min) {
        element.after($('<span class = "message">Length not between '+ min+' and ' + max + '!</span>'));
        highlightField(element);
      }
    } ;

    lengthErrors($('input:text'), 4, 32);
    lengthErrors($('textarea'), 4, 140);
    lengthErrors($('#password'), 6, 16);


    if ( $('#password').val() !== $('#password-confirmation').val() ) {
      $('#password-confirmation').after($('<span class = "message">Password and confirmation don\'t match!</span>'));
      highlightField($('#password-confirmation'));
    }


  });


  // Functions

  var validateLength = function(maxLength, target){

    var inputTextLength = target.val().length;
    var remainingChars = maxLength - inputTextLength;

    var message = $('<span class="message"> ' + remainingChars + ' characters remaining out of ' + maxLength + '</span>');
    var errorMessage = $('<span class="message"> Error, too many characters</span>');

    if(inputTextLength == 0){
      target.siblings().filter('.message').remove();
    } else if (inputTextLength <= maxLength){
      target.siblings().filter('.message').remove();
      target.after(message);
    } else if (inputTextLength > maxLength){
      target.siblings().filter('.message').remove();
      target.after(errorMessage);
    }
  };

});
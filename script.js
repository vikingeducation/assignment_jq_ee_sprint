
$(document).ready(function(){
  




  $('input[type="text"]').on('keyup', function(e){
    var $target = $(e.target);
    var maxLength = 32;

    lengthValidation(maxLength, $target);
  });


  $('textarea').on('keyup', function(e){
    var $target = $(e.target);
    var maxLength = 140;

    lengthValidation(maxLength, $target);
  });


  $('#pass').on('keyup', function(e){
    var $target = $(e.target);
    var maxLength = 16;

    lengthValidation(maxLength, $target);
  });


  $('#pass-confirm').on('keyup', function (e){
    $target = $(e.target);
    passwordInput = $('#pass').val();

    $validationDiv = $('<span class = "validation validation-match">Password and confirmation do not match!</span>')

    //add validation if passwords don't match and it's not there
    if ($target.val() !== passwordInput && !$target.siblings().filter('.validation-match').length) {
      $target.after($validationDiv);
    //remove the validation if it exists and passwords now match
    } else if ($target.siblings().filter('.validation-match').length && $target.val() === passwordInput) {
      $target.siblings().filter('.validation-match').remove();
    };

  });


  $('input[type="submit"]').click(function(e){
    e.preventDefault();
    $form = $(e.target).parent();

    //clear validation messages
    $('.validation').remove();


    var highlightField = function(field){
      field.addClass("field_with_errors");
    };

    var lengthErrors = function(element, min, max){
      if (element.val().length > max || element.val().length < min) {
        element.after($('<span class = "validation">Length not between '+ min+' and ' + max + '!</span>'));
        highlightField(element);
      }
    } ;

    lengthErrors($('input[type="text"]'), 4, 32);
    lengthErrors($('textarea'), 4, 140);
    lengthErrors($('input[type="password"]'), 6, 16);


    if ( $('#pass').val() !== $('#pass-confirm').val() ) {
      $('#pass-confirm').after($('<span class = "validation">Password and confirmation don\'t match!</span>'));
      highlightField($('#pass-confirm'));
    }



  });




  //creates validation text following the target jquery object
  var lengthValidation = function(maxLength, target){

    var textLength = (target.val()).length;
    var remainingChars = maxLength - textLength;

    $validationDiv = $('<span class = "validation">' + remainingChars +' characters remaining (out of ' + maxLength + ')</span>');

    if (target.siblings().filter('.validation').length && textLength) {
      target.siblings().filter('.validation').replaceWith($validationDiv);
    } else if (textLength) {
      target.after($validationDiv);
    } else if (target.siblings().filter('.validation').length) {
      target.siblings().filter('validation').remove();
    };

  };



});
// "use strict";
$( document ).ready(function() {

  var charLimits = {
    text: 32,
    textarea: 140,
    password: 16
  };

  var textCounterDowner = function(inputField, fieldLimit, outputField){
    $('fieldset').on('keyup', inputField, function(){
      var $inputCharCount = $(this).val().length;
      var $remainingChars = fieldLimit - $inputCharCount;

      if($inputCharCount <= fieldLimit ){
        $( outputField ).text($remainingChars + ' remaining');
      } else {
        $( outputField ).text("exceeded");
      };
    });
  };

  textCounterDowner('input:text', charLimits.text, '#text-counter');
  textCounterDowner('textarea', charLimits.textarea, '#textarea-counter');
  textCounterDowner('input[name=passwordy]', charLimits.password, '#password-counter');
  textCounterDowner('input[name=passwordy-again]', charLimits.password, '#pw-confirm-counter');


  // $.each($textFieldInput, function(index, element) {
  //   console.log(element);
  // });

  // When the user begins typing in the password confirmation field, provide feedback indicating the confirmation doesn't match the password (until it does). If the user deletes all text from the confirmation field, this message should disappear as well.

  $('fieldset').on('keyup', 'input[name=passwordy-again]', function(){

    if( $('input[name=passwordy-again]').val() !== $( 'input[name=passwordy]' ).val() ){
      $( '#pw-validator' ).text('passwords do not match').fadeOut(1000);
    };
  });





});
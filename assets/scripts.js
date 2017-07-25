// "use strict";
$( document ).ready(function() {

  var name = {
    field: 'input[name="Name"]',
    output: '#name-counter',
    charMin: 4,
    charMax: 5
  }

  var description = {
    field: 'textarea[name="Description"]',
    output: '#description-counter',
    charMin: 4,
    charMax: 5
  }

  var password = {
    field: 'input[name="Password"]',
    output: '#password-counter',
    charMin: 6,
    charMax: 16
  }

  var passwordConfirmation = {
    field: 'input[name="Password Confirmation"]',
    output: '#pw-confirm-counter',
    validator: '#pw-validator',
    charMin: 6,
    charMax: 16
  }

  var textCounterDowner = function(input){
    $('fieldset').on('keyup', input.field, function(){
      var $inputCharCount = $(this).val().length;
      var $remainingChars = input.charMax - $inputCharCount;

      if($inputCharCount <= input.charMax ){
        $( input.output ).text($remainingChars + ' remaining');
      } else {
        $( input.output ).text("exceeded");
      };
    });
  };

  textCounterDowner(name);
  textCounterDowner(description);
  textCounterDowner(password);
  textCounterDowner(passwordConfirmation);


  // $.each($textFieldInput, function(index, element) {
  //   console.log(element);
  // });

  // When the user begins typing in the password confirmation field, provide feedback indicating the confirmation doesn't match the password (until it does). If the user deletes all text from the confirmation field, this message should disappear as well.

  $('fieldset').on('keydown', 'input[name="Password Confirmation"]', function(){

    if( $('input[name="Password Confirmation"]').val() !== $( 'input[name=Password]' ).val() ){
      $( '#pw-validator' ).text('passwords do not match').fadeOut(1000);
    };
  });





});
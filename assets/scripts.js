"use strict";
$( document ).ready(function() {

  var allFields = {
    name: {
      field: 'input[name="Name"]',
      output: '#name-counter',
      charMin: 4,
      charMax: 32
    },
    description: {
      field: 'textarea[name="Description"]',
      output: '#description-counter',
      charMin: 4,
      charMax: 140
    },
    password: {
      field: 'input[name="Password"]',
      output: '#password-counter',
      charMin: 6,
      charMax: 16
    },
    passwordConfirmation: {
      field: 'input[name="Password Confirmation"]',
      output: '#pw-confirm-counter',
      validator: '#pw-validator',
      charMin: 6,
      charMax: 16
    }
  };

  var textCounterDowner = function(input){
    $('fieldset').on('keyup', input.field, function(){
      var $inputCharCount = $(this).val().length;
      var $remainingChars = input.charMax - $inputCharCount;

      if($inputCharCount === input.charMax ) {
        $( input.output ).text('');
      } else {
        $( input.output ).text($remainingChars + ' remaining');
      };
    });
  };

  $.each(allFields, function(index, element) {
    textCounterDowner(element);
  });


  // When the user begins typing in the password confirmation field, provide feedback indicating the confirmation doesn't match the password (until it does). If the user deletes all text from the confirmation field, this message should disappear as well.

  $('fieldset').on('keydown', 'input[name="Password Confirmation"]', function(){

    if( $('input[name="Password Confirmation"]').val() !== $( 'input[name=Password]' ).val() ){
      $( '#pw-validator' ).text('passwords do not match').fadeOut(1000);
    };
  });

  var validations = {

    charCount: function(input){
      var actualCount = $( input.field ).val().length;

      if((actualCount < input.charMin )||(actualCount > input.charMax)){
        $( input.field ).addClass('active-error');
        $( 'section#errors' )
            .show()
            .append('<li>'+ $(input.field).attr('name')+ ' only allows ' + input.charMin + ' to ' + input.charMax + " characters. You've entered " + actualCount + ".</li>");
      }
    },

    passwordMatch: function(input){
      console.log("TBD");
    }
  };//validations


  $( 'input:submit' ).on('click', function(){
    $.each(allFields, function(index, element) {
      validations.charCount(element);
      validations.passwordMatch(element);
    });
  });



});
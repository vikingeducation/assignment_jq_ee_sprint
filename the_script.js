

$(document).ready(function() {

  $('.valid-text').on('change keyup paste keypress',  function() {
    var currentText =  $('.valid-text').val( );
    var maxTextBoxChars = 32;
    if( currentText ){
      $('.remaining-characters').html( (maxTextBoxChars - currentText.length).toString() );
    } else {
      $('.remaining-characters').html( 'some text here' );
    }
  });


  $('.valid-textarea').on('change keyup paste keypress', function() {
    var currentText =  $('.valid-textarea').val( );
    var maxTextAreaChars = 140;
    if( currentText ){
      $('.remaining-characters-textarea').html( (maxTextAreaChars - currentText.length).toString() );
    } else {
      $('.remaining-characters-textarea').html( 'some text here' );
    }
  });

  $('.valid-password').on('change keyup paste keypress', function() {
    var currentText =  $('.valid-password').val( );
    var maxPasswordChars = 16;
    if( currentText ){
      $('.remaining-characters-password').html( (maxPasswordChars - currentText.length).toString() );
    } else {
      $('.remaining-characters-password').html( 'some text here' );
    }
  });

  $('.valid-confirmation').on('change keyup paste keypress', function() {
    var currentText =  $('.valid-confirmation').val( );
    var maxConfirmationChars = 16;
    if( currentText ){
      $('.remaining-characters-confirmation').html( (maxConfirmationChars - currentText.length).toString() );
    } else {
      $('.remaining-characters-confirmation').html( 'some text here' );
    }
  });

  $('.valid-confirmation').on('change keyup paste keypress', function() {
    var passwordText = $('.valid-password').val();
    var confirmationText = $('.valid-confirmation').val();
    if (confirmationText !== passwordText) {
      $('.password-match').html('Passwords do not match');
    } else {
      $('.password-match').html('Passwords match');
    }
  });

  $('submit-button').on('click', function(event) {
    var inputText = $('.valid-text').val();
    var inputTextArea = $('.valid-textarea').val();
    var passwordText = $('.valid-password').val();
    var confirmationText = $('.valid-confirmation').val();
    event.preventDefault();

    if (inputText.length < 4 || inputText.length > 32) {
      $('.remaining-characters').html('Invalid length');
      $('.valid-text').addClass('.highlight')
    }
  });

});




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


  $('textarea').keypress( function() {

  });

});


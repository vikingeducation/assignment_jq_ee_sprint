$( document ).ready( function(){

var validation = {
  displayCharsLeft: function(element, maxText, counter) {
    $( element ).keyup(function() {
      var inputLength = $( element ).val().length;
      var charsLeft = maxText - inputLength;

      $( counter ).html( charsLeft );

      if (inputLength === 0) {
        $( counter ).hide();
      } else {
        $( counter ).show();
      }
    });
  }
};

validation.displayCharsLeft('input[id="text-one"]', 32, '.counter-one');
validation.displayCharsLeft('textarea[id="text-two"]', 140, '.counter-two');
validation.displayCharsLeft('input[id="pass-one"]', 16, '.counter-three');
validation.displayCharsLeft('input[id="pass-two"]', 16, '.counter-four');


var tests = {
  testLength: function( element, maxText, counter ) {
    var inputLength = $( element ).val().length;
    if (inputLength > maxText) {
      $( element ).addClass( 'warn-shadow' );
      $( counter ).append( '</n>Your text is too long. Please shorten your text and try again.');
    } else {
      $( element ).addClass( 'success-shadow' );
    }
  },

  passwordMatch: function() {
    var passwordOne = $( 'input[id="pass-one"]' ).val();
    var passwordTwo = $( 'input[id="pass-two"]' ).val();
    var match;

    for(var i = 0; i <= passwordOne.length; i++) {
      if (passwordOne[i] !== passwordTwo[i]) {
        match++;
      }
    }

    if (match > 0 ) {
      $( 'input[id="pass-one"]' ).addClass( 'warn-shadow' );
      $( 'input[id="pass-two"]' ).addClass( 'warn-shadow' );
      $( '.counter-four').append( '<p>Your passwords do not match. Please recheck your passwords and try again.<p>');
    } else {
      $( 'input[id="pass-one"]' ).addClass( 'success-shadow' );
      $( 'input[id="pass-two"]' ).addClass( 'success-shadow' );
      $( '.counter-four').append( '<p>Your passwords match.</p>' );
    }

  },

};



var button = {
  click: $( 'button' ).click(function( event ) {
    event.preventDefault();
    tests.testLength('input[id="text-one"]', 32, '.counter-one');
    tests.testLength('textarea[id="text-two"]', `140`, '.counter-two');
    tests.passwordMatch();
  })
};











});

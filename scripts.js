$( document ).ready( function(){


var validation = {
  // Display character count
  displayCharsLeft: function(element, maxText, counter) {
    // Calculate characters left and insert into counter div
    $( element ).keyup(function() {
      var inputLength = $( element ).val().length;
      var charsLeft = maxText - inputLength;

      $( counter ).html( charsLeft );

      // If the input is erased, hide the counter div
      if (inputLength === 0) {
        $( counter ).hide();
      } else {
        $( counter ).show();
      }
    });
    }
  };

// Display how many characters are left for each input box, passing in the element, max characters, and counter div
validation.displayCharsLeft('input[id="text-one"]', 32, '.counter-one');
validation.displayCharsLeft('textarea[id="text-two"]', 140, '.counter-two');
validation.displayCharsLeft('input[id="pass-one"]', 16, '.counter-three');
validation.displayCharsLeft('input[id="pass-two"]', 16, '.counter-four');

// Tests for length and password matching
var tests = {
  testLength: function( element, maxText, counter ) {
    var inputLength = $( element ).val().length;
    var $warnText = $('<p>Your text is too long. Please shorten your text and try again.</p>')

    // If the input length is too long
    if (inputLength > maxText) {
      // And it already has the success shadow
      if ($( element ).hasClass( 'success-shadow ')) {
        // Remove the success shadow
        $( element ).removeClass( 'success-shadow' );
      }
      // Add the warning shadow and warning text
      $( element ).addClass( 'warn-shadow' );
      $( counter ).append( $warnText );

    // If the input text is not too long
    } else {
      // And the element has a warning shadow
      if($( element ).hasClass( 'warn-shadow' )) {
        // Remove the warning shadow
        $( element ).removeClass( 'warn-shadow' );
      }
      // Add the success shadow and remove the warning text
      $( element ).addClass( 'success-shadow' );
      $( counter )
    }
  },

  // Call to function is commented out because it also wasn't working
  passwordMatch: function() {
    var passwordOne = $( 'input[id="pass-one"]' ).val();
    var passwordTwo = $( 'input[id="pass-two"]' ).val();
    var match = 0;

    for(var i = 0; i <= passwordOne.length; i++) {
      if (passwordOne[i] !== passwordTwo[i]) {
        match++;
      }
    }

    if (match > 0 ) {
      $( 'input[id="pass-one"]' ).addClass( 'warn-shadow' );
      $( 'input[id="pass-two"]' ).addClass( 'warn-shadow' );
      $( '.counter-four').after( '<p>Your passwords do not match. Please recheck your passwords and try again.<p>');
    } else {
      $( 'input[id="pass-one"]' ).addClass( 'success-shadow' );
      $( 'input[id="pass-two"]' ).addClass( 'success-shadow' );
      $( '.counter-four').append( '<p>Your passwords match.</p>' );
    }

  },

};

// When you click on the button, the following tests should run

  $( 'button' ).on('click', function( ) {
    event.preventDefault();
    tests.testLength('input[id="text-one"]', 32, '.counter-one');
    tests.testLength('textarea[id="text-two"]', 140, '.counter-two');
    tests.testLength('input[id="pass-one"]', 16, '.counter-three');
    tests.testLength('input[id="pass-two"]', 16, '.counter-four');
    //tests.passwordMatch();
  });




// Dropdown Menu
$( 'ul' ).click(function() {
  $( 'li' ).slideToggle(1000);
});













});

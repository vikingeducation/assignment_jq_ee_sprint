  $(document).ready(function(){
 

    // build a constructor for the field object
    function InputCounterObj(inputName, maxChars){
      var $inputField = $( 'form [name="'+inputName+'"]' );
      $inputField.append( '<div><p class="'+inputName+'-counter"></p></div>' );
      var $counterEl = $( '.'+inputName+'-counter');
      this.inputField = $inputField;
      this.maximum = maxChars;
      this.counter = $counterEl;
    };
    
    var charsCounterHandler = function(field, maximum, counter) {
      var $charsLength = $( field ).val().length;
      var remainingChars = parseInt(maximum) - parseInt($charsLength);
      if ($charsLength < 1) {
        counter.text(" ");
      } else {
        counter.text(remainingChars);
      };
    };

    var usernameHandlerArgs = new InputCounterObj("username", 32);
    usernameHandlerArgs.inputField.keyup(function() {
      charsCounterHandler(
        usernameHandlerArgs.inputField, 
        usernameHandlerArgs.maximum,
        usernameHandlerArgs.counter
      );
    });

  });
 
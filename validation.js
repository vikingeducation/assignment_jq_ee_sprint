var validator = {

  init: function() {
    $("[type='text']").keyup( function(event) { validator.charCounter(event, 32) } );
    $("textarea").keyup( function(event) { validator.charCounter(event, 140) } );
    $("[type='password']").keyup( function(event) { validator.charCounter(event, 16 ) } );
    $("[name='confirmation']").keyup( function(event) { validator.checkPasswordMatch(event) } );
    $('button').click( function(event) { 
      if ( !validator.applyClickValidations(event) )  {
        event.preventDefault();
      }
    } );
  },

  charCounter: function(element, max) {
    var $target = $(event.target);
    var count = max - $target.val().length;
    var $inserted = $("<li class='valid-count'>");
    validator.clearRedundantValidator($target, 'valid-count');
    $inserted.insertAfter($target);   
    if (count !== max) {
      $inserted.text(count +' characters remaining');    
    } else {
      $inserted.remove();
    };
  },

  clearRedundantValidator: function(target, validatorClass) {
    errors = target.nextUntil('input');
    if ( errors.hasClass(validatorClass) ) {
      errors.filter('.' + validatorClass).remove();
    }
  },

  checkPasswordMatch: function(event) {
    var $target = $(event.target);
    var $password = $("[name='password']");
    var $inserted = $("<li class='valid-confirm'>");
    validator.clearRedundantValidator($target, 'valid-confirm');
    if ($target.val() !== $password.val()) {
      $inserted.text('Passwords do not match!'); 
      $inserted.insertAfter($target);
    }
  },

  applyClickValidations: function(event) {
    validator.validateLength( $("[type='text']"), 4, 32 );
    validator.validateLength( $("textarea"), 4, 140 );
    validator.validateLength( $("[type='password']"), 6, 16 );
    validator.validatePassword();
  },

  validateLength: function(object, min, max) {
    $error = $("<li class='error'>").text('Must be between ' + min + ' and ' + max + ' characters');
    if (object.val().length < min || object.val().length > max) {
      validator.highlightField(object);
      $error.insertAfter(object);
    }
  },

  highlightField: function(object) {
    object.css( 'background-color', 'red' );
  },

  validatePassword: function() {
    $error = $("<li class='error'>").text('Passwords must match');
    $password = $("[name='password']")
    $confirmation = $("[name='confirmation']")
    if ( $password !== $confirmation ) {
      $error.insertAfter( $confirmation );
    }
  }


};

$(document).ready( function(){ 

  // $("[type='text']").keyup( function(event) { validator.charCounter(event, 32)} );

  // $("textarea").keyup( function(event) { validator.charCounter(event, 140) } );

  validator.init(); 
} );
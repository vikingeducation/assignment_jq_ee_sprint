
$(document).ready(function() {

// ======================= Helper methods =================================

  function getMax($object){
    return $object.attr("maxlength");
  };

  function getLen($object){
    return $object.val().length;
  };

  function validateLength($object, $displayObj, $passwordObj){
    var max = getMax($object);
    var len = getLen($object);
    var diff = Number(max) - Number(len);
    displayValidation($displayObj, len, diff)
    if ( $passwordObj ) { 
      passwordValidation($passwordObj, len, diff)
    }
  };

  function displayValidation($displayObj, len, diff) {
    if ( Number(len) === 0 ) {
      $displayObj.text("");
    } else {
      $displayObj.text("Length " + diff );
    }
  };

  function passwordValidation($passwordObj, len, diff) {

    var pwconfValue = $( ".sample-password-conf" ).val();
    var pwValue = $(".sample-password" ).val();

    if ( Number(len) === 0 ) {
      $passwordObj.text("");
    } else if ( pwconfValue !== pwValue ) {
      $passwordObj.text("Password does not match");
    } else {
      $passwordObj.text("");
    }
  };

// ======================== validations =================================

  $( ".sample-text" ).keyup(function(eventObj) {
    var $displayObj = $(".text .count");
    validateLength($(eventObj.target), $displayObj);

  } );

  $( ".sample-textarea" ).keyup(function(eventObj) {
    var $displayObj = $(".textarea .count");
    validateLength($(eventObj.target), $displayObj);

  }); 

  $( ".sample-password" ).keyup(function(eventObj) {
    var $displayObj = $(".password .count");
    validateLength($(eventObj.target), $displayObj);

  }); 

  $( ".sample-password-conf" ).keyup(function(eventObj) {
    var $displayObj = $(".password-conf .count");
    var $passwordObj = $(".feedback");
    validateLength($(eventObj.target), $displayObj, $passwordObj);

  } );

// ========================== submit validations =============================

  $( ".submit-button" ).click(function(eventObj) {
    eventObj.preventDefault();

    var max = $( ".sample-text" ).attr("maxlength");
    var len = $( ".sample-text" ).val().length;

    if ( Number(len) < 4 || Number(len) > Number(max) ) {
    
        $(".text .count").text("Text should be between 4 and " + max + " characters").css({'color':'red'});
        $(".sample-text").css({
           'border': '1px solid red'
        } );
    }

    var max = $( ".sample-textarea" ).attr("maxlength");
    var len = $( ".sample-textarea" ).val().length;

    if ( Number(len) < 4 || Number(len) > Number(max) ) {
        $(".textarea .count").text("Textarea should be between 4 and " + max + " characters").css({'color':'red'});
        $(".sample-textarea").css({
           'border': '1px solid red'
        } );
    }

    var max = $( ".sample-password" ).attr("maxlength");
    var len = $( ".sample-password" ).val().length;

    if ( Number(len) < 4 || Number(len) > Number(max) ) {
        $(".password .count").text("Password should be between 4 and " + max + " characters").css({'color':'red'});
        $(".sample-password").css({
           'border': '1px solid red'
        } );
    } else if ($( ".sample-password-conf" ).val() !=  $(".sample-password" ).val()) {
       $(".password .count").text("Passwords don't match!").css({'color':'red'});
        $(".sample-textarea").css({
           'border': '1px solid red'
        } );     
    }

  } );

})



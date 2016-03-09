
$(document).ready(function() {

  $( ".sample-text" ).keyup(function() {
    var max = $( ".sample-text" ).attr("maxlength");
    var len = $( ".sample-text" ).val().length;

    if ( Number(len) === 0 ) {
      $( ".text .count" ).text("");
    } else {
      var diff = Number(max) - Number(len);
      $(".text .count").text("Length " + diff );
    }
  } ); 

  $( ".sample-textarea" ).keyup(function() {
    var max = $( ".sample-textarea" ).attr("maxlength");
    var len = $( ".sample-textarea" ).val().length;
    var diff = Number(max) - Number(len);

    if ( Number(len) === 0 ) {
      $( ".textarea .count" ).text("");
    } else {
      $(".textarea .count").text("Length " + diff );
    }
  }); 

  $( ".sample-password" ).keyup(function() {
    var max = $( ".sample-password" ).attr("maxlength");
    var len = $( ".sample-password" ).val().length;
    var diff = Number(max) - Number(len);

    if ( Number(len) === 0 ) {
      $(".password .count").text("");
    } else {
      $(".password .count").text("Length " + diff );
    }

  }); 

  $( ".sample-password-conf" ).keyup(function() {
    var max = $( ".sample-password-conf" ).attr("maxlength");
    var len = $( ".sample-password-conf" ).val().length;

    var pwconfValue = $( ".sample-password-conf" ).val();
    var pwValue = $(".sample-password" ).val();

    var diff = Number(max) - Number(len);

    if ( Number(len) === 0 ) {
      $(".password-conf .feedback").text("");
    } else if ( pwconfValue !== pwValue ) {
      $(".password-conf .feedback").text("Password does not match");
    } else {
      $(".password-conf .feedback").text("");
    }

    if ( Number(len) === 0 ) {
      $(".password-conf .count").text("");
    } else {
      $(".password-conf .count").text("Length " + diff );
    }

  } );


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



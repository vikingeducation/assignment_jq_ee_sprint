
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


  $( ".button" ).click(function() {
    console.log("is it here");
    var textMax = $( ".sample-text" ).attr("maxlength");
    var texLen = $( ".sample-text" ).val().length;

    if ( Number(textLen) < 4 || Number(textLen) > Number(textMax) ) {
      
    }

  } );

})



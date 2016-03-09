$( document ).ready( function(){

  $("form").on("keyup", function(e) {
    if (e.target.id === "pass-confirm") {
      checkPassword( $('#password').val() );
    } else {
      var maxTestLength = validations[e.target.id].max_test;
      var minTestLength = validations[e.target.id].min_test;
      if (!(checkLength( e.target.id, maxTestLength, minTestLength ))){
        $('#submit').on('click', function(e){
          e.preventDefault();
        });
      }
      else {
        $('#submit').unbind('click');
      }
    }
  });
});


var validations = {
  "text-box": {
    min_test: 4,
    max_test: 32
  },
  "text-area": {
    min_test: 4,
    max_test: 140
  },
  "password": {
    min_test: 6,
    max_test: 16
  }
}


var checkPassword = function(password) {
  if ( $('#pass-confirm').val() !== password && $('#pass-confirm').val().length > 0 ) {
    $('#pass-confirm-warning').removeClass("hidden");
  } else {
    $('#pass-confirm-warning').addClass("hidden");
  }
}

var addDanger = function(warning){
  warning.removeClass("alert alert-success");
  warning.addClass("alert alert-danger");
  warning.removeClass("hidden")
  warning.parent().addClass('has-error')
}

var checkLength = function( id, maxTestLength, minTestLength ) {

  var testLength = $("#" + id).val().length;
  var warning = $("#" + id + '-warning');

  if ( testLength > 0 && testLength <= maxTestLength && testLength >= minTestLength ){
    warning.parent().removeClass('has-error')
    warning.removeClass("hidden");
    warning.text((maxTestLength - testLength) + " characters remaining.");
    warning.removeClass("alert alert-danger");
    warning.addClass("alert alert-success")
    return true;
  } else if ( testLength > maxTestLength ) {
    addDanger(warning)
    warning.text("No characters remaining");
  } else if ( testLength > 0 && testLength < minTestLength ){
    addDanger(warning)
    warning.text("Not enough characters");
  } else {
    warning.addClass("hidden");
    warning.parent().addClass('has-error')
  }
  return false;
}

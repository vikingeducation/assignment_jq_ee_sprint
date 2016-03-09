var $warning;

$( document ).ready( function(){

  $("form").on("keyup", function(e) {
    if (e.target.id === "pass-confirm") {
      checkPassword( $('#password').val() );
    } else {
      var maxTestLength = findMaxLength( e.target.id );
      checkLength( e.target.id, maxTestLength )
    }
  });
});

var findMaxLength = function(id) {
  switch (id) {
  case 'text-box':
    return 32;
    break;
  case 'text-area':
    return 140;
    break;
  case 'password':
    return 16;
    break;
  case 'pass-confirm':
    return 16;
    break;
  }
}

var checkPassword = function(password) {
  if ( $('#pass-confirm').val() !== password && $('#pass-confirm').val().length > 0 ) {
    $('#pass-confirm-warning').removeClass("hidden");
  } else {
    $('#pass-confirm-warning').addClass("hidden");
  }
}

var checkLength = function( id, maxTestLength ) {
  console.log($(id).val())
  var testLength = $("#" + id).val().length;
  var warning = $("#" + id + '-warning');

  if ( testLength > 0 && testLength <= maxTestLength ){
    warning.removeClass("hidden");
    warning.text((maxTestLength - testLength) + " characters remaining.");
    warning.removeClass("alert alert-danger");
    warning.addClass("alert alert-success")
  } else if ( testLength > maxTestLength ) {
    warning.text("No characters remaining");
    warning.removeClass("alert alert-success");
    warning.addClass("alert alert-danger");
  } else {
    warning.addClass("hidden");
  }
}

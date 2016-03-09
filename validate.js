
$(document).ready(function() {

  $( ".sample-text" ).keyup(function() {
    var max = $( ".sample-text" ).attr("maxlength");
    var len = $( ".sample-text" ).val().length;
    var diff = Number(max) - Number(len);
    $(".text .count").text("Length " + diff );
  }); 

  $( ".sample-textarea" ).keyup(function() {
    var max = $( ".sample-textarea" ).attr("maxlength");
    var len = $( ".sample-textarea" ).val().length;
    var diff = Number(max) - Number(len);
    $(".textarea .count").text("Length " + diff );
  }); 

  $( ".sample-password" ).keyup(function() {
    var max = $( ".sample-password" ).attr("maxlength");
    var len = $( ".sample-password" ).val().length;
    var diff = Number(max) - Number(len);
    $(".password .count").text("Length " + diff );
  }); 

  $( ".sample-password-conf" ).keyup(function() {
    var max = $( ".sample-password-conf" ).attr("maxlength");
    var len = $( ".sample-password-conf" ).val().length;
    var diff = Number(max) - Number(len);
    $(".password-conf .count").text("Length " + diff );
  }); 

})



$( document ).ready(function() {

  var counter = function(field, max){
    var comparison = max - field.val().length;
    if (comparison == max) { return ""; }
    else { return comparison; }
  };

  $('input[type="text"]').keyup(function(e) {
    $("#text-counter").text(counter($(e.target), 32));
  });

  $('textarea').keyup(function(e) {
    $("#textarea-counter").text(counter($(e.target), 140));
  });

  $('input[type="password"]#pw').keyup(function(e) {
    $("#password-counter").text(counter($(e.target), 16));
  });

  $('input[type="password"]#confirm').keyup(function(e) {
    $("#confirm-counter").text(counter($(e.target), 16));
  });

});
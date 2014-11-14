$( document ).ready(function() {

  var $fields    = $('.meaningless-input');
  var $pass      = $('input[type="password"]').first();
  var $confirm   = $('input[type="password"]').last();
  var $form      = $('form');
  var errorCount;

  var counter = function(field, max){
    var comparison = max - field.val().length;
    if (comparison == max) { return ""; }
    else { return comparison; }
  };

  var confirmation = function(pw, confirm){
    if (confirm.length === 0) { return ""; }
    else if(pw == confirm) { return "Confirmed"; }
    else { return "Passwords do not match"; }
  };

  $fields.keyup(function(e){
    var $field = $(e.target);
    $field.next().text(counter($field,
      $field.data('max')
    ));
  });

  $confirm.keyup(function(e) {
    $("#confirm-password").text(confirmation($pass.val(), $confirm.val()));
  });

  var validateLength = function(field) {
    if (field.val().length > field.data('max'))
      { field.addClass("error-field");
      field.next().text("Too long"); }
    else if (field.val().length < field.data('min'))
      { field.addClass("error-field");
      field.next().text("Too short"); }
    else
      { field.removeClass("error-field"); }
  };

  $form.submit(function(e){
    e.preventDefault();
    $fields.each(function(index, field){ validateLength($(field)); });
    if($confirm.val() != $pass.val())
      { $confirm.addClass("error-field");
      $pass.addClass("error-field");
      $pass.next().text("Confirmation does not match");
      $confirm.next().text("Password does not match"); }

  });

});
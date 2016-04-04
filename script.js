"use strict";

var maxValues = {
  name: 32,
  motto: 140,
  password: 16,
  'password-confirmation': 16
}

var countdown = function(event){
  var $node = $(event.target),
      $countdownNode = $node.next(),
      nodeLength = $node.val().length,
      max = maxValues[$node.attr('id')];

  if (nodeLength === 0) {
    $countdownNode.hide();
  } else {
    $countdownNode
      .show()
      .text("Characters left: " + (max - nodeLength));
  }
};

var passwordMatch = function(){
  var pass = $('#password').val(),
      conf = $('#password-confirmation').val();

  if (pass === conf && conf.length > 0) {
    $('.password-no-match').hide();
    $('.password-match').show();
  } else if (conf.length === 0) {
    $('.password-no-match').hide();
    $('.password-match').hide();
  } else {
    $('.password-match').hide();
    $('.password-no-match').show();
  }
};

var runValidations = function(){

}

$(document).ready(function(){
  $('#name').keyup(countdown);

  $('#motto').keyup(countdown);

  $('#password')
    .keyup(countdown)
    .keyup(passwordMatch);

  $('#password-confirmation')
    .keyup(countdown)
    .keyup(passwordMatch);

  $('#submit').click(runValidations);
});
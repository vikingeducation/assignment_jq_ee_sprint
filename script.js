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

$(document).ready(function(){
  $('#name').keyup(countdown);
  $('#motto').keyup(countdown);
  $('#password').keyup(countdown);
  $('#password-confirmation').keyup(countdown);
});
"use strict";

// Change these to be attributes on the form
// data-max-length = 32
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

var showValidationError = function($target, message){
  var $span = $('<span></span>')
    .text(message)
    .attr('class', 'validation-error');

  $target.parent().append($span);
  $target.addClass('in-error');
}

var runValidations = function(event){
  event.preventDefault();
  $('.validation-error').hide();
  $('.in-error').removeClass('in-error');

  var $name = $('#name'),
      $motto = $('#motto'),
      $pass = $('#password'),
      $conf = $('#password-confirmation');

  // Should refactor this
  if ($name.val().length < 4) {
    showValidationError($name, "Name too short.");
  } else if ($name.val().length > maxValues[$name.attr('id')]) {
    showValidationError($name, "Name too long.");
  }

  if ($motto.val().length < 4) {
    showValidationError($motto, "Motto too short.");
  } else if ($motto.val().length > maxValues[$motto.attr('id')]) {
    showValidationError($motto, "Motto too long.");
  }

  if ($pass.val().length < 6) {
    showValidationError($pass, "Password too short.");
  } else if ($pass.val().length > maxValues[$pass.attr('id')]) {
    showValidationError($pass, "Password too long.");
  }

  if ($pass.val() !== $conf.val()) {
    showValidationError($conf, "Does not match password.");
  }
};

var hoverIn = function(){
  $(this).addClass('hover-option');
};

var hoverOut = function(){
  $(this).removeClass('hover-option');
};

var selectOption = function(e){
  $('.dropdown-input').text(e.target.firstChild.nodeValue);
  $('ul').slideUp(500);
};

$(document).ready(function(){
  // Form Validation
  $('#name').keyup(countdown);

  $('#motto').keyup(countdown);

  $('#password')
    .keyup(countdown)
    .keyup(passwordMatch);

  $('#password-confirmation')
    .keyup(countdown)
    .keyup(passwordMatch);

  $('#submit').click(runValidations);

  // Dropdown
  $('.dropdown')
    .hide();

  $('.dropdown-input').click(function(){
    $('ul').slideDown(500);
  });

  $('li')
    .hover(hoverIn, hoverOut)
    .click(selectOption);
});
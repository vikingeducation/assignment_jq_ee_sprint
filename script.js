"use strict";

// function createSpan(charsTyped, maxChars){
//   var $span = $("<span></span>");
//   var charsLeft = maxChars - charsTyped;
//   var message = charsLeft.toString() + " characters left";
//   $span.append(message);
//   return $span;
// }

// function giveId(node, selector) {
//   return node.attr('id', selector);
// }

// function hasSpan(selector) {
//   return $(selector);
// }
//
// function removeSpan(node, selector) {
//   return node.remove(selector);
// }

function getCharsLeft(value, max) {
  return max - value;
}

function changeSpanValue(span,value) {
  var message = value.toString() + " characters left";
  return span.html(message);
}

function getPasswordContent() {
  return $('#password').val();
}

function compare(value, passwordContent) {
  return value === passwordContent;
}

function isEmpty() {
  Array.prototype.forEach.call(arguments, function(value) {
    if (value === '') {
      return true;
    }
  });
}

$(document).ready(function(e) {
  $("form").on("input", "input, textarea", function(e) {
     var charsLeft = getCharsLeft(e.target.value.length, parseInt(e.target.maxLength));
     var spanName = "#counter-"+ e.target.id;
     var $span = $(spanName);
     changeSpanValue($span, charsLeft);
      if(e.target.value.length === 0){
        $span.hide();
      }
  });

  $("form").on("input", "#password-confirmation", function(e) {
    var passwordContent = getPasswordContent();
    var message;
    var $span = $('#matching-pw-confirm');
    if (compare(e.target.value, passwordContent) || isEmpty(e.target.value, passwordContent)) {
      $span.hide();
    } else {
      message = "Password doesn't match!";
      changeSpanValue($span, message);
      $span.show();
    }
  });
});

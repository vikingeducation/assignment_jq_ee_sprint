"use strict";

function createSpan(charsTyped, maxChars){
  var $span = $("<span></span>");
  var charsLeft = maxChars - charsTyped;
  var message = charsLeft.toString() + " characters left";
  $span.append(message);
  return $span;
}

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

function getCharsTypedValue(value, max) {
  return max - value;
}

// function changeSpanValue(span,value) {
//   return span.html(value.toString());
// }

$(document).ready(function(e) {
  $("#text-field").on("input",function(e){
     var charsTyped = getCharsTypedValue(e.target.value.length, 32);
     $(this).after(span);
  });
});

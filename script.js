"use strict"

function createSpan(charsTyped, maxChars){
  var $span = $("<span></span>");
  var charsLeft = maxChars - charsTyped;
  var message = charsLeft.toString() + " characters left";
  $span.append(message);
  return $span;
}

$(document).ready(function(e){
    $("#text-field").on("input",function(e){
     var charsTyped = e.target.value.length;
     var span = createSpan(charsTyped, 32);
     $("#text-field").after(span);
   });






})
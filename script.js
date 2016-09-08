"use strict;"

$(document).ready(function() {
//   var $text_field
//   if (inputLength > 32) {
//     $feedbackDiv.text("Please input 32 characters or fewer.");
//   };
  var $feedbackDiv = $("#text-field-feedback");
  $('#text-field').keyup(function () {
    var inputLength = $("#text-field").val().length;
    if (inputLength) {
         $feedbackDiv.text(32 - $(this).val().length);
    } else {
      $feedbackDiv.text("");
    }
  });
});

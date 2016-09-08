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
         $feedbackDiv.text(32 - inputLength);
    }
    else {
      $feedbackDiv.text("");
    }
  });

  $('textarea').keyup(function(){
    var inputLength = $('textarea').val().length;
    if (inputLength){
      $('textarea').after($feedbackDiv.text(140 - inputLength));
    }
    else{
      $feedbackDiv.text("");
    }
  });

  $('#password').keyup(function(){
    var inputLength = $('#password').val().length;
    if (inputLength){
      $('#password').after($feedbackDiv.text(16 - inputLength));
    }
//     else if( inputLength < 6 && inputLength){
//       $('#password').after($feedbackDiv.text("Password to short"));
//     }
    else{
      $feedbackDiv.text("");
    }
  });


  var $confirmDiv = $('<div></div>');
  $('#password-confirmation').keyup(function(){
      var pw = $('#password').val();
      var pwc = $('#password-confirmation').val();
      if( pw === pwc ){
        $('#password-confirmation').after($confirmDiv.text("Passwords match"));
      }
      else{
        $('#password-confirmation').after($confirmDiv.text("Passwords don't match"));
      }

    var inputLength = $('#password-confirmation').val().length;
    if (inputLength){
      $('#password-confirmation').after($feedbackDiv.text(16 - inputLength));
    }
//     else if( inputLength < 6 && inputLength ){
//       $('#password-confirmation').after($feedbackDiv.text("Password to short"));
//     }
    else{
      $feedbackDiv.text("");
    }
   });
  
   var $errorDiv = $("<div class='error'></div>");
   $('button').on('click', function(){
//       $('div.error').remove();
     
      var textLength = $("#text-field").val().length;
      if ( textLength < 4 || textLength > 32 ){
        $('#text-field').addClass("error")
        $('#text-field').after($errorDiv.clone().text("Invalid text input"));
      }
   })
});

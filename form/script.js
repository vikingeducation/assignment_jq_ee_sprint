// "use strict";

// break back out
var formRead = {
  inputCount: function(event){
    var $originator = $(event.target);
    var maxChar = 32;
    var $counter = $originator.next();
    var remaining = maxChar - $originator.val().length;
    $counter.text( remaining < maxChar ? remaining + " characters remaining" : "" );
  },

  passwordCount: function(event){
    var $originator = $(event.target);
    var maxChar = 16;
    var $counter = $originator.next();
    var remaining = maxChar - $originator.val().length;
    $counter.text( remaining < maxChar ? remaining + " characters remaining" : "" );
  },

  textareaCount: function(event){
    var $originator = $(event.target);
    var maxChar = 140;
    var $counter = $originator.next();
    var remaining = maxChar - $originator.val().length;
    $counter.text( remaining < maxChar ? remaining + " characters remaining" : "" );
  },

  passMatch: function(event){
    var firstPassword = $("#password").val();
    var secondPassword = $("#password-confirmation").val();
    var $display = $(".warning", "#passwords");
    var $displayText;
    if (secondPassword.length === 0 || firstPassword === secondPassword){
      displayText = "";
    } else {
      displayText = "Passwords do not match";
    }
    $display.text(displayText);
  },

  nameValidate: function(){
    var warningText;
    var $nameField =  $("input[name='username']")[0]; //TODO ask why single quote needed
    var $nameLength = $nameField.value.length();
    var $warningSpan = $nameField.next();
    if ($nameLength < 4) {
      warningText = "Pick a Username with at least 4 characters";
      $warningSpan.text(warningText);
      return false;
    } else if ($nameLength > 32) {
      warningText = "Pick a Username with fewer than 32 characters";
      $warningSpan.text(warningText);
      return false;
    } else {
      warningText = "";
    }
  }
  
};


$(document).ready(function(){
  // $("form").on("keyup", formRead.charCount);
  $('input[type="text"]').keyup(formRead.inputCount);
  $('input[type="password"]').keyup(function(event){
    formRead.passwordCount(event);
    formRead.passMatch(event);
  });
  $('textarea').keyup(formRead.textareaCount);



  // $("form").on("input", "input[type=password]", formRead.passMatch);
  // $("form input[type=submit]").on("click", formRead.nameValidate);
});

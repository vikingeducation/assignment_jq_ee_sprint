// "use strict";

var formRead = {
  charCount: function(event){
    var $originator = $(event.target);
    // TODO what would work in place of .type?:
    var maxChar;
    if ($originator["type = text"]){
      maxChar = 32;
    } else if ($originator.type == "textarea") {
      maxChar = 140;
    } else if ($originator.type == "password") {
      maxChar = 16;
    }
    var $counter = $originator.next();
    var remaining = maxChar - $originator.val().length;
    $counter.text( remaining < maxChar ? remaining + " characters remaining" : "" );
  },

  passMatch: function(){
    var firstPassword = $("#password").val();
    var secondPassword = $("#password-confirmation").val();
    var $display = $(".count", "#passwords");
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
  $("form").on("keyup", formRead.charCount);
  $("form").on("input", "input[type=password]", formRead.passMatch);
  $("form input[type=submit]").on("click", formRead.nameValidate);
});

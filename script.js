function charsLeft(e, targetSelector, max){
  var inputLength = $(e.target).val().length;
  var remaining = max - inputLength;

  $(targetSelector).text(remaining + " characters left");
};

function confirmMatch(e){
  if($(e.target).val() !== $("#password").val()){
    
    $("#password-confirmer").text("passwords must match");
  } else {
    $("#password-confirmer").text("");
  }

};

function validateText(){
  $text = $("#text");
  length = $text.length;
  if(length < 4 || length > 32){
    $text.addClass("red");
    $("#text-info").text("is wrong length");
  }
};

function validateTextArea(){
  $textarea = $("#textarea");
  length = $textarea.text().length;

  if(length < 4 || length > 140){
    $textarea.addClass("red");
    $("#textarea-info").text("Length is wrong");
  }
};

function validatePassword(){
  $password = $("#password");
  length = $password.val().length;

  if(length < 6 || length > 16){
    $password.addClass("red");
    $("#password-info").text("Length is incorrect");
  }

};


function validateConfirmation(){
  $password = $("#password-confirmation");
  length = $password.val().length;

  if($password.val() !== $("#password-confirmation").val()){
    $("#passwordc-info").text("Passwords must match");
    $password.addClass("red");
    $("#password-confirmation").addClass("red");
  }

  if(length < 6 || length > 16){
    $password.addClass("red");
    $("#passwordc-info").text("Length is incorrect");
  }
};




$("document").ready(function(){

  $("#text").keyup(function(e){

    charsLeft(e, "#text-info", 32);
  })

  $("#textarea").keyup(function(e){
    charsLeft(e, "#textarea-info", 140);
  })


  $("#password").keyup(function(e){
    charsLeft(e, "#password-info", 16);
  })

  $("#password-confirmation").keyup(function(e){
    charsLeft(e, "#passwordc-info", 16);
    confirmMatch(e);
  })

  $("#submit").click(function(eventObject){
    eventObject.preventDefault();
    validateText();
    validateTextArea();
    validatePassword();
    validateConfirmation();
  })


  $("#button").click(function(eventObject){
    eventObject.preventDefault();
    $("#unordered").slideToggle(500);
  })


  $("#unordered li").hover(function(eventObject){
    $(eventObject.target).toggleClass("color");
  })
  




})
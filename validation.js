
function remainChar(element, char, max) {
  var inputCh = $(element.target).val().length;
  var remaining = max - inputCh;
  $(char).text("Remaining characters: " + remaining);
};

function confirmed(element, message) {
  if( $(element.target).val()==="") {
      $(message).text("");
  }

  else if ($("#password").val() !== $(element.target).val() ) {
      $(message).text("Not matched!");
  } else {
  $(message).text("");
  }
};

function validateText() {
  $length = $("#text").val().length;
  if ($length<4 || $length>32) {
    $("#text").addClass("red");
    $("#text-char").text(" Needs to be between 4-32 characters");
    $("#text-char").addClass("redtext");
  }
};

function validateTextArea() {
  $length = $("#textarea").val().length;
  if ($length<4 || $length>140) {
    $("#textarea").addClass("red");
    $("#textarea-char").text(" Needs to be between 4-140 characters");
    $("#textarea-char").addClass("redtext");
  }
};

function validatepassword() {
  $length = $("#password").val().length;
  if ($length<4 || $length>140) {
    $("#password").addClass("red");
    $("#password-char").text(" Needs to be between 6-16 characters");
    $("#password-char").addClass("redtext");
  }
};

function validatepasswordcon() {
  $length = $("#confirm_password").val().length;
  if ($length<4 || $length>140) {
    $("#confirm_password").addClass("red");
    $("#confirm_password-char").text(" Needs to be between 6-16 characters");
    $("#confirm_password-char").addClass("redtext");
  }
};


$("document").ready(function() {

$("#text").keyup(function(element){
  remainChar(element, "#text-char", 32);
})

$("#textarea").keyup(function(element) {
  remainChar(element, "#textarea-char", 140);
})

$("#password").keyup(function(element) {
  remainChar(element, "#password-char", 16);
})

$("#confirm_password").keyup(function(element) {
  remainChar(element, "#confirm_password-char", 16);
})

$("#confirm_password").keyup(function(element) {
  confirmed(element, "#matched");
})

$("#button").click(function(event) {
  event.preventDefault();
  validateText();
  validateTextArea();
  validatepassword();
  validatepasswordcon();
})

})

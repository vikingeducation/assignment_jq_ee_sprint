$(document).ready(function(){

// counter for text input
  $("#text").keyup(function(){

    var text = $("#text").val();
    if (text.length === 0) {
      $("#text-count").html('');
    } else {
      $("#text-count").html(text.length);
    }

  });

// counter for textarea input
  $('#textarea').keyup(function(){

    var textarea = $("#textarea").val();
    if (textarea.length === 0) {
      $("#textarea-count").html('');
    } else {
      $("#textarea-count").html(textarea.length);
    }

  });

  //counter for password and password confirmation
  $('#passconf, #password').keyup(function(){

    var password = $("#password").val();
    var passconf = $("#passconf").val();
    if (password.length === 0) {
      $("#password-count").html('');
    } else {
      $("#password-count").html(password.length);
    }
    if (passconf.length === 0) {
      $("#passconf-count").html('');
      $("#passconf-message").html('');
    } else {
      $("#passconf-count").html(passconf.length);
    }
    if (passconf === password || passconf.length === 0){
      $("#passconf-message").html('');
    } else {
      $("#passconf-message").html('Does not match password.');
    }


  });

// error messages on submit
  $("#testform").on("submit", function(event) {

    event.preventDefault();
    var password = $("#password").val();
    var passconf = $("#passconf").val();
    var textarea = $("#textarea").val();
    var text = $("#text").val();
    if (text.length < 4 || text.length > 32) {
      $("#text-error").html("Text must be between 4 and 32 characters!");
      $("#text").addClass("error");
    } else {
      $("#text-error").html('');
      $("#text").removeClass("error");
    }
    if (textarea.length < 4 || textarea.length > 140) {
      $("#textarea-error").html("Textarea must be between 4 and 140 characters!");
      $("#textarea").addClass("error");
    } else {
      $("#textarea-error").html('');
      $("#textarea").removeClass("error");
    }
    if (password.length < 6 || password.length > 16) {
      $("#password-error").html("Password must be between 6 and 16 characters!");
      $("#password").addClass("error");
    } else {
      $("#password-error").html('');
      $("#password").removeClass("error");
    }
    if (passconf.length < 6 || passconf.length > 16) {
      $("#passconf-message").append(" Password must be between 6 and 16 characters!");
      $("#passconf").addClass("error");
    } else {
      $("#passconf").removeClass("error");
    }

  });

});

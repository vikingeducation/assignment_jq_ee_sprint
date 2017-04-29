$(document).ready(function() {

  $("#text-field").on("input", function(eventObj) {
    var charsRemaining = 32 - $(this).val().length;

    if (charsRemaining < 32 ) {
      $(this).next().text(charsRemaining + " characters remaining")
    }
    else {
      $(this).next().text("");
    }
  });

  $("#text-area").on("input", function(eventObj) {
    var charsRemaining = 140 - $(this).val().length;

    if (charsRemaining < 140 ) {
      $(this).next().text(charsRemaining + " characters remaining")
    }
    else {
      $(this).next().text("");
    }
  });

  $("input[type='password']").on("input", function(eventObj) {
    var charsRemaining = 16 - $(this).val().length;

    if (charsRemaining < 16 ) {
      $(this).next().text(charsRemaining + " characters remaining")
    }
    else {
      $(this).next().text("");
    }

    var password = $("#password").val();
    var passwordConfirmation = $("#password-confirmation").val();
    if (password == passwordConfirmation) {
      $("#password-match-validation").text("");
    } else {
      if (passwordConfirmation.length > 0) {
        $("#password-match-validation").text("Passwords do not match!");
      }
    }
  });

  $("button").on("click", function() {
    //validate text
    if ($("#text-field").val().length < 4) {
      $("#text-field").siblings().filter(".error-message").text("Text is too short");
    } else if ($("#text-field").val().length > 32) {
      $("#text-field").siblings().filter(".error-message").text("Text is too long");
    } else {
      $("#text-field").siblings().filter(".error-message").text("");
    }

    //5 here since text area includes carriage return
    if ($("#text-area").val().length < 5) {
      $("#text-area").siblings().filter(".error-message").text("Text area is too short");
    } else if ($("#text-area").val().length > 140) {
      $("#text-area").siblings().filter(".error-message").text("Text area is too long");
    } else {
      $("#text-area").siblings().filter(".error-message").text("");
    }

    if ($("#password").val().length < 6) {
      $("#password").siblings().filter(".error-message").text("Password is too short");
    } else if ($("#password").val().length > 16) {
      $("#password").siblings().filter(".error-message").text("Password is too long");
    } else {
      $("#password").siblings().filter(".error-message").text("");
    }

    if ($("#password-confirmation").val().length < 6) {
      $("#password-confirmation").siblings().filter(".error-message").text("Password is too short");
    } else if ($("#password-confirmation").val().length > 16) {
      $("#password-confirmation").siblings().filter(".error-message").text("Password is too long");
    } else {
      $("#password-confirmation").siblings().filter(".error-message").text("");
    }
  });


  //dropdown menu
  $("#dropdown-list").hide();

  $(".dropdown").hover(function() {
    $("#dropdown-list").slideDown(500);
  }, function() {
    $("#dropdown-list").slideUp(500);
  });

  $(".menu").hover(function() {
    $(this).addClass("selected-item");
    $(this).css('cursor','pointer');
  }, function() {
    $(this).removeClass("selected-item");
  });

  $(".menu").click(function() {
    $("#top-item").text($(this).text());
    $("#dropdown-list").slideUp(500);
  });





});

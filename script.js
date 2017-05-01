$(document).ready(function() {
  //form validations
  function getLengthRemaining($target, maxLength) {
     return (maxLength - $target.val().length);
  }

  function updateLengthRemainingAttribute($target, maxLength) {
    var charsRemaining = getLengthRemaining($target, maxLength);

    if (charsRemaining < maxLength ) {
      $target.next().text(charsRemaining + " characters remaining")
    }
    else {
      $target.next().text("");
    }
  }

  function validateLength($target, minLength, maxLength) {
    if ($target.val().length < minLength) {
      $target.siblings().filter(".error-message").text("Text is too short");
    } else if ($target.val().length > maxLength) {
      $target.siblings().filter(".error-message").text("Text is too long");
    } else {
      $target.siblings().filter(".error-message").text("");
    }
  }

  function validatePasswordMatch(password, passwordConfirmation) {
    if (password == passwordConfirmation) {
      $("#password-match-validation").text("");
    } else {
      if (passwordConfirmation.length > 0) {
        $("#password-match-validation").text("Passwords do not match!");
      }
    }
  }

  $("#text-field").on("input", function(eventObj) {
    updateLengthRemainingAttribute($(this), 32);
  });

  $("#text-area").on("input", function(eventObj) {
    updateLengthRemainingAttribute($(this), 140);
  });

  $("input[type='password']").on("input", function(eventObj) {
    updateLengthRemainingAttribute($(this), 16);
    validatePasswordMatch($("#password").val(), $("#password-confirmation").val());
    // var password = $("#password").val();
    // var passwordConfirmation = $("#password-confirmation").val();
    // if (password == passwordConfirmation) {
    //   $("#password-match-validation").text("");
    // } else {
    //   if (passwordConfirmation.length > 0) {
    //     $("#password-match-validation").text("Passwords do not match!");
    //   }
    // }
  });

  $("button").on("click", function() {
    //validate text
    validateLength($("#text-field"), 4, 32);
    validateLength($("#text-area"), 5, 140);
    validateLength($("#password"), 6, 16);
    validateLength($("#password-confirmation"), 6, 16);



    // //5 here since text area includes carriage return
    // if ($("#text-area").val().length < 5) {
    //   $("#text-area").siblings().filter(".error-message").text("Text area is too short");
    // } else if ($("#text-area").val().length > 140) {
    //   $("#text-area").siblings().filter(".error-message").text("Text area is too long");
    // } else {
    //   $("#text-area").siblings().filter(".error-message").text("");
    // }
    //
    // if ($("#password").val().length < 6) {
    //   $("#password").siblings().filter(".error-message").text("Password is too short");
    // } else if ($("#password").val().length > 16) {
    //   $("#password").siblings().filter(".error-message").text("Password is too long");
    // } else {
    //   $("#password").siblings().filter(".error-message").text("");
    // }
    //
    // if ($("#password-confirmation").val().length < 6) {
    //   $("#password-confirmation").siblings().filter(".error-message").text("Password is too short");
    // } else if ($("#password-confirmation").val().length > 16) {
    //   $("#password-confirmation").siblings().filter(".error-message").text("Password is too long");
    // } else {
    //   $("#password-confirmation").siblings().filter(".error-message").text("");
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


  //photo tagging
  $("#tag-box").hide();
  $("#tag-dropdown").hide();

  $(".photo").hover(function() {
    $("#tag-box").show();
  }, function() {
    $("#tag-box").hide();
  });

  $(".photo").mousemove(function(eventObj) {
    $("#tag-box").css({
      left: eventObj.pageX-20,
      top: eventObj.pageY-20
    });
  });

  $(".photo").click(function() {
    $(".photo").off("mousemove");
  })



});

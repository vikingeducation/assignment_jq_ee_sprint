function textCount ($item) {
  var counter = $item.val().length;
  console.log(counter);
  return counter;
}

$(window).on("load", function() {

  //Name char counter
  $inputName = $("input[type='text'][name='name']");
  $inputName.on("keyup", function() {
    if ($("#textCounter").length) {
      $("#textCounter").remove();
    }
    var counted = textCount($inputName);
    if (counted) {
      $inputName.after($("<span>")
        .text(32 - counted + " remaing")
        .attr("id", "textCounter")
      )
    }
  });

  //Text area counter
    $textAreaName = $("textarea");
    $textAreaName.on("keyup", function() {
      if ($("#textAreaCounter").length) {
        $("#textAreaCounter").remove();
      }
      var counted = textCount($textAreaName);
      if (counted) {
        $textAreaName.after($("<span>")
          .text(140 - counted + " remaing")
          .attr("id", "textAreaCounter")
        )
      }
    });

    //Pass char counter
    $passName = $("input[type='password'][name='pass']");
    $passName.on("keyup", function() {
      if ($("#passCounter").length) {
        $("#passCounter").remove();
      }
      var counted = textCount($passName);
      if (counted) {
        $passName.after($("<span>")
          .text(16 - counted + " remaing")
          .attr("id", "passCounter")
        )
      }
    });

    //Pass Confirm char counter
    $passConfirmName = $("input[type='password'][name='passConfirm']");
    $passConfirmName.on("keyup", function() {
      if ($("#passConfirmCounter").length) {
        $("#passConfirmCounter").remove();
        $("#passConfirmer").remove();
      }
      var counted = textCount($passConfirmName);
      if (counted) {
        $passConfirmName.after($("<span>")
          .text(16 - counted + " remaing")
          .attr("id", "passConfirmCounter")
        )
        if ($passConfirmName.val() != $passName.val()) {
          $passConfirmName.after($("<span>")
            .text("Passwords must match")
            .attr("id", "passConfirmer")
          )
        }
      }
});

//Text field -- 4-32 characters
//Text area -- 4-140 characters
//Password/confirmation -- 6-16 characters
//Password -- must match confirmation
    $("form").submit(function (event) {
      //If name input is incorrect
      if ( ( ($inputName.val().length < 4) || ($inputName.val().length > 32) ) && ($inputName.hasClass("highlightedText")==0) )  {
        $inputName.addClass("highlightedText");
        $inputName.after("<div class='alert alert-danger'> <strong>Sorry</strong> Please enter a name between 4-32 characters. </div>");
      }
      //if input is correct => remove warnings if up
      else if ( ($inputName.val().length >= 4) && ($inputName.val().length <= 32) ) {
        $inputName.removeClass("highlightedText");
        $(".alert").remove();
      }

      //If textArea is incorrect
      if ( ( ($textAreaName.val().length < 4) || ($textAreaName.val().length > 140) ) && ($textAreaName.hasClass("highlightedText")==0) )  {
        $textAreaName.addClass("highlightedText");
        $textAreaName.after("<div class='alert alert-danger'> <strong>Sorry</strong> Please enter something between 4-140 characters. </div>");
      }
      //if textArea is correct => remove warnings if up
      else if ( ($textAreaName.val().length >= 4) && ($textAreaName.val().length <= 140) ) {
        $textAreaName.removeClass("highlightedText");
        $(".alert").remove();
      }

      //If password is incorrect
      if ( ( ($passName.val().length < 6) || ($passName.val().length > 16) ) && ($passName.hasClass("highlightedText")==0) )  {
        $passName.addClass("highlightedText");
        $passName.after("<div class='alert alert-danger'> <strong>Sorry</strong> Please enter a password between 6-16 characters. </div>");
      }
      //if password is correct => remove warnings if up
      else if ( ($passName.val().length >= 6) && ($passName.val().length <= 16) ) {
        $passName.removeClass("highlightedText");
        $(".alert").remove();
      }

      //If passwordConirm is incorrect
      if ( ( ($passConfirmName.val().length < 6) || ($passConfirmName.val().length > 16) ) && ($passConfirmName.hasClass("highlightedText")==0) )  {
        $passConfirmName.addClass("highlightedText");
        $passConfirmName.after("<div class='alert alert-danger'> <strong>Sorry</strong> Please enter a password between 6-16 characters. </div>");
      }
      //if passwordConfirm is correct => remove warnings if up
      else if ( ($passConfirmName.val().length >= 6) && ($passConfirmName.val().length <= 16) ) {
        $passConfirmName.removeClass("highlightedText");
        $(".alert").remove();
      }

      //If passwords dont match
      if ( ( ($passConfirmName.val() != $passName.val() ) && ($passConfirmName.hasClass("highlightedText")==0) ) )  {
        $passConfirmName.addClass("highlightedText");
        $passConfirmName.after("<div class='alert alert-danger'> <strong>Sorry</strong> Passwords must match. </div>");
      }
      //if passwords match => remove warnings if up
      else if (($passConfirmName.val() === $passName.val())&& $passConfirmName.hasClass("highlightedText")==0 ) {
        $passConfirmName.removeClass("highlightedText");
        $(".alert").remove();
      }

      event.preventDefault();
    });

});

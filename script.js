$(document).ready(function() {

  //displays how many characters are remaining as the user types
  let countChars = function(val){
    let maxLength = $(this).prop("maxlength");
    let currentLength = $(this).val().length;
    let divDisp = $(this).next("div");
    divDisp.text("You have " + (maxLength - currentLength) + " characters remaining");
  }

  //counts the characters of user input, calls countChars function
  $("input").keypress(countChars);
  $("textarea").keypress(countChars);

  //displays whether or not the passwords match
  $("#confirm").keyup(function(){
    let val = $(this).val();
    let length = $(this).val().length;
    if(length === 0){
      $("p").addClass("hidden");
    } else if(val === $("#password").val()){
      $("p").addClass("hidden");
    } else {
      $("p").removeClass("hidden");
    }
  });

  //removes the remaining characters display if the user clicks out
  $("input").focusout(function(){
    $(this).next("div").text("");
  });
  $("textarea").focusout(function(){
    $(this).next("div").text("");
  });

  //checks that all submissions are acceptable when user hits submit button
  $("form").submit(function(event){
    let nameLength = $("#name").val().length;
    let descripLength = $("#description").val().length;
    let passwordLength = $("#password").val().length;

    if (nameLength >= 4 && nameLength <=32) {
      if (descripLength >= 4 && descripLength <= 140) {
        if (passwordLength >= 6 && passwordLength <= 16) {
          if ($("#confirm").val() === $("#password").val()) {
            $("#submit").next("div").text("Successfully submited!");
          } else {
            $("#confirm").next("div").addClass("problem").text("The passwords do not match!");
          }
        } else {
          $("#password").next("div").addClass("problem").text("Password must be 6-16 characters long.");
        }
      } else {
        $("#description").next("div").addClass("problem").text("Description must be 4-140 characters long.");
      }
    } else {
      $("#name").next("div").addClass("problem").text("Name must be 4-32 characters long.");
    }

    event.preventDefault();
  });

});

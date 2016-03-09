
$(document).ready(function(){
  $('#username').on("keyup", function(event){
    var target = event.target;
    var characters_remaining = 32-target.value.length;
    var $username_counter = $('#username_counter');

    if (characters_remaining === 32){
      $username_counter.hide();
    }
    else if (characters_remaining <= 0){
      $username_counter.text("Your username is too long.");
    }
    else{
      $username_counter.text("Characters Remaining: " + characters_remaining.toString()).show();
    }
  });

  $('#description').on("keyup", function(event){
    var target = event.target;
    var characters_remaining = 140-target.value.length;
    var $description_counter = $('#description_counter');

    if (characters_remaining === 140){
      $description_counter.hide();
    }
    else if (characters_remaining <= 0){
      $description_counter.text("Your description is too long.");
    }
    else{
      $description_counter.text("Characters Remaining: " + characters_remaining.toString()).show();
    }
  });


  $('#password').on("keyup", function(event){
    var target = event.target;
    var characters_remaining = 16-target.value.length;
    var $password_counter = $('#password_counter');

    if (characters_remaining === 16){
      $password_counter.hide();
    }
    else if (characters_remaining <= 0){
      $password_counter.text("Your password is too long.");
    }
    else{
      $password_counter.text("Characters Remaining: " + characters_remaining.toString()).show();
    }
  });

  $('#password-confirmation').on("keyup", function(event){
    var target = event.target;
    var characters_remaining = 16-target.value.length;
    var $password_confirm_counter = $('#password_confirm_counter');

    var $password_value = $('#password').val();

    if (characters_remaining === 16){
      $password_confirm_counter.hide();
    }
    else if (characters_remaining <= 0){
      $password_confirm_counter.text("Your password confirmation is too long.");
    }
    else{
      for (var i = 0; i < target.value.length; i++){
        if($password_value[i] != target.value[i]){
          $password_confirm_counter.text("Characters Remaining: " + characters_remaining.toString() + ". Password confirmation does not match.").show();
        }
        else{
          $password_confirm_counter.text("Characters Remaining: " + characters_remaining.toString()).show();
        }
      }
    }
  });

  $('#submit').on("click", function(event){
    var $username_field = $('#username');
    var $description_field = $('#description');
    var $password_field = $('#password');
    var $password_confirm_field = $('#password-confirmation');

    if ($username_field.val().length < 4){
      event.preventDefault();
      $username_field.css('color', 'red');
      $('#username_counter').css('color', 'red');
      $('#username_counter').text("Your username needs to have at least 4 characters.");
    }
    if ($description_field.val().length < 4) {
      event.preventDefault();
      $description_field.css('color', 'red');
      $('#description_counter').css('color', 'red');
      $('#description_counter').text("Your description needs to have at least 4 characters.");
    }
    if ($password_field.val().length < 6 ) {
      event.preventDefault();
      $password_field.css('color', 'red');
      $('#password_counter').css('color', 'red');
      $('#password_counter').text("Your password needs to have at least 6 characters.");
    }
    // Password confirmation validation
    if ($password_confirm_field.val().length === $password_field.val().length) {
      for (var i = 0; i < $password_confirm_field.val().length; i++){
        if($password_field.val()[i] != $password_confirm_field.val()[i]){
          event.preventDefault();
          $password_confirm_field.css('color', 'red');
          $('#password_confirm_counter').css('color', 'red');
          $("#password_confirm_counter").text("Password confirmation does not match.");
        }
      }
    } else {
      $password_confirm_field.css('color', 'red');
      $('#password_confirm_counter').css('color', 'red');
      $("#password_confirm_counter").text("Password confirmation does not match.");
    }

  });


});
























// $(document).ready(function(){

//   // $("form").children[0];
//   $("form").on("keyup", "#username", function(event){
//     var target = event.target;
//     var $target = $(target);
//     //console.log(target);
//     if($target.next().is('div') || $target.next().text() == '0'){
//       $target.next().remove();
//     }
//     else{
//         var characters = this.value.length;
//     //var $username_counter = $("<div></div>").html(characters.toString());
//     var username_counter = document.createElement("div");
//     username_counter.innerHTML = characters.toString();
//     username_counter.id = 'username_counter';
//     //$username_counter.html = characters;
//     //console.log($username_counter);
//     //this.after($username_counter);

//     $(username_counter).insertAfter($target);

//     }
//   });

// });

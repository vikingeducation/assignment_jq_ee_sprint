$(document).ready(function(){

console.log("The document is ready");

// let inputs = {
//   name: {
//     id: $("#name"),
//     val: $("#name").val(),
//     length: $("#name").val().length,
//     true: (4 <= name.length && name.length <= 32)
//   },
//   about-you: {
//     id: $("#about-you"),
//     val: $("#about-you").val(),
//     length: $("#about-you").val().length,
//     true: (4 <= about-you.length && about-you.length <= 140)
//   },
//   password: {
//     id: $("#password"),
//     val: $("#password").val(),
//     length: $("#password").val()length,
//     true: (6 <= password.length && password.length <= 16)
//   },
//   confirm: {
//     id: $("#confirm"),
//     val: $("#confirm").val(),
//     length: $("#confirm").val().length,
//     true: $("confirm").val() === $("password").val()
//   },
// };

$("#dropDown").hide();

let countTel = function(val){
  let maxLength = $(this).prop("maxlength");
  let currentLength = $(this).val().length;
  let displayDiv = $(this).next("div");
  displayDiv.text(maxLength - currentLength + " characters remaining");
};

$("input").keypress(countTel);

$("textarea").keypress(countTel);

$("input").focusout(function(){
  $(this).next("div").text("");
})

$("textarea").focusout(function(){
  $(this).next("div").text("");
})

$("#confirm").keyup(function(){
  let val = $(this).val();
  let length = $(this).val().length;
  if(length === 0){
    $("p").addClass("hidden");
  }else if(val !== $("#password").val()){
    $("p").removeClass("hidden");
  }else{
    $("p").addClass("hidden");
  }
});

$("form").submit(function( event ){
  let nameLength = $("#name").val().length;
  let nameTrue = (4 <= nameLength && nameLength <= 32);

  let aboutYouLength = $("#about-you").val().length;
  let aboutYouTrue = (4 <= aboutYouLength && aboutYouLength <= 140);

  let passwordLength = $("#password").val().length;
  let passwordTrue = (6 <= passwordLength && passwordLength <= 16);

  let confirmTrue = ($("confirm").val() === $("password").val());


  if(nameTrue){
    if(aboutYouTrue){
      if(passwordTrue){
        if(confirmTrue){
          alert("Submitted");
        }else{
          $("#confirm").next("div").addClass("error").text("Passwords do not match");
        }
      }else{
        $("#password").next("div").addClass("error").text("Password must be 6-16 characters");
      }
    }else{
      $("#about-you").next("div").addClass("error").text("Must be 4-140 characters");
    }
  }else{
    $("#name").next("div").addClass("error").text("Must be 4-32 characters");
  }

  event.preventDefault();
})


$("#dropdown").click(function(){
  if( $("li").is(":hidden")){
    $("li").slideDown("slow");
  }else{
    $("li").click(function(){
      $("li").removeClass("selected");
      $(this).addClass("selected");
      $("li:not(.head)").slideUp("slow");
      $("li.head").html($(this).html());
      $(".head").removeClass("selected");
    })
  }
});

$("li:not(.head)").hover(function(){
  $(this).addClass("hover");
},
  function(){
  $(this).removeClass("hover");
})






})

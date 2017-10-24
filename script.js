$(document).ready(function(){

console.log("The document is ready");

let countTel = function(val){
  let maxLength = $(this).prop("maxlength");
  let currentLength = $(this).val().length;
  let displayDiv = $(this).next("div");
  displayDiv.text(maxLength - currentLength + " characters remaining");
  $(this).focusout(function(){
    displayDiv.text("");
  })
};

$("input").keypress(countTel);

$("textarea").keypress(countTel);

$













})

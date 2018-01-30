
/*
  cd Documents/Viking/JS/jq_sprint

  https://stackoverflow.com/questions/34453095/javascript-display-remaining-characters-of-text-area

  1. get the elements themselves

  2. add event listeners

  3. on event trigger, calculate length

  4. change the text of the element near the textbox to reflect the amount of
  characters, these elements should be hidden otherwise, so the html should be
  empty
*/

var textInput = document.getElementById("text1").value.length;
textInput.addEventListener("input", );

function textCounter(target) {
  console.log(textInput)
  var characters = 32 - textInput;
  console.log(characters)

}

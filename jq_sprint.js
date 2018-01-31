
/*
  cd Documents/Viking/JS/jq_sprint

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://stackoverflow.com/questions/34453095/javascript-display-remaining-characters-of-text-area

  https://www.w3schools.com/js/js_htmldom_eventlistener.asp

  https://developer.mozilla.org/en-US/docs/Web/Events/input

  https://davidwalsh.name/event-delegate

  1. get the elements themselves

  2. add event listeners

  3. on event trigger, calculate length

  4. change the text of the element near the textbox to reflect the amount of
  characters, these elements should be hidden otherwise, so the html should be
  empty
*/

document.getElementById("validation").addEventListener("input", function(texty) {
    console.log(texty.target);
    console.log(texty.target.nodeName);
    var characters = texty.target.value.length;
    console.log(characters)
    var remaining = 32 - characters;
    console.log(remaining)
});

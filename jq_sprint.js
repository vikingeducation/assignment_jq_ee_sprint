
/*
  cd Documents/Viking/JS/jq_sprint

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  TODO
  1. password confirmation

  2. form submission - should verify limits, password matches, and handle errors
*/

document.getElementById("validation").addEventListener("input", function(texty) {
    var characters = texty.target.value.length;

    if (texty.target.classList.contains("IA")) {
      var limit = 32;
      var counter = document.getElementById("counterIA");
    } else if (texty.target.classList.contains("T1")) {
      var limit = 140;
      var counter = document.getElementById("counterT1");
    } else if (texty.target.classList.contains("IB")) {
      var limit = 16;
      var counter = document.getElementById("counterIB");
    } else if (texty.target.classList.contains("IC")) {
      var limit = 16;
      var counter = document.getElementById("counterIC");
    }

    var remaining = limit - characters;
    counter.innerHTML = "characters left: " + remaining;
});

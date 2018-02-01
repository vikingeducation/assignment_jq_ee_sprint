/*
  cd Documents/Viking/JS/jq_sprint

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  TODO
  1. password confirmation

  2. form submission - should verify limits, password matches, and handle errors
*/

document.getElementById("myForm").addEventListener("input", function(action) {
  var subject = action.target;
  var characters = subject.value.length;

  if (subject.classList.contains("IA")) {
    var limit = 32;
    var counter = document.getElementById("counterIA");
  } else if (subject.classList.contains("T1")) {
    var limit = 140;
    var counter = document.getElementById("counterT1");
  } else if (subject.classList.contains("IB")) {
    var limit = 16;
    var counter = document.getElementById("counterIB");
  } else if (subject.classList.contains("IC")) {
    var limit = 16;
    var counter = document.getElementById("counterIC");
    if (
      document.getElementsByClassName("IB")[0].value ===
      document.getElementsByClassName("IC")[0].value
    ) {
      var message = "match";
    } else {
      var message = "don't match";
    }
    document.getElementById("confirm").innerHTML = "passwords " + message;
  }

  var remaining = limit - characters;
  counter.innerHTML = "characters left: " + remaining;
});








// spacing

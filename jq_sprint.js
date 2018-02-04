/*
  cd Documents/Viking/JS/jq_sprint

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://www.w3schools.com/js/js_validation.asp

  TODO
  form submission - should verify limits, password matches, and handle errors
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

/*
  Text field -- 4-32 characters
  Text area -- 4-140 characters
  Password/confirmation -- 6-16 characters
  Password -- must match confirmation

  1. get each value

  2. check each value against conditions above (may bypass 1 & 2 by grabbing
  the value of the input display element to the user)

  3. if conditions are met grab a new as of yet not created html element and
  add a message about successful submission, otherwise return false and modify
  the display element(s) with an appropriate error, likely better to send to a
  different page by adding "action="/success.html"" to the form element and
  copying the main html page but add a success message to the success.html file
*/

function validateForm() {
  var inputs = document.forms[0];

  if (inputs[0].value.length > 3 && inputs[0].value.length < 33) {
    console.log("val 1 good")
  } else {
    console.log("val 1 bad")
    return false;
  }

  if (inputs[1].value.length > 3 && inputs[1].value.length < 141) {
    console.log("val 2 good")
  } else {
    console.log("val 2 bad")
    return false;
  }

  if (inputs[3].value.length > 5 && inputs[3].value.length < 17) {
    console.log("val 3 good")
  } else {
    console.log("val 3 bad")
    return false;
  }

  if (inputs[4].value.length > 5 && inputs[4].value.length < 17) {
    console.log("val 4 good")
  } else {
    console.log("val 4 bad")
    return false;
  }

  if (inputs[3].value === inputs[4].value) {
    console.log("val 3 & 4 match")
  } else {
    console.log("val 3 & 4 dont match")
    return false;
  }
}










// spacing

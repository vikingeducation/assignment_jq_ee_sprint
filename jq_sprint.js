
/*
  cd Documents/Viking/JS/jq_sprint

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  TODO
  form submission - should verify limits, password matches, and handle errors
*/

var theForm = document.getElementById("myForm");

theForm.addEventListener("input", function(action) {
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
      subject.value
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

  - change the html contents of the display elements
   1. blank if good

   2. if bad show error and make both error and that field red

  - if all fields are good blank everything out (as in include input fields),
  and either reveal or unhide an html element under the submit button
*/

theForm.addEventListener("submit", function(pressed) {
  pressed.preventDefault();

  var inputs = document.forms[0];

  if (inputs[0].value.length > 3 && inputs[0].value.length < 33) {
    console.log("val 1 good")
  } else {
    console.log("val 1 bad")
    document.getElementById("counterIA").innerHTML = "length error, must be longer than 4 and shorter than 32 characters"
  }

  if (inputs[1].value.length > 3 && inputs[1].value.length < 141) {
    console.log("val 2 good")
  } else {
    console.log("val 2 bad")
  }

  if (inputs[3].value.length > 5 && inputs[3].value.length < 17) {
    console.log("val 3 good")
  } else {
    console.log("val 3 bad")
  }

  if (inputs[4].value.length > 5 && inputs[4].value.length < 17) {
    console.log("val 4 good")
  } else {
    console.log("val 4 bad")
  }

  if (inputs[3].value === inputs[4].value) {
    console.log("val 3 & 4 match")
  } else {
    console.log("val 3 & 4 dont match")
  }

});











// spacing


/*
  cd Documents/Viking/JS/jq_sprint

  https://www.vikingcodeschool.com/dashboard#/falling-in-love-with-javascript/practice-with-events-and-effects

  https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation

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
    var c0 = document.getElementById("counterIA")
    c0.innerHTML = "";
  } else {
    c0.innerHTML = "length error, must be longer than 3 and shorter than 33 characters"
  }

  if (inputs[1].value.length > 3 && inputs[1].value.length < 141) {
    var c1 = document.getElementById("counterT1")
    c1.innerHTML = "";
  } else {
    c1.innerHTML = "length error, must be longer than 3 and shorter than 141 characters"
  }

  if (inputs[3].value.length > 5 && inputs[3].value.length < 17) {
    var c3 = document.getElementById("counterIB")
    c3.innerHTML = "";
  } else {
    c3.innerHTML = "length error, must be longer than 5 and shorter than 17 characters"
  }

  if (inputs[4].value.length > 5 && inputs[4].value.length < 17) {
    var c4 = document.getElementById("counterIC")
    c4.innerHTML = "";
  } else {
    c4.innerHTML = "length error, must be longer than 5 and shorter than 17 characters"
  }

  if (inputs[3].value === inputs[4].value) {
    var c2 = document.getElementById("confirm")
    c2.innerHTML = "";
  } else {
    c2.innerHTML = "match error, passwords dont match"
  }

});











// spacing

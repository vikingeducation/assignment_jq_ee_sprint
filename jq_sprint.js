
var theForm = document.getElementById("myForm");

theForm.addEventListener("input", function(action) {
  var subject = action.target;
  var characters = subject.value.length;
  subject.classList.remove("invalid");

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
    if (document.getElementsByClassName("IB")[0].value === subject.value) {
      var message = "match";
      document.getElementsByClassName("IB")[0].classList.remove("invalid");
      document.getElementById("confirm").classList.remove("error");
    } else {
      var message = "don't match";
    }
    document.getElementById("confirm").innerHTML = "passwords " + message;
  }

    counter.classList.remove("error");
    var remaining = limit - characters;
    counter.innerHTML = "characters left: " + remaining;
});

theForm.addEventListener("submit", function(pressed) {
  var inputs = document.forms[0];
  var stop = false;

  if (inputs[0].value.length < 4 || inputs[0].value.length > 32) {
    inputs[0].classList.add("invalid");
    var box = document.getElementById("counterIA");
    box.innerHTML = "Error: length less that 4 characters"
    box.classList.add("error");
    stop = true;
  }

  if (inputs[1].value.length < 4 || inputs[1].value.length > 140) {
    inputs[1].classList.add("invalid");
    var box = document.getElementById("counterT1");
    box.innerHTML = "Error: length less that 4 characters"
    box.classList.add("error");
    stop = true;
  }

  if (inputs[3].value.length < 6 || inputs[3].value.length > 16) {
    inputs[3].classList.add("invalid");
    var box = document.getElementById("counterIB");
    box.innerHTML = "Error: length less that 6 characters"
    box.classList.add("error");
    stop = true;
  }

  if (inputs[4].value.length < 6 || inputs[4].value.length > 16) {
    inputs[4].classList.add("invalid");
    var box = document.getElementById("counterIC");
    box.innerHTML = "Error: length less that 6 characters"
    box.classList.add("error");
    stop = true;
  }

  if (inputs[3].value !== inputs[4].value) {
    inputs[3].classList.add("invalid");
    inputs[4].classList.add("invalid");
    document.getElementById("confirm").classList.add("error");
    stop = true;
  }

  if (stop === true) {
    pressed.preventDefault();
  }
});

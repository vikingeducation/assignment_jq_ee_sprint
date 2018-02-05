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
    if (document.getElementsByClassName("IB")[0].value === subject.value) {
      var message = "match";
      document.getElementsByClassName("IB")[0].classList.remove("invalid");
      subject.classList.remove("invalid");
      document.getElementById("confirm").classList.remove("error");
    } else {
      var message = "don't match";
    }
    document.getElementById("confirm").innerHTML = "passwords " + message;
  }
  var remaining = limit - characters;
  counter.innerHTML = "characters left: " + remaining;
});

theForm.addEventListener("submit", function(pressed) {
  var inputs = document.forms[0];

  if (inputs[3].value !== inputs[4].value) {
    inputs[3].classList.add("invalid");
    inputs[4].classList.add("invalid");
    var c2 = document.getElementById("confirm");
    c2.classList.add("error");
    pressed.preventDefault();
  }
});

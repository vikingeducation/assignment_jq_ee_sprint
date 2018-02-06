
var theForm = document.getElementById("myForm");

theForm.addEventListener("input", function(action) {
  var subject = action.target;
  var box = document.getElementById(subject.getAttribute("fault"));

  subject.classList.remove("invalid");

  box.classList.remove("error");
  
  box.innerHTML =
    "characters left: " + (subject.getAttribute("maxy") - subject.value.length);

  if (subject.getAttribute("twin") !== null) {
    if (
      subject.value ===
      document.getElementsByClassName(subject.getAttribute("twin"))[0].value
    ) {
      var message = "match";

      document
        .getElementsByClassName(subject.getAttribute("twin"))[0]
        .classList.remove("invalid");

      document
        .getElementById(subject.getAttribute("verify"))
        .classList.remove("error");

    } else {
      var message = "don't match";
    }
    document.getElementById(subject.getAttribute("verify")).innerHTML =
      "passwords " + message;
  }
});

theForm.addEventListener("submit", function(pressed) {
  var indexy = 0;
  var inputs = document.forms[0];
  var stop = false;

  while (indexy < inputs.length) {
    if (inputs[indexy].classList.contains("cut")) {
      // ignore these elements
    } else if (
      inputs[indexy].value.length < inputs[indexy].getAttribute("miny") ||
      inputs[indexy].value.length > inputs[indexy].getAttribute("maxy")
    ) {
      var alert = document.getElementById(inputs[indexy].getAttribute("fault"));

      alert.classList.add("error");

      inputs[indexy].classList.add("invalid");

      alert.innerHTML =
        "Error: length less than " +
        inputs[indexy].getAttribute("miny") +
        " characters or more than " +
        inputs[indexy].getAttribute("maxy") +
        " characters";

      stop = true;
    }

    if (inputs[indexy].getAttribute("twin") !== null) {
      if (
        inputs[indexy].value !==
        document.getElementsByClassName(inputs[indexy].getAttribute("twin"))[0]
          .value
      ) {
        inputs[indexy].classList.add("invalid");

        document
          .getElementsByClassName(inputs[indexy].getAttribute("twin"))[0]
          .classList.add("invalid");

        document
          .getElementById(inputs[indexy].getAttribute("verify"))
          .classList.add("error");

        stop = true;
      }
    }
    indexy++;
  }

  if (stop === true) {
    pressed.preventDefault();
  }
});

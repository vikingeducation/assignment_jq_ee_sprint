
var theForm = document.getElementById("myForm");

theForm.addEventListener("input", function(action) {
  var subject = action.target;
  subject.classList.remove("invalid");
  var box = document.getElementById(subject.getAttribute("fault"));
  box.classList.remove("error");
  box.innerHTML = "characters left: " + ((subject.getAttribute("maxy")) - (subject.value.length));

  if (subject.getAttribute("twin") !== null) {
    if (subject.value === document.getElementsByClassName(subject.getAttribute("twin"))[0].value) {
      var message = "match";
      document.getElementsByClassName(subject.getAttribute("twin"))[0].classList.remove("invalid");
      document.getElementById(subject.getAttribute("verify")).classList.remove("error");
    } else {
      var message = "don't match";
    }
    document.getElementById(subject.getAttribute("verify")).innerHTML = "passwords " + message;
  }

});

theForm.addEventListener("submit", function(pressed) {
  pressed.preventDefault();
});

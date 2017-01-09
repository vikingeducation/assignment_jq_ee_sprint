
$(document).ready(function() {
  var acc = document.getElementsByClassName("dropDown");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    };
  }
});

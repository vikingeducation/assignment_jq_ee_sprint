$(document).ready(function() {

  $("#top").click(function() {
    $("#choices").slideToggle();
  });

  $(".option").click(function() {
    var text = $(this).text();
    $("#top").text(text);
    $("#choices").slideUp();
  });

});

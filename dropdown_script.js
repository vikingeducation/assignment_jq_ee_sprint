$(document).ready(function() {

  $("#display").on("click", function() {
    $("#dropdown-content").slideToggle(500);
  });

  $("li").hover(function() {
    $(this).addClass("option-active");
  }, function() {
    $(this).removeClass("option-active");
  });

  $("li").on("click", function() {
    $("#display").text($(this).text());
    $("#option-selected").val($(this).text());
    $("#dropdown-content").slideToggle(500);
  })
});

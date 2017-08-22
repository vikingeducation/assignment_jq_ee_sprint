$(document).ready(function() {

  $(".drop-bar").on("click", function() {
    $(".dropdown-content").slideToggle(500);
  });

  $(".option").on("click", function() {
    console.log("clicked on option");
    var $this = $(this);
    $this.addClass("option-selected")
        .removeClass("option");
    var $replaced;

    if ($(".drop-bar").length > 0) {
      $replaced = $(".drop-bar").first();
      $this.insertAfter($replaced);
      $replaced.insertAfter($(".option").last()).remove();
    } else {
    };
    $(".dropdown-content").slideToggle(500);
  });

  $(".option-selected").on("click", function() {
    console.log("clicked on option-selected");
    $(".dropdown-content").slideToggle(500);
  });
});

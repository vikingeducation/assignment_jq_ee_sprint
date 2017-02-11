var dropdown = {
  
  init: function() {

    $(".dropdown ul").slideUp(0);

    $(".dropdown").click( function() {
      $("ul").slideToggle(250);
    });

    $(".dropdown li").hover( function() {
      $(this).addClass("active");
      }, function() {
      $(this).removeClass("active");
    });

    $(".dropdown").hover( function () {
      $(this).css("cursor", "pointer");
    });

    $(".dropdown").on("click", "li", function(event) {
      $(".dropdown-header").html(event.target.innerText);
    });
  }

};

$(document).ready( function() {
  dropdown.init();
});

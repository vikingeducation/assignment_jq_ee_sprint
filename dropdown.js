$( document ).ready( function() {

  $( "#selected" ).on("click", function(e) {
    $( "#options" ).slideToggle();
  });

  $( "ul" ).on("click", function(e) {
    $( "#dropdown" ).val( e.target.innerHTML );
    $( "#selected" ).text( e.target.innerHTML );
  });

  $( "body" ).on("click", function(e) {
    if (e.target.id != "selected" && e.target.id != "options" ) {
      $( "#options" ).slideUp()
    }
  })

});

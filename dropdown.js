$(document).ready(function() {
  $( "#dropdown-body" ).hide();

  // handle dropdown animation
  $( "#selected" ).click(function(){
    if ( $( "#dropdown-body" ).is( ":hidden" ) ) {
      $( "#dropdown-body" ).slideDown( "slow" );
    } else {
      $( "#dropdown-body" ).slideUp( "slow" );
    }
  });

  // handle selection
  $( "#dropdown-options li" ).click(function(e) {
    $( "#dropdown-options li" ).removeClass("shade-selected");
    $obj = $(e.target);
    $("#currently-selected").text($obj.text());
    $obj.addClass("shade-selected");
    $( "#dropdown-body" ).slideUp( "slow" );
  });
});

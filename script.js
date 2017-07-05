

//function to handle the letter counter
var counterHandler = function() {



  //set event listener
  $(this).on("keyup", function( e ) {
    var $this = $( e.target );
      //try this with filter maybe
    var $counter = $( e.target ).next();

    //ADD appear on typing, hide on empty
    if ($this.val().length > 0) {
      //$counter.show();
      $counter.css("display", "inline");
    }else {
      $counter.hide();
    }
      //js seems to convert this for me, oddly enough (convert strings to nums to eval the expression)
    var remaining = Number( $this.attr( "max_characters" )) - $this.val().length;
    $counter.text(remaining);
  });
}


// execute my jquery
$(document).ready(function() {

 //ADD SOME CHARACTER COUNTERS TO THE FORM INPUTS
  var $inputs = $("input");

  //add max char counts
  var $counter = $("<p></p>", { text : "32"})
    .addClass("counter");
  $counter.insertAfter($inputs.get(0));
  $counter = $("<p></p>", { text : "140"})
    .addClass("counter");
  $counter.insertAfter($inputs.get(1));
  $counter = $("<p></p>", { text : "16"})
    .addClass("counter");
  $counter.insertAfter($inputs.get(2));
  $counter = $("<p></p>", { text : "16"})
    .addClass("counter");
  $counter.insertAfter($inputs.get(3));

    //it seems that that my styles are applied to dom object I insert with jQuery .. hmmm...


  //add max char counts
  $($inputs.get(0)).attr( {"max_characters" : "32" } );
  $($inputs.get(1)).attr( {"max_characters" : "140" } );
  $($inputs.get(2)).attr( {"max_characters" : "16" } );
  $($inputs.get(3)).attr( {"max_characters" : "16" } );

  //set up listeners
  $inputs.each( counterHandler );



})

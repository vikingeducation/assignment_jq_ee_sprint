

//function to handle the letter counter
var counterHandler = function() {

  //declare update function

  //set event listener
  $(this).on("keyup", function( e ) {
    //var $this = $(this);
    var $this = $( e.target );
      //try this with filter maybe
    //var $counter = $this.next();
    var $counter = $( e.target ).next();
    console.log( $counter );
    //console.log( $(this).next());
      //js seems to convert this for me, oddly enough (convert strings to nums to eval the expression)
    //var remaining = $this.attr("max_characters") - $this.val().length;
    var remaining = Number( $this.attr( "max_characters" )) - $this.val().length;
    console.log("remaining chars" + remaining);
    $counter.text(remaining);
  });



}


// execute my jquery
$(document).ready(function() {
  //test
  //counterHandler.call( $("#test"), "10" );

  var inputs = $("fieldset").children();
  var $inputs = $("input");

  //add max char counts
  var $counter = $("<p></p>", { text : "32"});
  $counter.insertAfter($inputs.get(0));
  $counter = $("<p></p>", { text : "140"});
  $counter.insertAfter($inputs.get(1));
  $counter = $("<p></p>", { text : "16"});
  $counter.insertAfter($inputs.get(2));
  $counter = $("<p></p>", { text : "16"});
  $counter.insertAfter($inputs.get(3));

    //it seems that that my styles are applied to dom object I insert with jQuery .. hmmm...


  //add max char counts
  $(inputs.get(0)).attr( {"max_characters" : "32" } );
  $(inputs.get(1)).attr( {"max_characters" : "140" } );
  $(inputs.get(2)).attr( {"max_characters" : "16" } );
  $(inputs.get(3)).attr( {"max_characters" : "16" } );

  //set up listeners
  inputs.each( function() {
    console.log(this);
    var max_characters = $(this).attr("max_characters");
    counterHandler(max_characters);
  })
  inputs.each( counterHandler );
})

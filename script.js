/* validations
Text field -- 4-32 characters
Text area -- 4-140 characters
Password/confirmation -- 6-16 characters
Password -- must match confirmation
*/

//function to handle the letter counter
var counterHandler = function() {
  //set event listener
  $(this).on("keyup", function( e ) {
    var $this = $( e.target );
      //try this with filter maybe
    var $counter = $( e.target ).next();
      //fix this later
    if (!$counter.hasClass('counter')){
      $counter = $counter.next();
    }

    //ADD appear on typing, hide on empty
    if ($this.val().length > 0) {
      //$counter.show();
      $counter.css("display", "inline");
    }else {
      $counter.hide();
    }

    //create password error message
      //js seems to convert this for me, oddly enough (convert strings to nums to eval the expression)
    var remaining = Number( $this.attr( "max_characters" )) - $this.val().length;
    $counter.text(remaining);
  });
}

//displays error message if passwords don't match
var password_confirmation_handler = function( e ) {
  var $first = $("#first_pass");
  var $this = $( e.target );
  if ( $first.val() == $this.val() ) {
    //make sure that error message is hidden
    var $error = $("#password_error_message");
    if ($error.length != 0) {
      $error.detach();
    }
  }else if ($this.val().length == 0){
    var $error = $("#password_error_message");
    if ($error.length != 0) {
      $error.detach();
    }
  }else {
    //display error message
    if ( $("#password_error_message").length == 0 ){
      //make an error message
      var $error = $("<p>Passwords don't match!</p>")
        .attr("id", "password_error_message");
      $error.insertAfter($this);
    }
    var $error = $("#password_error_message");
    $error.insertAfter($this);
  }
}

var verify_form = function ( e ){
  /* validations
  Text field -- 4-32 characters
  Text area -- 4-140 characters
  Password/confirmation -- 6-16 characters
  Password -- must match confirmation
  */
  /* DUMMY TEXT */
  //    BOBBBY WATSON
  var $inputs = $("input");
  var tf = false;
  var ta = false;
  var pass = false;
  var pass1 = false;
  var pass2 = false;
  var pass_match = false;
  //var pass_match = true;
  var tf_len = $( $inputs[0]).val().length;
  var ta_len = $( $inputs[1]).val().length;
  var pass1_len = $( $inputs[2]).val().length;
  var pass2_len = $( $inputs[3]).val().length;

  //generic error


  if ( $($inputs[0]).val().length >= 4 && $($inputs[0]).val().length <= 32 ) {
    //pass
    tf = true;
  }else{
    //highlight field in red
    $( $inputs[0] ).css("border-color", "red");
    //display error messages
    var $err = $("<p>4-32 characters only</p>");
    $err.insertAfter( $( $inputs[0] ) )
  }
  if( ta_len >= 4 && ta_len <= 140 ){
    ta = true;
  }else{
    $( $inputs[1] ).css("border-color", "red")
    var $err = $("<p>4-140 characters only</p>");
    $err.insertAfter( $( $inputs[1] ) )
  }
  if( pass1_len >= 6 && ta_len <= 16 ){
    pass1 = true;
  }else{
    $( $inputs[2] ).css("border-color", "red")
    var $err = $("<p>6-16 characters only</p>");
    $err.insertAfter( $( $inputs[2] ) )
  }
  if( pass2_len >= 6 && ta_len <= 16 ){
    pass2 = true;
  }else{
    $( $inputs[3] ).css("border-color", "red")
    var $err = $("<p>6-16 characters only</p>");
    $err.insertAfter( $( $inputs[3] ) )
  }
  if ( pass1 && pass2 ) {
    pass = true;
  }else{

  }

  //check that the passwords are the same
  var values = $("[type=password]").map( function() {
    return this.value;
  })
    .get();
  if ( values[0] == values[1] ){
    pass_match = true;
  }

  //success
  if (tf && ta && pass && pass_match ){
    //do nothing
    //alert("Success");
  }else{
      //failure
    //alert("FAILURE ALL THE ERRORS FOR YOU");

    //prevent submit button from working
    e.preventDefault();
    e.stopPropagation();

  }
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

  //create password error message

    //it seems that that my styles are applied to dom object I insert with jQuery .. hmmm...


  //add max char counts
  $($inputs.get(0)).attr( {"max_characters" : "32" } );
  $($inputs.get(1)).attr( {"max_characters" : "140" } );
  $($inputs.get(2)).attr( {"max_characters" : "16" } );
  $($inputs.get(3)).attr( {"max_characters" : "16" } );

  //set up listeners
  $inputs.each( counterHandler );
  //var $passwords = $("[type='password']");
  //$passwords.on("keypress", password_confirmation_handler );
  $("#confirm_pass").on("keyup", password_confirmation_handler );
  $("#submit").on("click", verify_form );

})

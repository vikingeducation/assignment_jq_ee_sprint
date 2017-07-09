
//TODO: REFACTOR

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
    alert("Success");
  }else{
      //failure
    //alert("FAILURE ALL THE ERRORS FOR YOU");

    //prevent submit button from working
    e.preventDefault();
    e.stopPropagation();

  }
}

var form_validation = function() {
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

}
var drop_down = function() {

  //make a list
  var $ul = $('<ul></ul>')
    .attr('id', 'slide');
  $.each([
    '',
    'Ravenclaw',
    'Slytherin',
    'Gryffindor',
    'Hufflepuff'
  ], function( index, element ){
    $("<li></li>")
      .text(element)
      .appendTo($ul)
    });
  $ul.children().not(":first-child").hide();
  $ul.appendTo($("body"));

  //delegate the event listener to the parent
  $ul.on("click", function( e ) {
    e.stopPropagation();
    var $hidden = $("ul li").not(":first-child").filter(":hidden");


    if ($hidden.length){
      //menu is up
      $hidden.slideDown(1000);
    }else {
      //menu is down
      $("ul li").not(":first-child").filter(":visible").slideUp(1000)
      var text = $( e.target ).text();
      $("ul :first-child")
        .hide()
        .text(text)
        .fadeIn(700)

      //as the slide up animatino finishes, set the first-child text, hide it and fade it back in
      /*setTimeout( function( e ){
        var text = $( e.target ).text();
        $("ul:first-child")
          .hide()
          .text(text)
          .fadeIn(100)
      }, 800)*/

    }
/*
    $.each( $("ul li").not(":first-child"), function(index, element) {
      console.log(element);

    })*/
  })
  $ul.children().on("mouseenter", function( e ) {
    e.stopPropagation();
    $(e.target).addClass("onhover");
  })
  $ul.children().on("mouseleave", function( e ) {
    e.stopPropagation();
    $(e.target).removeClass("onhover");
  })
}

var $drop_down_menu;
var $tag_box;


// execute my jquery
$(document).ready( function() {

  //form_validation();
  //drop_down();
  console.log(`${$drop_down_menu}:drop_down_menu`)

  //

  //make the tag box
  $("<div></div>")
    .addClass("on-mouse")
    .addClass("photo-tag-box")
    .appendTo("body")
    .hide()

  $("#img-wrapper").on("mouseenter", mouse_enter_handler)

  //this does nothing, b/c if the cursor leaves the img-wrapper,
  //it will still have the tagger box under the pointer
  //so no mouseleave event is ever fired
  $("#img-wrapper").on("mouseleave", function( e ){
    console.log("HELLO LEAVE DIV");
  })
})


//the handler to make the on-mouse class follow the mouse around
//also functions as the mouse-leave listener
var follow_mouse_handler = function( e ) {
  //console.log("HELLO MOVEMENT")
  e.stopPropagation();
  var $box = $(".on-mouse");

  //center the box
  var centerX = e.pageX - Number($box.css('width').replace("px", ""))/2;
  var centerY = e.pageY - Number($box.css('height').replace("px", ""))/2;;
  $box.css('top', centerY )
    .css('left', centerX )


  //check that mouse is still in the img ??
  if ( in_image(e) ) {
    console.log("IN IMAGE")
    //we're within the img-wrapper still
    //mouseleave events fire off all the time, ignore this one
  }else {
    console.log("OUT OF IMAGE")
    //we're breaking out of the image
    //drop the tag box
    console.log("DROPBOX")
    //$box.detach();
    $box.hide()
    $box.off();

    //add listener for entry now
    $("#img-wrapper").on("mouseenter", mouse_enter_handler)
  }
}

//this handler will show the tag box
//
// and add the click listener
var mouse_enter_handler = function ( e ){
  //$("#img-wrapper").on("mousemove", follow_mouse_handler );

  var box = $(".on-mouse").show();
  follow_mouse_handler( e );
  $(".on-mouse").on("mousemove", follow_mouse_handler );


  //Entering tag select mode
  $(".on-mouse").on("click", function( e ){
    e.stopPropagation()
    var $box = $(e.target);
    console.log("CLICKED")

    //add the drop_down
      var top = $box.offset()['top']
      var left = $box.offset()['left']

      //wrap your photo-tag-box in a div
      //make that wrapper have the same position
      var $wrapper = $("<div></div>")
      $wrapper.css('top', top)
          .css('left', left)
          .addClass('photo-tag-box-wrapper')
          .insertBefore($box)

      $box.appendTo( $wrapper )
        .css('position', 'static')

      //remove stuff, after you get the position from box (otherwise it goes to 0, 0)
      $box.off()
        .removeClass("on-mouse")

      //

    $("<ol></ol>").insertAfter($box)
      .hide()

    $.each( [
      'Harry',
      'Hermoine',
      'Ronald Reginald Wesley',
      'Ginny',
      'Luna',
      'Neville'
    ], function(index, element){
      //make it a list item and attach it to the drop down
      $("<li></li>").text(element)
        .appendTo($(".photo-tag-box-wrapper ol"))
    })
    $(".photo-tag-box-wrapper ol").slideDown(400);

    //add a click listener on body to determine if canceled or if tagged
    $("body").on("click", function( e ){
      e.stopPropagation();
      if ($(".photo-tag-box-wrapper li").is(e.target)){
        console.log("Clicked a list item")
        //clicked a list item, select it

        //slide all the list items up except the selected one
        $(".photo-tag-box-wrapper li").not( $(e.target) ).slideUp(200);

        //remove this listener
        $(this).off("click")
        console.log(this);
        console.log("e.target: " + $(e.target))

        var $wrapper = $(e.target).parents().filter(".photo-tag-box-wrapper");
        //$(e.target).parents().filter(".photo-tag-box").addClass("invisible-now");

        //what was I doing??
        //$wrapper.children().filter("div").addClass("invisible-now");
        $wrapper.children().addClass("invisible-now");
        //$(e.target)
        //$wrapper.hide();


        //IT WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //make invisible until you hover over it
        $wrapper.hover(function(e){
          console.log(this)
          console.log("ENTERING WRAPPER")
          $(this).children().removeClass("invisible-now");
        }, function(e){
          //$wrapper.hide();
          console.log(this)
          console.log("LEAVING WRAPPER")
          $(this).children().addClass("invisible-now");
        })
        //remove code later
        //$( e.target ).hide();

      }else {
        console.log("You clicked somewhere else!!!")
        //clicked somewhere else, cancel the tag mode

        //slide the drop-down up
        $(".photo-tag-box-wrapper ol").slideUp(200);

        //remove this listener
        $(this).off("click");

        //restart the tagging mode

      }
    })
  })
  console.log("HELLO ENTER DIV")

  //remove this listener to avoid re-entry events
  $("#img-wrapper").off("mouseenter");
}


//helper function
//take a mouse event and find out if the mouse is still within the border of the image
var in_image = function( e ){
  //check that mouse is still in the img ??
    //find the x y for the event
    var x = e.pageX;
    var y = e.pageY;
    //check that against the x y of the img-wrapper
    var img_position = $("#img-wrapper").offset();
    var left = img_position.left;
    var right = img_position.left + Number($("#img-wrapper").css('width').replace("px", ""))
    var top = img_position.top;
    var bottom = img_position.top + Number($("#img-wrapper").css('height').replace("px", ""))
    //console.log( `${left} : left, ${right}: right; ${x}:x`)
    if ( x > right || x < left ){
      //we're breaking out of the image
      return false;
    }else if ( y > bottom || y < top ){
      //we're breaking out of the image
      return false;
    }else {
      //we're within the img-wrapper still
      return true;
    }
}








//

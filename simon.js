function Simon(){
  var $red = $("#red");
  var $green = $("#green");
  var $blue = $("#blue");
  var $yellow = $("#yellow");
  this.colors = [$green, $red, $yellow, $blue];
  this.order = [];
  this.user_input = [];
  this.state = null;

  this.say_hello = function(){
    console.log("Hello World!")
  }

  //have the body send us click inputs
  $("body").on("click", function(e){

    //make sure they click on a Simon box first
    if ( $(".box").filter( $(e.target) ).length > 0  ){
      //send the event to my input handler
      window.simon.user_clicked(e);
    }else{
      //the user didn't click a box so ignore it
    }

  })

  //my input handler
  this.user_clicked = function(e){
    //ignore input until the input phase
    if ( this.state == "Simon's turn"){
      //do nothing
    }else{
      //check for correct input
      this.user_input.push($(e.target))
      this.check_input()
    }
  }
  this.check_input = function(){
    //check for incorrect answers
    for (var i = 0; i < this.user_input.length; i++) {
      if ( this.order[i].get(0) !== this.user_input[i].get(0) ) {
        window.alert( "INCORRECT \nTryAgain!")
        //play again
        this.restart()
        return;
      }
    }
    //if they're all correct
    //and the user has finished the sequence then start the next round
    if ( this.order.length == this.user_input.length){
      this.state = "Simon's turn";
      this.user_input = [];
      this.play_sequence()
    }

  }
  this.restart = function() {
    //clear memory
    this.order = []
    this.user_input = []
    this.state = "Simon's turn"

    //start again
    this.play_sequence()

  }

  this.play_sequence = function() {
    //add one color to the end of the current sequence
    this.order.push( this.choose_color() )

    //set the delay betwen Simon's flicker sequence and accepting input
    this.delay = this.order.length * 800;
    //play the current sequence
    $.each( this.order, function( index, element){
      setTimeout( function(){
        window.simon.flicker(element, 1)
      }, 800 * index )
    })
    setTimeout( function() {
      console.log("ITS YOUR TURN")
      window.simon.state ="input"
    }, window.simon.delay)
  }

  //choose next color to select
  this.choose_color = function(){
    var random_num = Math.floor(Math.random() * 4);
    return this.colors[random_num]
  }

  this.flicker = function( $obj, times){
    for( times; times > 0; times--){
      $obj.fadeOut(200).fadeIn(200);
    }
  }

  //
  this.state = "Simon's turn"

}

var simon;

$(document).ready( function() {
  //begin the game 
  simon = new Simon();
  simon.play_sequence()
})

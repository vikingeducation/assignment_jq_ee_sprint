//TODO: ///make duck fly
//TODO: add new ducks after they die
//TODO: MAKE ducks fall
//TODO: make ducks remove themselves from the duck array somehow


function DuckHunt() {
  this.ducks = [];
  this.ammo = 4;
  this.score = 0;
  this.round = 1;

  this.$ammo = $("#ammo").children().not("h5")
  this.$round = $(".center").children().last();
  this.$score = $("#scoreboard h2");

  //make duck
  this.make_duck = function() {
    var duck = new Duck();
    this.ducks.push(duck);
    $("body").append(duck.$me)
  }
  this.make_duck()
  //$("body").append(this.ducks[0].$me)


//functions that update the screen
  this.render_ammo = function(){
    //if too many detach
    this.$ammo = $("#ammo").children().filter("img");
      //console.log(this.$ammo)
    if ( this.$ammo.length > this.ammo ) {
      //assume you only need to detach one
      this.$ammo.eq(0).detach();
    }else {
      //assume you only need to add one
      var $bullet = $("<img src='assets/images/bullet.png'>");
      $("#ammo").append($bullet);
    }
  }
  this.render_ammo()
  this.render_score = function(){
    this.$score.text(`Score: ${this.score}`);
  }
  this.render_score()
  this.render_round = function() {
    this.$round.text(`Round: ${this.round}`);
  }
  this.render_round()

/*
  //note: didn't know about the css crosshair cursor when I wrote this part
    //so I've decided to just use that for now
    //but I'm leaving this code in case I want to do a custom cursor later
  //make hover cursor
    var $cursor = $("<img src='assets/images/cross_hair.jpg'>").addClass('on-mouse').addClass('cursor')
    $cursor.appendTo( $("body") );

  //make it follow the mouse
    $("body").on("mousemove", follow_mouse_handler );
*/
  //takes an event arg e
  this.user_shot = function(e) {
    var was_duck = null;
    if ( $(e.target).hasClass('duck') ){
      was_duck = true;
    }else {
      was_duck = false;
    }

    if (was_duck){
      //find
      var dead_duck_index = i;
      for ( var i = 0; i < this.ducks.length; i++ ) {
        if ( e.target == this.ducks[i].$me.get(0) ){
          this.kill(i);
          dead_duck_index = i;
        }
      }
      this.score++;
      this.render_score();

    }
    this.ammo--;
    this.render_ammo();
    if ( this.ammo == 0){
      //end the round
      window.alert("Round Over!")
    }
  }

  //the dead duck handler function
  this.kill = function( index ){
    this.ducks[index].state = "dead"
    //make it drop down and then detach
    this.score++;
    this.render_score();
    console.log( `dead duck = ${this.ducks[index]}` );
  }

  //on click with the body
  $("body").on("click", function( e ){
    //make an explosion
    var $explosion = $("<img src='assets/images/explosion.png'>")
    $explosion.addClass('fx');
    $explosion.hide()
    $("body").append( $explosion );
    //console.log( $explosion.width() )

    //place it at the cursor's location
    var centerX = e.pageX - $explosion.width() /2;
    var centerY = e.pageY - $explosion.height() /2;
    $explosion.css('top', centerY )
      .css('left', centerX )
    //make it disappear in a bit and then detach itself
    $explosion.fadeIn(30).fadeOut(200, function() {
      //console.log("completed fade out");
      $(this).detach();
    })

    //let the duck_hunt class handle all the heavy lifting
    window.duck_hunt.user_shot( e.target )

    //check that e.pageX & e.pageY is within the duck

      //if yes then
            //add one point to score
            //make duck fall
            //add a new duck
      //else
            //nothing???
      //either way take a bullet out
        //check that bullets != 0
          //if bullets == 0 then start new round
          //else continue
  })





    //set

}

function Duck() {
  this.$me = $("<img src='assets/images/duck.png'>")
  this.$me.addClass("duck")
  this.state = "alive"
  //var $duck = $("<img src='assets/images/duck.png'>")

  //set coordinates

  //add to screen
}
var follow_mouse_handler = function( e ) {
  console.log("HELLO MOVEMENT")
  e.stopPropagation();
  var $cursor = $(".on-mouse");

  //center the box
  var centerX = e.pageX - $cursor.width() /2;
  var centerY = e.pageY - $cursor.height()/2;
  $cursor.css('top', centerY )
    .css('left', centerX )
}

var duck_hunt;

$(document).ready( function() {
  console.log("HELLO")
  //start game
  duck_hunt = new DuckHunt();

  //var $ammo = $("#ammo").children().first()

  //var $round = $(".center").children().last()
  //$round.text('Round: 1')

  //make duck
  //var $duck = $("<img src='assets/images/duck.png'>")
  //$("body").append($duck)

})

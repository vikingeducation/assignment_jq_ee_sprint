//TODO: ///make duck fly
//TODO: add new ducks after they die
//TODO: MAKE ducks fall
//TODO: make ducks remove themselves from the duck array somehow

var fps = 40;

function DuckHunt() {
  this.ducks = [];
  this.ammo = 4;
  this.score = 0;
  this.round = 1;

  this.$ammo = $("#ammo").children().not("h5")
  this.$round = $(".center").children().last();
  this.$score = $("#scoreboard h2");


  var right = window.innerWidth;
  var bottom = window.innerHeight;

  this.destinations = [
    [3000, 1000],
    [1000, 100],
    [-100, -100]
  ]
  this.start_locations = [
    [-10 , -10],
    [-10, 100],
    [right + 200, bottom / 3]
  ]

  //for testing purposes
  this.fps = fps;
  //this.fps = 60;

  //make duck
  this.make_duck = function() {
    var i = Math.floor(Math.random() * this.destinations.length);

    //position the duck somewhere interesting
    var position = this.start_locations[i]
    var duck = new Duck( position );
    this.ducks.push(duck);




    //give it an interesting destination
    duck.destination = this.destinations[i]

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
      console.log("user shot duck")
    }else {
      was_duck = false;
      console.log("user shot nothing")
      console.log( $(e.target) )
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

      //make a new duck
      this.make_duck()

    }
    this.ammo--;
    this.render_ammo();
    if ( this.ammo == 0){
      //end the round
      window.alert("Round Over")
    }
  }

  //the dead duck handler function
  this.kill = function( index ){
    this.ducks[index].state = "dead"
    //make it drop down and then detach
    this.ducks[index].fall();
    //console.log( `dead duck = ${this.ducks[index]}` );
  }


  //shooting functionality
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
    window.duck_hunt.user_shot( e )

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

  //movement
  //setTimeout()
  this.game = function() {
    //console.log("HELLOOOOOOOOOOO")
    var _this = duck_hunt;
    //move ducks
    for( var i = 0; i < _this.ducks.length; i++){
      _this.ducks[i].move();
    }
  }
  //setInterval( this.game, 1000 / this.fps )
  //setInterval( this.game, 1000 / this.fps )
  setInterval( this.game, 1000/this.fps)

  //tutorial code
  /*
  $(".duck").attr("id", "animate")
  myMove()
  */



    //set

}

function Duck(position) {
  this.$me = $("<img src='assets/images/duck.png'>")
  this.$me.addClass("duck")
  this.state = "alive"
    //set the speed to px/sec
  var px_per_sec = 120;
  this.speed = px_per_sec / window.fps
  this.vx;
  this.vy;
    // this.destination = [x,y]
  this.destination = [1000, 200];
  //this.x and this.y is the top left point of the duck
  this.x = position[0];
  this.y = position[1];

  this.move = function(){
    //this will update my x and y as well
    this.set_velocity();
    this.x += this.vx;
    this.y += this.vy;
    this.render();
  }
  this.fall = function() {
    this.destination[1] = window.innerHeight - 100;
    this.destination[0] = this.getx();
    this.$me.addClass('dead')
  }

  //TODO: consider adding the

  this.set_velocity = function(){
    this.x = this.getx();
    this.y = this.gety();
    var deltax = Math.abs(this.destination[0] - this.x);
    var deltay = Math.abs(this.destination[1] - this.y);
    if (deltax < 2){
      this.x = this.destination[0];
      this.vx = 0;
    }
    if (deltay < 2) {
      this.y = this.destination[1];
      this.vy = 0;
    }

    if ( this.x > this.destination[0] ){
      this.vx = -this.speed;
    }else if ( this.x < this.destination[0] ){
      this.vx = this.speed;
    }else {
      this.vx = 0;
    }
    if ( this.y > this.destination[1] ){
      this.vy = -this.speed;
    }else if ( this.y < this.destination[1] ){
      this.vy = this.speed;
    }else{
      this.vy = 0;
    }
  }

  this.getx = function(){
    //var width = this.$me.eq(0).width();
    //this.x = parseFloat(this.$me.css('left')) + width / 2;
    this.x = parseFloat(this.$me.css('left'))
    return this.x;
  }
  this.gety = function(){
    //var height = this.$me.eq(0).height();
    //this.y = parseFloat(this.$me.css('top')) + height / 2;
    this.y = parseFloat(this.$me.css('top'))
    return this.y;
  }
  this.render = function() {
    //console.log( this.$me.css('top'))
    //console.log( this.$me.css('left'))
    this.$me.css( 'top', this.y );
    this.$me.css( 'left', this.x );
  }
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

  //setInterval( window.duck_hunt.game, 1000 / 20 )
})

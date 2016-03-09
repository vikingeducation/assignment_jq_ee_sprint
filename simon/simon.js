function Simon(element) {
  this.buttons = $(element).find('.btn')

    var self = this;

  this.pattern = [];
  this.addToPattern = function() {
    this.pattern.push(Math.floor(Math.random()*4));
  }

  this.audioFiles = ['meow.mp3','meow3.mp3','meow4.mp3','meow5.mp3','meow6.mp3']
  this.catSounds = []

  for (var i = 0; i < 4; ++i) {
    this.catSounds.push(new Audio(this.audioFiles[i]));
  }

  this.position = 0;

  this.checkGuess = function(guess) {
    var correctAnswer = this.pattern[this.position];
    if (guess == correctAnswer) {
      this.position += 1;
      if (this.position == this.pattern.length) {
        this.position == 0;
        this.addToPattern();
        this.playPattern();
      }
    } else {
      console.log("wrong")
      this.activateButton(guess);
      this.reset();
    }
  }

  this.buttons.click(function() {
    var id = $(this).data('id');
    self.checkGuess(id);
  })

  this.playPattern = function() {
    var time = 0;
    var active, current_button, oldColor;
    for (var j = 0; j < self.pattern.length; ++j) {
      active = self.pattern[j];
      setTimeout(function() {self.activateButton(active)}, time);
      time += 500;
    }
  }

  this.activateButton = function(active){

    current_button = $(self.buttons[active]);
    oldColor = current_button.css('borderColor');

    self.catSounds[active].currentTime = 0;
    self.catSounds[active].play();
    current_button.animate({
      borderColor: 'red'
    }).animate({
      borderColor: oldColor
    });
  }


  this.reset = function() {
    this.pattern = [];
  }

  this.start = function() {
    this.reset();
    this.addToPattern();
    this.playPattern();
  }
}



$(document).ready(function() {

  var simon = new Simon('.simon')

    $('.play').click(function() {
      simon.start();
    })


});

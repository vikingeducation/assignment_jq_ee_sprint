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
      this.addToPattern();
      this.playPattern();
      this.position += 1;
      if (this.position == this.pattern.length) {
        this.position == 0;
      }
    } else {
      alert('wrong')
        this.reset();
    }
  }

  this.buttons.click(function() {
    var id = $(this).data('id');
    self.checkGuess(id);
  })

  this.playPattern = function() {
    var time = 0;
    for (var i = 0; i < this.pattern.length; ++i) {
      var active = this.pattern[i]
      var current_button = $(this.buttons[active]);
      var oldColor = current_button.css('borderColor');
      setTimeout(function() {
        self.catSounds[active].currentTime = 0;
        self.catSounds[active].play();
        current_button.animate({
          borderColor: 'red'
        }).animate({
          borderColor: oldColor
        });
      }, time);
      time += 500;
    }
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

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
      this.activateButton(guess, 0, 'green');
      this.position += 1;
      if (this.position == this.pattern.length) {
        this.correctAnimation();
        this.position = 0;
        this.addToPattern();
        this.updateCounter();
        setTimeout(function() {
          self.playPattern();
        }, 1500);
      }
    } else {
      this.activateButton(guess, 0, 'red');
      this.incorrectAnimation();
      console.log("wrong");
      this.reset();
    }
  }

  this.updateCounter = function() {
    $('#counter').html(this.pattern.length)
  }

  this.buttons.click(function() {
    console.log(self.position, self.pattern);
    var id = $(this).data('id');
    self.checkGuess(id);
  })

  this.correctAnimation = function() {
    $("#counter").animate({
      color: 'lime'
    }).animate({
      color: 'black'
    })
  }

  this.incorrectAnimation = function() {
    $("#counter").animate({
      color: 'red'
    }).animate({
      color: 'black'
    })
  }

  this.playPattern = function() {
    var time = 0;
    var active, current_button, oldColor;
    for (var j = 0; j < self.pattern.length; ++j) {
      active = self.pattern[j];
      self.activateButton(active, time);
      time += 1500;
    }
  }

  this.activateButton = function(active, time, color){
    if (!time) {
      time = 0;
    }
    if (!color) {
      color = 'purple';
    }
    setTimeout(function() {
      current_button = $(self.buttons[active]);

      self.catSounds[active].currentTime = 0;
      self.catSounds[active].play();
      current_button.animate({
        borderColor: color
      }).animate({
        borderColor: '#FAA'
      });
    }, time);
  }


  this.reset = function() {
    this.pattern = [];
    this.updateCounter();
  }

  this.start = function() {
    this.reset();
    this.addToPattern();
    this.updateCounter();
    this.playPattern();
  }
  }



  $(document).ready(function() {

    var simon = new Simon('.simon')

      $('.play').click(function() {
        simon.start();
      })


  });

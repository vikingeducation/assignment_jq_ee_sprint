function Simon(element) {

  var self = this;

  this.buttons = $(element).find('.btn')


  this.interval = 0;
  this.startTimer = function() {
    self.stopTimer();
    self.currentTime = 5;
    $('.timer').text(self.currentTime + " sec");

    self.interval = setInterval(function() {
      if (self.currentTime > 0) {
      self.currentTime -= 1;
      $('.timer').text(self.currentTime + " sec");
      } else {
        $('.timer').text("Time's up, you lose!");
      }
    }, 1000)
  }

  this.stopTimer = function() {
    clearInterval(self.interval);
  }

  // generate random kitty
  this.pattern = [];
  this.addToPattern = function() {
    this.pattern.push(Math.floor(Math.random()*4));
  }


  // create cat sounds
  this.audioFiles = ['meow.mp3','hello.m4a','meow4.mp3','meow5.mp3','meow6.mp3']
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
        $('.timer').text("Correct! Watch the new pattern.")
        self.stopTimer();
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

  // event listener for clicks
  this.buttons.click(function() {
    console.log(self.position, self.pattern);
    var id = $(this).data('id');
    self.startTimer();
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
    setTimeout(self.startTimer, time);
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
      self.catSounds[active].volume = 0.4;
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
    $('.timer').text("Watch the pattern, click to replicate!");
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

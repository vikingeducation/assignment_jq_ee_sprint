'use strict';

let clickHandler = {
  init: function() {
    $('#start-button').on('click', clickHandler.startGame);
    $('.game-button').on('click', clickHandler.handleInput);
    clickHandler.resetGame();
    clickHandler.status.fail = true;
  },

  getId: {1: "one", 2: "two", 3: "three", 4: "four"},
  getNum: {"one": 1, "two": 2, "three": 3, "four": 4},

  resetGame: function() {
    clickHandler.status = {
      "round": 1,
      "timeOn": 700,
      "timeBetween": 1400,
      "buttons": [],
      "multiplier": .9,
      "fail": false,
      "testing": false,
      "countdown": false,
    }
  },

  randomButton: function() {
    return Math.floor(
      Math.random() * 4
    ) + 1
  },

  displayButton: function(button) {
    let selector = "#" + clickHandler.getId[button];
    let $selected = $(selector);
    $selected.addClass('hover')
    setTimeout(function(){
      $selected.removeClass('hover');
    }, clickHandler.status.timeOn)
  },

  displayButtons: function(numberLeft) {
    if (numberLeft) {
      // if there are still buttons to press this round

      // display one
      let button = clickHandler.randomButton();
      clickHandler.status.buttons.push(button);
      clickHandler.displayButton(button);

      // recurse
      setTimeout(function() {
        clickHandler.displayButtons(numberLeft - 1) 
      }, clickHandler.status.timeBetween);
    } else {
      // round displayed, test
      clickHandler.testUser();
    }
  },

  displayMessage: function(message) {
    $('h2').text(message);
  },

  startRound: function(round, called) {
    // perform some setup, then one second delay before starting
    if (called === undefined) {

      // cancel residual countdown
      clearTimeout(clickHandler.status.countdown);
      clickHandler.status.countdown = false;

      // notify user
      clickHandler.displayMessage('Watch!')

      // wait one second
      setTimeout(function() {
        clickHandler.startRound(round, true)
      }, 1000);
    } else {

      // start round
      clickHandler.displayButtons(round)
    }
  },

  testUser: function() {
    // enable the test
    clickHandler.status.testing = true;
    // notify user
    clickHandler.displayMessage('Your Turn:');
    // start test countdown
    clickHandler.status.countdown = setTimeout(clickHandler.failTest, 5000);
  },

  cancelCountdown: function() {

  },

  failTest: function() {
    // notify user
    clickHandler.displayMessage('Game over... Try again!');
    // set status
    clickHandler.status.fail = true;
    clickHandler.status.testing = false;
  },

  passTest: function() {
    // notify user
    clickHandler.displayMessage(
      'Round ' + clickHandler.status.round + ' complete!');
    // reset and launch next round
    clickHandler.status.timeOn *= clickHandler.status.multiplier;
    clickHandler.status.timeBetween *= clickHandler.status.multiplier; 
    clickHandler.status.round += 1;
    clickHandler.status.testing = false;
    clickHandler.startRound(clickHandler.status.round);
  },

  handleInput: function(event) {
    if (clickHandler.status.testing) {
      let $pressed = $(event.target);
      let id = $pressed.attr('id');
      let button = clickHandler.getNum[id];
      if (button === clickHandler.status.buttons[0]) {

        // they hit the right button, remove it
        clickHandler.status.buttons.shift()
        if (!clickHandler.status.buttons.length) {

          // round completed
          clickHandler.passTest();
        }
      } else {

        // fail! they hit the wrong button
        clickHandler.failTest();
      }
    }
  },

  startGame: function(event) {
    if (clickHandler.status.fail) {
      clickHandler.resetGame()
      clickHandler.startRound(1);
    }
  },

}




$ (
  function() {
    clickHandler.init();
  }
)

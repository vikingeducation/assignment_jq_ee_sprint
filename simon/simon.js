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
      "multiplier": .8,
      "fail": false,
      "testing": false,
    }
  },

  randomButton: function() {
    return Math.floor(
      Math.random() * 4
    ) + 1
  },

  displayButton: function(button) {
    let selector = "#" + clickHandler.getId[button];
    console.log(selector)
    let $selected = $(selector);
    $selected.addClass('hover')
    setTimeout(function(){
      $selected.removeClass('hover');
    }, clickHandler.status.timeOn)
  },

  startGame: function(event) {
    console.log('start')
    if (clickHandler.status.fail) {
      clickHandler.resetGame()
      clickHandler.displayButtons(1);
    }
  },

  displayButtons: function(numberLeft) {
    if (numberLeft) {
      // if there are still buttons to press this round

      // display one
      console.log('displaying')
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

  testUser: function() {
    console.log(clickHandler.status.buttons)
    // set testing true
    clickHandler.status.testing = true;
    // notify user
    console.log('enter your answers');
    // start countdown > callback
    setTimeout(clickHandler.failTest, 5000);
  },

  failTest: function() {
    // notify user
        console.log('fail')
        // set status
    clickHandler.status.fail = true;
    clickHandler.status.testing = false;
  },

  passTest: function() {
    // notify user
    console.log('next round')
    // reset and launch next round
    clickHandler.status.timeOn *= clickHandler.status.multiplier;
    clickHandler.status.timeBetween *= clickHandler.status.multiplier; 
    clickHandler.status.round += 1;
    clickHandler.status.testing = false;
    clickHandler.displayButtons(clickHandler.status.round);
  },

  handleInput: function(event) {
    if (clickHandler.status.testing) {
      let $pressed = $(event.target);
      let id = $pressed.attr('id');
      let button = clickHandler.getNum[id];
      if (button === clickHandler.status.buttons[0]) {

        // they hit the right button, remove it
        console.log('correct')
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
  }

}




$ (
  function() {
    clickHandler.init();
  }
)

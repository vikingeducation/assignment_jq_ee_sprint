function Simon(element) {
  this.buttons = $(element).find('.btn')

  this.pattern = [];
  this.addToPattern = function() {
    this.pattern.push(Math.floor(Math.random()*4));
  }

  this.position = 0;
  this.checkGuess = function(guess) {
    var correctAnswer = this.pattern[this.position];
    return (guess == correctAnswer);
  }
}



$(document).ready(function() {

  var simon = new Simon('.simon')

  $('.btn').click(function() {
    simon.checkGuess($(this).data("id"))
  })









});
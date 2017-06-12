const displayRemaining = function(elem, initial){
  console.log(elem);
  var node = $(`${elem} input`);
  console.log(node);
  $(`${elem} p`).remove();
  var num = getLength($(`${elem} input`));
  if (num > 0){
    var input = initial - num
    var text = `${input} characters remaining`;
    createDiv(elem, text)
  }

}
const getLength = function(element){
  return $(element)[0].value.length
}

const createDiv = function(parent, input){
  $(parent).append(`<p>${input}</p>`)
}


$(document).ready(function(){
  $('.text').keydown(function(){
    displayRemaining('#text', 32)
  })
  $('.textarea').keydown(function(){
    displayRemaining('#textarea', 140)
  })
  $('.password').keydown(function(){
    displayRemaining('#password', 16)
  })
  $('.confirm').keydown(function(){
    displayRemaining('#confirm', 16)
  })



})

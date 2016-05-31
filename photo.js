"use strict;"

var PHOTO = {};

PHOTO.PhotoModule = (function(){

  function init(){
    _setHoverListener();
  }

  function _setHoverListener(){
    $('.tag-image-container').hover(_hoverIn, _hoverOut);
  }

  function _hoverIn(event){
    // Create the tag div
    $taggerBox = $('<div></div>')
      .attr('class', 'tagger-box');

    // Add the tag div to the DOM
    $('.tag-image-container').prepend($taggerBox);

    // Set the mouse listener to move the tag box
    $('#photo').mousemove(_setTagPosition);
  }

  function _hoverOut(event){
    $('.tagger-box').remove();
  }

  function _setTagPosition(event){
    $('.tagger-box')
      .offset({
        top: event.pageY - 35,
        left: event.pageX - 35
      });
  }

  return {
    init: init
  }
})();

$(document).ready(function(){
  PHOTO.PhotoModule.init();
});
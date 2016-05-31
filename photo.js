"use strict;"

var PHOTO = {};

PHOTO.PhotoModule = (function(){

  var _names = ['Giorgos', 'Dimitris', 'Eleftherios', 'Spiros'];

  function init(){
    _setHoverListener();
  }

  function _setHoverListener(){
    $('.tag-image-container').hover(_hoverIn, _hoverOut);
  }

  function _hoverIn(event){
    // Create the tag div
    var $taggerBox = $('<div class="box"></div>')
      .addClass('tagger');

    // Add the tag div to the DOM
    $('.tag-image-container').prepend($taggerBox);

    // Set listeners
    $('#photo').mousemove(_setTagPosition);
    $('.tagger').click(_setTag);
  }

  function _hoverOut(event){
    $('.tagger').remove();
  }

  function _setTagPosition(event){
    $('.tagger')
      .offset({
        top: event.pageY - 35,
        left: event.pageX - 35
      });
  }

  function _setTag(event){
    // Remove mouse and click listeners
    $('#photo').off("mousemove");
    $('.tagger').off("click");

    var $dropdown = _getNameDropdown();

    var $tagger = $('.tagger')

    $tagger
      .addClass('tagging')
      .removeClass('tagger')
      .append($dropdown);

    var top = $tagger.offset().top + 74;
    var left = $tagger.offset().left;

    $dropdown
      .offset({
        top: top,
        left: left
      })
      .slideDown(350);

    $('.name-dropdown ul li').click(_setTagName);
  }

  function _setTagName(event){
    var name = $(event.target).text();
    console.log(name);
  }

  function _getNameDropdown(){
    $list = $('<ul></ul>');

    _names.forEach(function(name){
      var $name = $('<li></li>').text(name);
      $list.append($name);
    })

    $outerDiv = $('<div></div>')
      .attr('class', 'name-dropdown')
      .html($list);

    return $outerDiv;
  }

  return {
    init: init
  }
})();

$(document).ready(function(){
  PHOTO.PhotoModule.init();
});
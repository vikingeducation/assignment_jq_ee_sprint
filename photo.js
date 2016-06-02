"use strict;"

var PHOTO = {};

PHOTO.PhotoModule = (function(){

  var _names = ['Giorgos', 'Dimitris', 'Eleftherios', 'Spiros'];

  function init(){
    _setHoverListener();
  }

  function _setHoverListener(){
    $('.tag-image-container').hover(_addTaggerBox, _removeTaggerBox);
  }

  function _addTaggerBox(){
    // Create the tag div
    var $taggerBox = $('<div class="box"></div>')
      .addClass('tagger');

    // Add the tag div to the DOM
    $('.tag-image-container').prepend($taggerBox);

    // Set listeners
    $('.tag-image-container').mousemove(_setTagPosition);
    $('.tagger').click(_setTag);
  }

  function _removeTaggerBox(){
    $('.tagger').remove();
  }

  function _removeTaggingBox(){
    $('.tagging').remove();
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
    $('.tag-image-container').off("mousemove");
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

    $('.name-dropdown').on('click', 'li', _setTagName);
    $('#photo').click(_cancelTagging);
  }

  function _setTagName(event){
    var name = $(event.target).text();
    var $name = $('<div></div>')
      .attr('class', 'name')
      .text(name);

    $('.name-dropdown').slideUp(350);

    $('.tagging')
      .addClass('tagged')
      .removeClass('tagging')
      .html($name);
  }

  function _cancelTagging(){
    $('.name-dropdown').slideUp(350);

    $('.tagging')
      .addClass('tagger')
      .removeClass('tagging');

    // Reset listeners
    $('.tag-image-container').mousemove(_setTagPosition);
    $('.tagger').click(_setTag);
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
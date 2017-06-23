function moveTargetBox(event) {
  $('.tagger').css({
    left: event.pageX - 37.5,
    top: event.pageY - 37.5
  });
}

function highlightListItem(event) {
  $(event.currentTarget).addClass('itemHighlight');
}

function unhighlightListItem(event) {
    $(event.currentTarget).removeClass('itemHighlight');
}

function selectListItem(event) {
  event.stopPropagation();

  // show selected item and select it by adding color
  var $selectedListItem = $(event.currentTarget);
  $selectedListItem.show();
  $selectedListItem.removeClass('itemHighlight').removeClass('nameTagListItem').addClass('itemSelected');

  // remove all unselected list items
  $('.nameTagListItem').remove();

  $('.tagger').addClass('taggedBox').removeClass('tagger');
  $('.nameTagList').addClass('listSelected').removeClass('nameTagList');

  var $photoContainer = $('#photoContainer');
  $photoContainer.off('click', cancelTag);
  createTargetBox(event);
  enableTagBehavior();
}

function tagArea(event) {
  disableTagBehavior();

  $('#photoContainer').click(cancelTag);

  var $dropdown = $('<ul>')
    .addClass('nameTagList')
    .css({
      left: event.pageX - 37.5,
      top: event.pageY + 36
    });

  var sampleNames = ['Joseph', 'Jerry', 'John', 'Jim', 'Jill'];

  for(var i=0; i <= sampleNames.length-1; i++)
  {
    var $listItem = $('<li>')
      .addClass('nameTagListItem')
      .hover(highlightListItem, unhighlightListItem)
      .html(sampleNames[i])
      .click(selectListItem);
    $dropdown.append($listItem);
  }

  $(event.target.parentNode).append($dropdown);
}

function disableTagBehavior() {
  var $photoContainer = $('#photoContainer');

  $photoContainer.off('mousemove', moveTargetBox);
  $photoContainer.off('mouseenter', createTargetBox);
  $photoContainer.off('mouseleave', removeTargetBox);
  $photoContainer.off('click', tagArea);
}

function enableTagBehavior() {
  var $photoContainer = $('#photoContainer');

  $photoContainer.mouseenter(createTargetBox);
  $photoContainer.mouseleave(removeTargetBox);
  $photoContainer.click(tagArea);
  $photoContainer.off('click', cancelTag);
}

function cancelTag(event) {
  removeTargetBox();
  removeNameTagList();
  createTargetBox(event);
  enableTagBehavior();
}

function createTargetBox(event) {
  var $div = $('<div>')
    .css({
      left: event.pageX,
      top: event.pageY
    })
    .addClass('tagger');

  var $photoContainer = $('#photoContainer');
  $photoContainer.append($div);
  $photoContainer.mousemove(moveTargetBox);
}

function removeTargetBox() {
  $('.tagger').remove();
}

function removeNameTagList() {
  $('.nameTagList').remove();
}

var photoTag = {
  init: function() {

    var $photoContainer = $('#photoContainer');

    $photoContainer.mouseenter(createTargetBox);
    $photoContainer.mouseleave(removeTargetBox);
    $photoContainer.click(tagArea);
  }
};

$(document).ready(photoTag.init);

function toggleList() {
  $('.not-selected').toggle();
}

function showColorForListItem(event) {
  var colorClass = event.target.attributes['name'].value + '-show';
  $(event.currentTarget).addClass(colorClass);
}

function hideColorForListItem(event) {
  var colorClass = event.target.attributes['name'].value + '-show';
  if(!($(event.currentTarget).hasClass('selected'))) {
    $(event.currentTarget).removeClass(colorClass);
  }
}

function hideColor($selectedColor) {
  if($selectedColor.length > 0) {
    var colorClass = $selectedColor[0].id + '-show';
    $selectedColor.removeClass(colorClass);
  }
}

function selectColor(event) {
  // remove old selected color if applicable
  var $selectedColor = $('#colorList').children('.selected');
  $selectedColor.addClass('not-selected');
  hideColor($selectedColor);
  $selectedColor.removeClass('selected');

  // select new clicked color
  $(event.currentTarget).addClass('selected');
  $(event.currentTarget).removeClass('not-selected');
  showColorForListItem(event);
}

var dropdown = {
  init: function() {

    var $redColor = $('#red');
    var $greenColor = $('#green');
    var $blueColor = $('#blue');
    var $purpleColor = $('#purple');

    $('#colorDropdown').click(toggleList);
    $redColor.hover(showColorForListItem, hideColorForListItem);
    $redColor.click(selectColor);
    $greenColor.hover(showColorForListItem, hideColorForListItem);
    $greenColor.click(selectColor);
    $blueColor.hover(showColorForListItem, hideColorForListItem);
    $blueColor.click(selectColor);
    $purpleColor.hover(showColorForListItem, hideColorForListItem);
    $purpleColor.click(selectColor);
  }
};

$(document).ready(dropdown.init);
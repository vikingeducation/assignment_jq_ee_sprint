'use strict';

var mouseHandler = {
  init: function() {
    $('.taggable img').on( {
      'mouseenter': mouseHandler.showHover,
    });
    $('body').on( {
      'mousemove': mouseHandler.updateDisplay,
      'mouseleave': mouseHandler.hideHover,
      'click': mouseHandler.handleClick
    });

    mouseHandler.locateImage();
    mouseHandler.buildSelector();
  },

  locateImage: function() {
    let $target = $('.taggable img')
    let offsets = $target.offset();
    let height = $target.height();
    let width = $target.width();
    mouseHandler.imgTop = offsets.top;
    mouseHandler.imgLeft = offsets.left;
    mouseHandler.imgBottom = offsets.top + height;
    mouseHandler.imgRight = offsets.left + width;
    mouseHandler.hideList = true;
  },

  buildSelector: function() {
    // Hover box
    let $selectionBox = $('<div>')
      .addClass('selection-box');
    
    // Name list
    let $selectionList = $('<ul>')
      .addClass('name-list')
      .addClass('dropdown');

    let names = ['Sally', 'Sue', 'Sharon', 'Stephanie'];
    $.each(names, function(i, name) {
      $selectionList.append(
        $('<li>')
          .text(name)
          .addClass('photo-name')
      );
    });

    // Wrapper
    let $wrapper = $('<div>')
      .addClass('selection-wrapper')
      .append($selectionBox)
      .append($selectionList);
    $('body').append($wrapper);
  },

  buildNameBox: function(event) {

    // Name Box
    let $nameBox = $('<div>')
      .addClass('name-box');

    // Name Label
    let selectedName = $(event.target).text();
    let $nameLabel = $('<h3>')
      .addClass('name-label')
      .text(selectedName);

    // Wrapper
    let selectorPosition = $('.selection-wrapper')
      .position()

    let $nameContainer = $('<div>')
      .addClass('name-wrapper')
      .css({
        'left': selectorPosition.left,
        'top': selectorPosition.top
      })
      .append($nameBox)
      .append($nameLabel);

    $('body').append($nameContainer);
    $nameContainer.fadeIn();

  },

  updateDisplay: function(event) {
    if (mouseHandler.hideList) {
      mouseHandler.recenterSelector(event);
      if (mouseHandler.outsideImage(event)) {
        mouseHandler.hideHover();
      }
    }
  },

  recenterSelector: function(event) {
    $('.selection-wrapper').css({
      'left': event.pageX - 40,
      'top': event.pageY - 40
    })
  },

  outsideImage: function(event) {
    if (
        (event.pageX < mouseHandler.imgLeft)
      || (event.pageX > mouseHandler.imgRight)
      || (event.pageY < mouseHandler.imgTop)
      || (event.pageY > mouseHandler.imgBottom)
    ) {
        return true;
    }
    return false;
  },

  hideHover: function(event, callback) {
    if (mouseHandler.hideList) {
      $('.selection-box').fadeOut(200, callback);
    }
  },

  showHover: function(event, callback) {
    if (mouseHandler.hideList) {
      $('.selection-box').fadeIn(200, callback);
    }
  },

  telportHover: function(event) {
    // hide name list
    $('.name-list li').each(function(i, element) {
      $(element).fadeOut(200);
    })
    // hide selector, if it's in the frame, recenter and show it
    mouseHandler.hideHover(event, function() {
      if (!mouseHandler.outsideImage(event)) {
        mouseHandler.recenterSelector(event);
        mouseHandler.showHover();
      }
    })
  },

  handleClick: function(event) {
    // toggle list state
    mouseHandler.hideList = !mouseHandler.hideList;

    if (!mouseHandler.hideList) {
      // name list is hidden. show it.
      $('.name-list li').each(function(i, element) {
        $(element).slideDown(200);
      })
    } else {

      // name list is visible.
      if ($(event.target).is('li.photo-name')){

        // clicked a name. build a name box and teleport the selector
        mouseHandler.buildNameBox(event);
        mouseHandler.telportHover(event);

      } else {
        // clicked some other thing. teleport!
        mouseHandler.telportHover(event);
      }
    }
  }

}

$(
  function() {
    mouseHandler.init();
  }
)

'use strict';

var mouseHandler = {
  init: function() {
    $('.taggable img').on( {
      'mouseenter': mouseHandler.showHover,
    });
    $('body').on( {
      'mousemove': mouseHandler.updateDisplay,
      'mouseleave': mouseHandler.leaveHandlder,
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
    mouseHandler.showable = true;
  },

  buildSelector: function() {
    let $selectionBox = $('<div>')
      .addClass('selection-box');
    $('body').append($selectionBox);
  },

  updateDisplay: function(event) {
    if (mouseHandler.showable) {
      $('.selection-box').css({
        'left': event.pageX - 25,
        'top': event.pageY - 25
      })
      
      if (
          (event.pageX < mouseHandler.imgLeft)
        || (event.pageX > mouseHandler.imgRight)
        || (event.pageY < mouseHandler.imgTop)
        || (event.pageY > mouseHandler.imgBottom)
      ) {
          mouseHandler.hideHover();
      }
    }
  },

  leaveHandlder: function() {
    mouseHandler.hideHover();
    mouseHandler.showable = true;
  },

  hideHover: function() {
    $('.selection-box').fadeOut(200);
  },

  showHover: function() {
    if (mouseHandler.showable) {
      $('.selection-box').fadeIn(200);
    }
  },

  handleClick: function(event) {
    mouseHandler.showable = !mouseHandler.showable;
    if (!mouseHandler.showable) {
      mouseHandler.hideHover();
    } else {
      mouseHandler.updateDisplay(event);
      mouseHandler.showHover();
    }
    
    console.log(mouseHandler.showable);
  }

}

$(
  function() {
    mouseHandler.init();
  }
)

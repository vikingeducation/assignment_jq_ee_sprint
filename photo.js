'use strict';

var mouseHandler = {
  init: function() {
    $('img').on( {
      'mousemove': mouseHandler.updateDisplay,
      'mouseenter': mouseHandler.showHover,
      'mouseout': mouseHandler.hideHover,
      'click': mouseHandler.handleClick
    } );
  },

  updateDisplay: function(event) {
    // console.log('X: ' + event.pageX);
    // console.log('Y: ' + event.pageY)
  },

  showHover: function(event) {
    console.log('on image');
  },

  hideHover: function(event) {
    console.log('off image');
  },

  handleClick: function(event) {
    console.log('click image');
  }

}

$(
  function() {
    mouseHandler.init();
  }
)

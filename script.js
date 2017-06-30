'use strict';

var keyHandlers = {
  init: function() {
    $('#text-input').on('keyup', keyHandlers.handleText);
    $('#text-area').on('keyup', keyHandlers.handleTextArea);
    $('input[type=password]').on('keyup', keyHandlers.handlePassword);
  },

  validate: function() {
    keyHandlers.validateLength('#text-input', 4, 32);
    keyHandlers.validateLength('#text-area', 4, 140);
    keyHandlers.validateLength('#password-input', 6, 16);
    keyHandlers.validateMatch('#password-repeat', '#password-input');
  },

  handleText: function(event) {
    keyHandlers.checkLength($(event.target), 32);
  },

  handleTextArea: function(event) {
    keyHandlers.checkLength($(event.target), 140);
  },

  handlePassword: function(event) {
    // select password inputs
    let $section = $(event.target).parent();
    let $input = $section.children('#password-input');
    let $repeat = $section.children('#password-repeat');

    // check the input's length
    keyHandlers.checkLength($input, 16);
    // check the repeat's match
    keyHandlers.checkMatch($input, $repeat);
  },

  checkMatch: function($input, $repeat) {
    if ($repeat.val().length){
      // there is something entered, display something
      let message = 'Passwords Differ';
      if ($input.val() === $repeat.val()){
        message = 'Passwords Match'
      }
      keyHandlers.updateLabel($repeat, message);

    } else {
      // nothing entered, hide the message
      keyHandlers.removeLabel($repeat);
    }
  },

  validateMatch: function(toLabel, toCompare) {
    let $toLabel = $(toLabel);
    let $toCompare = $(toCompare);

    if ($toLabel.val() === $toCompare.val()) {
      // valid!
      keyHandlers.removeLabel($toLabel);
    } else {
      // mismatch
      keyHandlers.updateLabel($toLabel, 'Passwords Differ');
      keyHandlers.warn($toLabel);
    }
  },

  checkLength: function($element, maxLength) {
    let remaining = maxLength - $element.val().length;

    if (remaining === maxLength) {
      // no characters entered
      keyHandlers.removeLabel($element);
    } else {
      // some characters entered
      let message = remaining;
      if (remaining < 0) {
        // too many characters
        message = 'Too Long!';
      }
      keyHandlers.updateLabel($element, message);
    }
  },

  validateLength: function(selector, minLength, maxLength) {
    let $element = $(selector);
    let length = $element.val().length;

    if (length < minLength){
      keyHandlers.updateLabel($element, 'Too Short');
      keyHandlers.warn($element);

    } else if (length > maxLength) {
      keyHandlers.updateLabel($element, 'Too Long');
      keyHandlers.warn($element);
    } else {
      // we're valid
      keyHandlers.removeLabel($element);
    }
  },

  removeLabel: function($element){
    // remove label
    keyHandlers.locateLabel($element)
      .remove();
  },

  updateLabel: function($element, message){
    // locate label
    let $label = keyHandlers.locateLabel($element);

    // set label value
    $label.text(message);

    $element.removeClass('warning-input');
    $label.removeClass('warning-label')
  },

  locateLabel: function($element) {
    // search for label
    let $label = $element.next('.input-feedback');

    // build one if needed
    if ($label.length === 0) {
      $label = $('<strong>')
        .addClass('input-feedback');
      $label.insertAfter($element);
    }

    return $label;
  },

  warn: function($element) {
    // warning!
    $element.addClass('warning-input');
    keyHandlers.locateLabel($element)
      .addClass('warning-label');
  }
}

var buttonHandler = {
  init: function() {
    $('button').on('click', buttonHandler.handleSubmit);
  },
  handleSubmit: function(event) {
    event.preventDefault();
    keyHandlers.validate();
  }
}

var dropHandler = {
  init: function() {
    dropHandler.setupDropdowns();
    $('.dropdown').on('click', 'li', dropHandler.handleSelection);
  },

  setupDropdowns: function() {
    let $dropdowns = $('.dropdown');
    $dropdowns.each(function(index, element) {
      // add blank list item to the top of the list
      let $topItem = $('<li>')
        .append($('<label>'));
      dropHandler.selectItem($topItem);
      $(element).prepend($topItem);

      // add hidden form element for submission
      let $input = $('<input>')
        .attr('type', 'hidden');
      $(element).parent()
        .append($input);
    })
  },

  selectItem: function($item) {
    $item.addClass('selected');
    // add dropdown arrow
    $item.append(
      $('<strong>')
        .text('v')
    );

    // update hidden input
    let selectedValue = $item
      .children('label')
      .text();

    let formSubmission = $item
      .closest('.dropdown')
      .siblings('input');
    console.log(formSubmission)

    $(formSubmission).val(selectedValue);
  },

  deselectItems: function($items) {
    let $selected = $items.filter('.selected');
    $.each($selected, function(index, item) {
      $(item)
        .removeClass('selected');
      $(item)
        .children('strong')
        .slideUp(function() {
          this.remove();
        })
    })
  },

  handleSelection: function(event) {
    let $clicked = $(event.currentTarget);
    let $list = $(event.delegateTarget);
    let $items = $list.children('li');

    dropHandler.deselectItems($items);

    if ($list.hasClass('open')) {
      // handle selection
      dropHandler.selectItem($clicked);
      $items
        .not('.selected')
        .each(function(index, element) {
          $(element).slideUp();
        });
      
    } else {
      // open list
      $items.each(function(index, element) {
        if (index === 0) {
          dropHandler.selectItem($(element));
        }
        $(element).slideDown(function() {
          $(element).css('display', 'flex')
        });
      });
    };
    $list.toggleClass('open');
  },


}


$(
  function() {
    keyHandlers.init();
    buttonHandler.init();
    dropHandler.init();
  }
)

"use strict";

let CONSTANTS = {
  CONTAINER_SLIDE_SPEED: 100
}

let selectBox = {
  selectBoxes: [],

  getSelectBox: (id) => {
    for (let i = 0; i < selectBox.selectBoxes.length; i++) {
      if (selectBox.selectBoxes[i].attr('id') === id)
        return selectBox.selectBoxes[i];
    }
    return undefined;
  },

  init: ($el, itemsObj) => {
    // Make sure we have a jquery object.
    if (!($el instanceof jQuery))
      $el = $($el);
    let $newSelectBox = $el;

    // Set properties.
    $newSelectBox.open = false;

    // Create visual hierarchy interface.
    selectBox.visualLogic.createHierarchy($newSelectBox, itemsObj);

    // Add listeners.
    selectBox.eventLogic.addListeners($newSelectBox);

    // Add it to the collection and return it.
    selectBox.selectBoxes.push($newSelectBox);
    return $newSelectBox;
  },

  visualLogic: {
    createHierarchy: ($newSelectBox, itemsObj) => {
      // Clone our selected element.
      $newSelectBox.selectedItem = selectBox.visualLogic.selectedElement.clone();
      $newSelectBox.selectedItem.children()[0].setAttribute('name', $newSelectBox.attr('id') + '_selected_item');
      $newSelectBox.selectedItem.appendTo($newSelectBox);

      // Clone our selected item arrow (display purposes)
      selectBox.visualLogic.arrowElement.clone().appendTo($newSelectBox.selectedItem);

      // Clone our item container element.
      $newSelectBox.itemContainer = selectBox.visualLogic.itemContainer.clone();
      $newSelectBox.itemContainer.items = [];
      $newSelectBox.itemContainer.appendTo($newSelectBox);

      // Iterate through provided items and add them to the container.
      for (let key in itemsObj) {
        // Ignore inherited properties.
        if (!itemsObj.hasOwnProperty(key)) continue;

        // Clone our item element.
        let $newItem = selectBox.visualLogic.itemElement.clone();
        $newItem.data('value', key);
        $newItem.text(itemsObj[key]);

        // Save a reference.
        $newSelectBox.itemContainer.items.push($newItem);

        // Append it.
        $newItem.appendTo($newSelectBox.itemContainer);
      }
    },

    arrowElement: (() => {
      return $('<div>', {
        class: 'selected-item-arrow',
        text: 'v'
      });
    })(),

    selectedElement: (() => {
      let newDiv = $('<div>', {
        class: 'selected-item placeholder',
        html: $('<input>', {
          type: 'hidden'
        })
      });
      $('<span>', { text: 'Choose one...' }).appendTo(newDiv);
      return newDiv;
    })(),

    itemContainer: (() => {
      return $('<div>', {
        class: 'item-container'
      }).hide();
    })(),

    itemElement: (() => {
      return $('<div>', {
        class: 'item-element',
        text: 'Select Item'
      });
    })()
  },

  eventLogic: {
    addListeners: ($newSelectBox) => {
      $newSelectBox.on('click', selectBox.eventLogic.clickHandler);

      $newSelectBox.selectedItem.setValue = function(val) {
        $(this.children('input')[0]).val(val.key);
        $(this.children('span')[0]).text(val.value)
      }
    },

    clickHandler: (e) => { // Primary click delegate.
      let $target = $(e.target);
      let $selectBox = selectBox.getSelectBox($target.closest('.select-box').attr('id'));

      // Determine which item was clicked on.
      let targetClass = $target.attr('class');
      switch (targetClass) {
        case undefined:
        case "selected-item-arrow":
          // Bubble to parent.
          $target.parent().trigger('click', e);
          break;
        case "selected-item":
        case "selected-item placeholder":
          // Toggle the currently focused menu.
          selectBox.eventLogic.toggleSelectMenu($selectBox);
          break;
        case "item-element":
          // Select item.
          selectBox.eventLogic.selectMenuItem($selectBox, $target);
          break;
      }
      event.preventDefault();
      return false;
    },

    toggleSelectMenu: ($selectBox) => {
      if ($selectBox.open === false) {
        $selectBox.open = true;
        $selectBox.itemContainer.slideDown(CONSTANTS.CONTAINER_SLIDE_SPEED);
      } else {
        $selectBox.open = false;
        $selectBox.itemContainer.slideUp(CONSTANTS.CONTAINER_SLIDE_SPEED);
      }
    },

    selectMenuItem: ($selectBox, $target) => {
      // Set selected item for hidden input and view.
      let key = $target.data('value');
      let value = $target.text();
      $selectBox.selectedItem.setValue.call($selectBox.selectedItem, { key, value });
      selectBox.eventLogic.toggleSelectMenu($selectBox);
    }
  },

}

$(document).ready(() => {
  selectBox.init($('#select_box'), {
    value1: 'Item One',
    value2: 'Item Two',
    value3: 'Item Three'
  });
  selectBox.init($('#select_box2'), {
    value1: 'Item One',
    value2: 'Item Two',
    value3: 'Item Three',
    value4: 'Item Four',
    value5: 'Item Five',
    value6: 'Item Six'
  });
  selectBox.init($('#select_box3'), {
    value1: 'Item One',
    value2: 'Item Two',
    value3: 'Item Three',
    value4: 'Item Four',
    value5: 'Item Five',
    value6: 'Item Six',
    value7: 'Item Seven',
    value8: 'Item Eight',
    value9: 'Item Nine',
  });
});

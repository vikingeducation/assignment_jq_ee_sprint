"use strict";

const TAG_CONSTANTS = {
  SELECT_BOX_NAMES: {
    name_one: "Roger",
    name_two: "Lisa",
    name_three: "Jeremy",
    name_four: "Ashley"
  }
};

function PhotoTagger(el) {
  // Make sure we're using a jQuery object.
  this.$el = el;
  if (!(this.$el instanceof jQuery))
    this.$el = $(el);

  // Reference array for tags.
  this.taggingEnabled = false;
  this.$tagInterface;
  this.$tags = [];

  // Initialize photo tagging.
  let init = () => {
    // Enable or disable tagging depending on
    // where the mouse cursor is.
    this.$el.hover(mouseOverFunc, mouseOutFunc)
      .mousemove(mouseMoveFunc)
      .click(clickFunc);

    // Init taginterface.
    this.$tagInterface = createTagElement('tag_interface');
    this.$tagInterface.appendTo($(document.body));
  }

  // Handler to show tagging interface.
  let mouseOverFunc = (e) => {
    this.taggingEnabled = true;
    this.$tagInterface.show();
  }

  // Handler to hide tagging interface.
  let mouseOutFunc = (e) => {
    this.taggingEnabled = false;
    this.$tagInterface.hide();
  }

  // Handler for tagging movement.
  let mouseMoveFunc = (e) => {
    if (this.taggingEnabled) {
      // Get location of cursor.
      // Width of tagger is 100px.
      let xPos = e.clientX,
        yPos = e.clientY;

      this.$tagInterface.css({
        left: xPos - 100,
        top: yPos - 100
      });
    }
  }

  // Handler for adding a tag.
  let clickFunc = (e) => {
    // Create a new tag element and add it.
    let newTagName = 'tag_' + this.$tags.length;
    let $newTagElement = createTagElement(newTagName, true);
    this.$tags.push($newTagElement);

    // Get location of cursor.
    // Width of tagger is 100px.
    let xPos = e.clientX,
      yPos = e.clientY;

    // Set position.
    $newTagElement.css({
      left: xPos - 100,
      top: yPos - 100
    });

    // Add it to the photo.
    $newTagElement.getTagSquare().addClass('tag-added');
    $newTagElement.appendTo(this.$el);

    // Enable pointer events.
    $newTagElement.css('pointer-events', 'all');
    this.$tagInterface.remove();
    this.$tagInterface = null;
    this.$el.off();
  }

  // Method to create a tag element internally.
  let createTagElement = (id, hasSelectBox) => {
    let newDiv = $('<div>', {
      class: 'photo-tag',
      style: 'pointer-events: none'
    });
    $('<div>', {
      class: 'tag-square'
    }).appendTo(newDiv);
    if (hasSelectBox != undefined && hasSelectBox === true) {
      let $newSelectBox = $('<div>', {
        id: id,
        class: 'tag-select-box'
      });
      selectBox.init($newSelectBox, TAG_CONSTANTS.SELECT_BOX_NAMES);
      $newSelectBox.appendTo(newDiv);
    }
    newDiv.getTagSquare = () => {
      return $(newDiv.children('.tag-square')[0]);
    };
    return newDiv;
  }

  $('<button>', {
      text: 'Tag Someone!',
      class: 'tag-photo'
  }).click(init).insertAfter(this.$el);
}

$(document).ready(() => {
  new PhotoTagger($('#photo_to_tag'));
});

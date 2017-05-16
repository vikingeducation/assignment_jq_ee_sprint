var tagging = {

  names: ['Frank', 'Dee', 'Mac', 'Dennis', 'Charlie', 'Kitten Mittens'],
  locked: false,

  init: function() {
    tagging.createTagger();
    tagging.startTrackingMouse();
    $('.photo-container').on('click', '.photo', tagging.tagPhoto);
    $('.photo-container').on('click', '.remove-tag', tagging.removeTag);
  },

  removeTag: function(e) {
    var $parent = $(this).parents('.tagged');
    name = $parent.find('.selected').text()
    tagging.names.push(name);
    $('#tagger').find('.menu').append($('<li>', {
      class: 'item'
    }).text(name));
    $parent.remove();
  },

  tagPhoto: function(e) {
    if (tagging.locked) {
      $('.menu').slideUp();
      tagging.startTrackingMouse();
      tagging.locked = false;
    } else {
      tagging.locked = true;
      tagging.stopTrackingMouse();
      $('.menu').slideDown(300);
      $('#tagger').on('click', '.item', tagging.createTag);
    }
  },

  createTag: function(e) {
    var $this = $(this);
    var $tagger = $this.parents('#tagger');
    $this.parents('.toggle').find('.selected').html($this.text());
    var $tagged = $tagger.addClass('tagged').addClass('point-through');
    $tagged.attr('id', null)
      .find('.selected')
      .html($this.text())
    $tagger.find('.menu').remove();
    $tagged.prepend($('<div>', {
        class: 'remove-tag'
      })
      .text('x'));
    tagging.names.splice(tagging.names.indexOf($this.text()), 1);
    tagging.locked = false;
  },

  startTrackingMouse: function() {
    $('.photo-container').on({
      mouseenter: tagging.showTagger,
      mouseleave: tagging.hideTagger,
      mousemove: tagging.followMouse,
    }, '.photo');
    $('#tagger').toggleClass('point-through');
  },

  followMouse: function(e) {
    console.log('followMouse');
    if ($('#tagger').length === 0) {
      tagging.createTagger();
      tagging.showTagger();
      tagging.locked = false;
    }
    if (!tagging.locked) {
      $('#tagger').css({
        top: e.pageY - 50,
        left: e.pageX - 50
      });
    }
  },

  stopTrackingMouse: function(e) {
    console.log('stop tracking');
    $('#tagger').removeClass('point-through');
    $('.photo-container').off('mouseenter, mouseleave');
  },

  hideTagger: function() {
    $('#tagger').remove();
  },
  showTagger: function() {
    $('#tagger').show();
  },

  createTagger: function(e) {
    var $tagger = $('<div>')
      .attr('id', 'tagger')
      .addClass('point-through');
    var $toggle = $('<div>')
      .addClass('toggle');
    var $selected = $('<div>')
      .addClass('selected')
    var $menu = $('<ul>')
      .addClass('menu');
    tagging.names.forEach(function(el) {
      $menu.append($('<li>').addClass('item').html(el));
    })
    var $html = $tagger.append($toggle.append($menu)).append($selected);
    $('.photo-container').append($html);
  },

};
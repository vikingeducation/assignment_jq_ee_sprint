var tagging = {

  names: ['Frank', 'Dee', 'Mac', 'Dennis', 'Charlie', 'Kitten Mittens'],

  init: function() {
    tagging.startTrackingMouse();
    $('.photo-container').on('click', '.remove-tag', tagging.removeTag);
  },

  removeTag: function(e) {
    $(this).parents('.tagged').remove();
  },

  tagPhoto: function(e) {
    tagging.stopTrackingMouse(e);
    $('#tagger').css('pointer-events', 'auto');
    $('.menu').slideDown(300);
    $('#tagger').on('click', '.item', tagging.createTag);
  },

  createTag: function(e) {
    var $this = $(this);
    var $tagger = $this.parents('#tagger');
    $this.parents('.toggle').find('.selected').html($this.text());
    var $tagged = $tagger.addClass('tagged');
    $tagged.attr('id', null)
      .find('.selected')
      .html($this.text());
    $tagger.find('.menu').remove();
    $tagged.prepend($('<div>', {
        class: 'remove-tag'
      })
      .text('x'));
    $('#tagger').css('pointer-events', 'none');
    tagging.startTrackingMouse();
  },

  startTrackingMouse: function() {
    $('.photo-container').on({
      mouseenter: tagging.showTagger,
      mouseleave: tagging.hideTagger,
      mousemove: tagging.followMouse,
      click: tagging.tagPhoto
    }, '.photo');
  },

  followMouse: function(e) {
    console.log('followMouse');
    $('#tagger').css({
      top: e.pageY - 50,
      left: e.pageX - 50
    });
  },

  stopTrackingMouse: function(e) {
    console.log('stop tracking');
    $('.photo-container').off({
      mouseenter: tagging.showTagger,
      mouseleave: tagging.hideTagger,
      mousemove: tagging.followMouse,
      click: tagging.tagPhoto
    }, '.photo')
  },

  hideTagger: function() {
    $('#tagger').remove();
  },

  showTagger: function(e) {
    var $tagger = $('<div>')
      .attr('id', 'tagger');
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
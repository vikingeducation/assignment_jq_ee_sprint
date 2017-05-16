var dropDown = {

  init: function() {
    $('.dropdown').on('click', '.toggle', dropDown.toggle);
    $('.dropdown').on('click', '.item', dropDown.select);
  },

  toggle: function(e) {
    var $this = $(this);
    $this.find('.menu').slideToggle(300);
  },

  select: function(e) {
    var $this = $(this);
    $this.parents('.toggle').find('.selected').html($this.text());
    dropDown.setFormValue($this);
  },

  setFormValue: function($selection) {
    var $form = $selection.parents('#form');
    $form.find('#selection').val('fdjks');
  }

}
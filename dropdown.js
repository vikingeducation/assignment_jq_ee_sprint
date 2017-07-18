$(document).ready(function() {
  var closeDropdown =function() {
    $(".dropdown ul ul").slideUp();
  };

  var handlers = {
    toggleDropdown: function() {
      var $list = $(this).next();
      closeDropdown();
      if (!$list.is(":visible"))
        $list.slideDown();
    },
    makeTopLevel: function(e) {
      e.preventDefault();
      closeDropdown();
      var $parent = $(this).parent(),
          $this = $(this).detach();
      $parent.prepend($this);
    }
  }
  // It should smoothly slide open and closed
  $(".dropdown").on("click", "h3", handlers.toggleDropdown);

  // The sub-elements should be clickable (the mouse should be a pointer
  // when hovering). When clicked, the menu closes and that element becomes
  // the top-level element to indicate it has been selected.
  $(".dropdown").on("click", "ul ul li", handlers.makeTopLevel);
});

$(document).ready(function() {
  var $elts = {
    photoHook: $(".photo"),
    people: $(".people"),
    tag: $(".tag")
  };

  var handlers = {
    is_elt_fixed: function() {
      return $(".tag").not(".fixed").hasClass("pinned");
    },
    toggleTag: function($tags) {
      $tags.toggleClass("hidden");
    },
    togglePeople: function() {
      $elt = $(".tag").not(".fixed").children(".people")
      if ($elt.is(":visible"))
        $elt.hide();
      else
        $elt.slideDown();
    },
    pin_tag_to_mouse: function(e, $tags) {
      var $tags = $(".tag").not(".fixed");
      $tags.css({
        position: "absolute",
        top: e.pageY - 40,
        left: e.pageX - 50
      });
    },
    pin_tag_to_current_position: function(e) {
      var $tags = $(".tag").not(".fixed");
      $tags.css({
        position: "absolute",
        top: e.pageY - 40,
        left: e.pageX - 50
      });
    },
    pin_person_to_tag: function(e) {
      // clone the frame
      var $tag = $elts.tag.clone();
      // get the name
      var name = $(e.target).html();
      // replace all content by the name
      var $person = $("<ul><a href='#'><li>" + name + "</li></a></ul>");
      $tag.children(".people")
        .html($person)
        .css({height: "1.4em"});
      $elts.tag.parent().append($tag);
      // pin it
      $tag.addClass("fixed");
    }
  };

  // When the user's mouse moves over the photo, it should be in the
  // center of a square "targeting" outline (which should stand out,
  // so make it a noticeable color). This outline should not show unless
  // the mouse is hovering on the photo.
  $elts.photoHook.on("mouseenter mouseleave", "img", function() {
    var $tags = $(".tag").not(".fixed");
    if (!handlers.is_elt_fixed()) handlers.toggleTag($tags);
  });

  $elts.photoHook.on("mouseenter mouseleave", ".tag", function() {
    var $tags = $(".tag").not(".fixed");
    if (!handlers.is_elt_fixed()) handlers.toggleTag($tags);  });

  $elts.photoHook.on("mousemove", function(e) {
    console.log("mouse move")
    if (!handlers.is_elt_fixed()) handlers.pin_tag_to_mouse(e);
  });

  // When the user clicks, the targeting outline becomes fixed at that
  // location and a simple dropdown menu slides down below it. Pre-populate
  // this menu with a few sample names to choose from.
  $elts.photoHook.on("click", ".frame", function(e) {
    $elts.tag.toggleClass("pinned");
    handlers.togglePeople();
    handlers.pin_tag_to_current_position(e);
  });

  // If the user clicks away from the dropdown, "cancel" the tagging and
  // resume the process of having the targeting box follow the mouse on hover.
  $elts.photoHook.on("click", "img", function(e) {
    $elts.tag.toggleClass("pinned");
    handlers.togglePeople();
    handlers.pin_tag_to_current_position(e);
  });

  // If the user selects a name from the list, assign that name to the
  // now-fixed tag box. The name should be displayed somewhere next to
  // this new tag box.
  $elts.people.on("click", "li", function(e) {
    e.preventDefault();
    // Resume the hover-targeting phase and allow the user to continue
    // tagging locations in the photo.
    //$elts.tag.toggleClass("pinned");
    //handlers.togglePeople();
    handlers.pin_person_to_tag(e);
    $elts.tag.removeClass("pinned")
    handlers.togglePeople();
  });
});

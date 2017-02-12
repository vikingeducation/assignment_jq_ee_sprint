var photoTagging = {

  init: function() {

    var mouseX, mouseY;

    var nameList = ["Larry", "Barry", "Harry", "Gary"];

    $(".photo-container").hover(
      function() {
        $(this).children(".tag-hover").show();
        $(this).children(".tag-fixed").show();
      }, function() {
        $(this).children(".tag-hover").hide();
        $(this).children(".tag-fixed").show();
      }
    );

    $(".photo-container").click( function(event) {

      // When no tag-hover exists:
      if ($(this).children(".tag-hover").length === 0) {

        // If no tag-fixed exists either,
        // create a new tag-hover:
        if ($(this).children(".tag-fixed").length === 0) {
          var currLeft = event.pageX - $(this).position().left - 50;
          var currTop = event.pageY - $(this).height() - 35;
          var $newTag = $("<div>").addClass("tag-hover")
                                  .css({left: currLeft, top: currTop});
          $(this).append($newTag);

        // If tag-fixed already exists,
        // remove tag if img or container is clicked:
        } else {
          var $tagFixed = $(this).children(".tag-fixed");
          var target = event.target;
          if (target.tagName === "IMG" ||
              target.className === "photo-container") {
            $tagFixed.remove();

          // If clicked on list name, remove name list,
          // convert tag to tag-saved, and place clicked name under tag.
          } else if (target.className === "name-li") {
            var name = target.innerHTML;
            var $name = $("<div>").addClass("tagged-name")
                                  .html(name);
            $tagFixed.removeClass("tag-fixed")
                     .addClass("tag-saved")
                     .children().remove();
            $tagFixed.append($name);
          };
        };

      // When tag-hover already exists,
      // replace tag-hover with tag-fixed plus name list:
      } else {
        var $tagHover = $(this).children(".tag-hover");
        var $nameList = $("<ul>").addClass("name-list");
        for (i = 0; i < nameList.length; i++) {
          var $li = $("<li>").addClass("name-li")
                             .text(nameList[i]);
          $nameList.append($li);
        };
        $tagHover.removeClass("tag-hover")
                 .addClass("tag-fixed")
                 .append($nameList);
      };
    });

    $(".photo-container").mousemove( function(event) {
      $(this).children(".tag-hover").css(
        {left: event.pageX - $(this).position().left - 50,
         top: event.pageY - $(this).height() - 35}
      );
    });
  }
};

$(document).ready( function() {
  photoTagging.init();
});

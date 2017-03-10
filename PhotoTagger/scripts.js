( function ($ ) {
  "use strict";
  $(document).ready(function() {
    // Photo target
      var $clickableArea = $(".clickable-area");
      var $image = $(".photo");
      var $parentDiv = $(".image-container");
      var isPhotoDropdownOpen = false;
      var $listItems = $(".friend-dropdown").children();
      var $existingBoxes = $(".photo-box");
      var $listHolder = $(".list-holder");

      var newBox = function (positionLeft, positionTop) {
        var $box = $('<div></div>')
          .attr('position', 'relative')
          .attr('class', 'photo-box')
          .css('left', positionLeft)
          .css('top', positionTop);

        return $box;
      };

      var leaveBox = function () {
        var positionLeft = (event.pageX - 50) + "px";
        var positionTop = (event.pageY - 50) + "px";

        $parentDiv.append(newBox(positionLeft, positionTop));
      };

      var newDropdown = function (positionLeft, positionTop) {
        var $li1 = $('<li></li>')
          .html("Garnet")
          .css('display', 'none');
        var $li2 = $('<li></li>')
          .html("Pearl")
          .css('display', 'none');
        var $li3 = $('<li></li>')
          .html("Amethyst")
          .css('display', 'none');
        var $li4 = $('<li></li>')
          .html("Rose Quartz")
          .css('display', 'none');
        var $li5 = $('<li></li>')
          .html("Steven")
          .css('display', 'none');

        var $ul = $('<ul>')
          .html($li1)
          .attr('class', 'friend-dropdown first-use');

          $ul.append($li2)
            .append($li3)
            .append($li4)
            .append($li5);

        var $dropdown = $('<div></div>')
          .attr('position', 'relative')
          .attr('class', 'dropdown-container')
          .css('left', positionLeft)
          .css('top', positionTop)
          .html($ul);

          return $dropdown;
      };

      var leaveDropdown = function () {
        var positionLeft = (event.pageX - 50) + "px";
        var positionTop = (event.pageY + 55) + "px";

        $listHolder.append(newDropdown(positionLeft, positionTop));
      };

        $clickableArea.click(function(event) {
          if (!isPhotoDropdownOpen){
            leaveBox();

            $clickableArea.removeClass("hover-active");

            var $newBox = leaveDropdown();
            $existingBoxes = $(".photo-box");

            $listItems = $("li");
            $listItems.slideDown();

            isPhotoDropdownOpen = true;
          }
          else {
            $listItems = $("li").not(".finished");
            $listItems.slideUp();
            $listItems.removeClass("first-use");

            setTimeout(function() {
              $existingBoxes.last().remove();
              $listItems.remove();
              $clickableArea.addClass("hover-active");

              isPhotoDropdownOpen = false;
            }, 500);

          }
      });

      $listHolder.on("click", "li", function(event) {
        var $clickedItem = $(event.target);
        $clickedItem.addClass("finished");
        $clickedItem.siblings().slideUp();
        setTimeout(function() {
          $clickedItem.siblings().remove();

          $clickableArea.addClass("hover-active");
          isPhotoDropdownOpen = false;
        }, 500);

      });
  });
} ( jQuery ) );

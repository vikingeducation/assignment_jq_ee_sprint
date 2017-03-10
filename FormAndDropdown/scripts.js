( function ($ ) {
  "use strict";

  $(document).ready(function() {

    // Form countdown

    var $inputs = $(".input-box");

    $inputs.on("keyup", function(event){
      var $inputBox = $(event.target);
      var $target = $inputBox.next();
      var currentCount = $inputBox.val().length;
      $inputBox.data("current", currentCount);

      var maxCount = $inputBox.data("max");
      var remainingCharacters = maxCount - currentCount;

      if (remainingCharacters < 0) {
        remainingCharacters = 0;
      }

      $target.html(remainingCharacters + " characters remaining");


      if (currentCount === 0) {
        $target.hide();
      }
      else {
        $target.show();
      }
    });

// password countdown
      var $passConfirm = $("#pass-confirm");


      $passConfirm.on("keyup", function(event){
        var $passOrig = $("#pass-orig");
        var $matchMessage = $("#pass-match");

        if ($passConfirm.val() === $passOrig.val()) {
          $matchMessage.hide();
        }
        else {
          $matchMessage.show();
        }

      });

// validate field is 4-32 char, area is 4-140, pass/confirm are 6-16, passwords match

      var $button = $(".button");
      var $inputParents = $("form").children().has(".input-box");
      //console.log($inputParents);

      $button.click(function(event) {
        event.preventDefault();

        $inputParents.each(function(index) {
          var $inputBox = $(this).children().filter(".input-box");
          var currentCharCount = $inputBox.data("current");
          var maxCharCount = $inputBox.data("max");
          var minCharCount = $inputBox.data("min");

          var $errorMessage = $(this).children().filter(".error-message");

          if (currentCharCount < minCharCount || currentCharCount > maxCharCount) {
            $inputBox.addClass("error");
            $errorMessage.addClass("error-message")
              .show();
          }
          else {
            $inputBox.removeClass("error");
            $errorMessage.hide();
          }

          var $passOrig = $("#pass-orig");
          var $matchMessage = $("#pass-match");

          if ($passConfirm.val() === $passOrig.val()) {
            $matchMessage.hide();
            $matchMessage.removeClass("error-message");
          }
          else {
            $matchMessage.show();
            $matchMessage.addClass("error-message");
          }

        });
      });


// UL dropdown
      var $listParent = $(".list-top");
      var $listItems = $(".dropdown").children();

      $listParent.click(function(event) {
        if (!$listItems.hasClass("open")) {
          $listItems.slideDown()
            .addClass("open");
         }
         else {
           $listItems.slideUp()
            .removeClass("open");
         }

      });

      $listItems.click(function(event) {
        var $clickedItem = $(event.target);
        $listParent.html($clickedItem.html());

        $listItems.slideUp()
          .removeClass("open");
      });


      
    });
} ( jQuery ) );

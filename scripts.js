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

      $button.click(function(event) {
        event.preventDefault();

        $inputs.each(function(index) {
          var target = $(this);
          var current = target.data("current");
          var max = target.data("max");
          var min = target.data("min");

          if (current < min || current > max) {
            target.addClass("error");
            target.next(1).show();
          }
          else {
            target.removeClass("error");
            target.next(1).hide();
          }
          //console.log($(this).data("current"));
        });
      });

    });

} ( jQuery ) );

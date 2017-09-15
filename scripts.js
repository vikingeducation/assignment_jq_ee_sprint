$(document).ready(function() {
  var validation = {
    // Display character count
    displayCharsLeft: function(element, maxText, counter) {
      // Calculate characters left and insert into counter div
      var $element = $(element);
      var $counter = $(counter);

      $element.keyup(function() {
        var inputLength = $element.val().length;
        var charsLeft = maxText - inputLength;

        $counter.html(charsLeft);

        // If the input is erased, hide the counter div
        if (inputLength === 0) {
          $counter.hide();
        } else {
          $counter.show();
        }
      });
    }
  };

  // Display how many characters are left for each input box, passing in the element, max characters, and counter div
  validation.displayCharsLeft("#text-one", 32, ".counter-one");
  validation.displayCharsLeft("#text-two", 140, ".counter-two");
  validation.displayCharsLeft("#pass-one", 16, ".counter-three");
  validation.displayCharsLeft("#pass-two", 16, ".counter-four");

  // Tests for length and password matching
  var tests = {
    removeFormatting: function(element) {
      $(element).removeClass("success-shadow");
      $(element).removeClass("warn-shadow");
    },

    testLength: function(element, maxText, counter) {
      var inputLength = $(element).val().length;
      var $warnText = $(
        "<p>Your text is too long. Please shorten your text and try again.</p>"
      );

      // If the input length is too long
      if (inputLength > maxText) {
        // Remove the success shadow
        $(element).removeClass("success-shadow");
        // Add the warning shadow and warning text
        $(element).addClass("warn-shadow");
        $(counter).append($warnText);

        // If the input text is not too long
      } else {
        // Remove the warning shadow
        $(element).removeClass("warn-shadow");
        // Add the success shadow and remove the warning text
        $(element).addClass("success-shadow");
        $("#text-one").parent().next().find("p").detach();
      }
    },

    // test to see if passwords match
    passwordMatch: function() {
      $passOne = $("#pass-one");
      $passTwo = $("#pass-two");

      var passwordOne = $passOne.val();
      var passwordTwo = $passTwo.val();
      var match = passwordOne === passwordTwo;

      if (match) {
        $passOne.removeClass("warn-shadow");
        $passTwo.removeClass("warn-shadow");
        $passOne.addClass("success-shadow");
        $passTwo.addClass("success-shadow");
        $("#password-errors").html("<p>Your passwords match.</p>");
      } else {
        $passOne.removeClass("success-shadow");
        $passTwo.removeClass("success-shadow");
        $passOne.addClass("warn-shadow");
        $passTwo.addClass("warn-shadow");
        $("#password-errors").html(
          "<p>Your passwords do not match. Please recheck your passwords and try again.<p>"
        );
      }
    }
  };

  // When you click on the button, the following tests should run

  $("button").on("click", function(event) {
    event.preventDefault();
    tests.removeFormatting("#text-one");
    tests.removeFormatting("#text-two");
    tests.removeFormatting("#pass-one");
    tests.removeFormatting("#pass-two");
    tests.testLength("#text-one", 32, ".counter-one");
    tests.testLength("#text-two", 140, ".counter-two");
    tests.testLength("#pass-one", 16, ".counter-three");
    tests.testLength("#pass-two", 16, ".counter-four");
    tests.passwordMatch();
  });

  // Dropdown Menu
  // If you click the selected option, toggle menu
  $(".selected-option").click(function() {
    $(".option-list").slideToggle(1000);
  });

  $(".option").click(function() {
    var $clickedOption = $(this);
    var optionText = $clickedOption.html();
    var selectedText = $clickedOption.parent().prev().html();
    $clickedOption.parent().prev().html(optionText);
    $clickedOption.html(selectedText);
    $(".option-list").slideToggle(1000);

  });




});

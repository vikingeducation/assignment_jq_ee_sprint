$(document).ready(function() {

  // -----------------------------------------------------------------
  // Error Messages
  // -----------------------------------------------------------------

  var errorMsgs = {
    length: function(field, min, max) {
      return "The '" + field + "' must be between " + min + " and " + max + " characters.";
    },
    equality: function(field1, field2) {
      return "'" + field1 +"' must match '" + field2 + "'.";
    }
  };

  // -----------------------------------------------------------------
  // Validations
  // -----------------------------------------------------------------

  var validations = {
    length: function(options) {
      var min = options.min || 0,
          max = options.max,
          val = options.val;
      if (isNaN(val)) {return false;}

      if (min <= val && val <= max)
        return true;
      else
        return false;
    },
    match: function(re, val) {
      if (val.match(re))
        return true;
      else
        return false;
    }
  };

  // -----------------------------------------------------------------
  // Validations Applied
  // -----------------------------------------------------------------

  var validate = {
    length: function($elts, options) {
      var min = options.min,
          max = options.max;
      $elts.each(function(i, elt) {

        var $elt = $(elt)
            field = $elt.attr("name"),
            $errorMsg = $elt.nextAll(".error-msg").first();
        //var args = {min: min, max: max, val: parseInt($elt.val())}
        var args = {min: min, max: max, val: $elt.val().length}
        // if validations fail we notify the user, if we did'nt do it before
        if (!validations.length(args)) {
          if (!$errorMsg.length) {
            $elt.addClass("error-field");
            $elt.after("<p class='error-msg'>"+errorMsgs.length(field, min, max)+"</p>")
          }
        } else {
          // otherwise we remove the error messages if they were fixed
          if ($errorMsg.length) {
            $elt.removeClass("error-field");
            $errorMsg.remove();
          }
        }
      });
    }
  }

  // -----------------------------------------------------------------
  // Event Handlers
  // -----------------------------------------------------------------

  var handlers = {
    displayCounter: function(e, max) {
      var $this = $(e.target);
      var count = $this.val().length;
      var $counter = $this.nextAll(".counter").first();
      // if there's some content we add the counter
      // otherwise we remove it, if it exists
      if (count) {
        // check if we've already created the element
        if ($counter.length)
          $counter.html((max - count) + " characters remaining.");
        else
          $this.after("<p class='counter'>" + (max - count) + " characters remaining.</p>");
      } else {
        if ($counter.length) $counter.remove();
      }
    },
    checkPasswords: function(e) {
      var $this = $(e.target);
      var pass = $("input[name=password]").val();
      var passConfirm = $this.val();
      var $passMatchFeedback = $("#pass-match-feedback");
      // if the passwords don't match
      if (passConfirm && (pass !== passConfirm)) {
        if (!$passMatchFeedback.length)
          $this.after("<p id='pass-match-feedback'>The passwords don't match.</p>");
      // if they match we remove the warning, if it exists
      } else {
        if ($passMatchFeedback.length)
          $passMatchFeedback.remove();
      }
    },
    validate: function(e) {
      var $textFields = $("input[type=text]");
      var $textArea = $("textarea");
      var $passwordFields = $("input[type=password]");

      // Text field -- 4-32 characters
      validate.length($textFields, {min: 4, max: 32});
      // Text area -- 4-140 characters
      validate.length($textArea, {min: 4, max: 140});
      // Password/confirmation -- 6-16 characters
      validate.length($passwordFields, {min: 6, max: 16});
      // Password -- must match confirmation
      var pass = $passwordFields.filter("input[name=password]").val();
      var passConfirm = $passwordFields.filter("input[name=password-confirmation]").val();

      if (pass !== passConfirm) {
        var $passConfirm = $passwordFields.eq(1);
        $passConfirm.addClass("error-field");
        $passConfirm.after(
          "<p class='error-msg'>"+errorMsgs.equality("password", "password confirmation")+"</p>"
        );
      }

    }
  };

  // -----------------------------------------------------------------
  // Events
  // -----------------------------------------------------------------

  // When the user types into a text field, display a counter next to the
  // field listing how many characters are remaining (maximum 32). This
  // should disappear if text is completely removed.
  $("input[name=name]").on("keyup", function(e) {
    handlers.displayCounter(e, 32);
  });

  // Add the same for the text area at a maximum character count of 140.
  $("textarea").on("keyup", function(e) {
    handlers.displayCounter(e, 140);
  });

  // Add the same for the password and confirmation at a maximum character
  // count of 16
  $("input[type=password]").on("keyup", function(e) {
    handlers.displayCounter(e, 16);
  });

  // When the user begins typing in the password confirmation field, provide
  // feedback indicating the confirmation doesn't match the password (until
  // it does). If the user deletes all text from the confirmation field, this
  // message should disappear as well.
  $("input[name=password-confirmation]").on("keyup", function(e) {
    handlers.checkPasswords(e);
  });

  // When the user clicks "submit", verify that the following validations are
  // met. If not, highlight the offending field in red and display a red error
  // message next to it indicating what went wrong. You'll need to prevent the
  // default behavior of this button.
  $("form").on("submit", function(e) {
    e.preventDefault();
    handlers.validate(e);
  });
});

$(document).ready(function() {

  // Form validator using jQuery Form Validation plugin: https://jqueryvalidation.org/
  // TODO: Add character counter
  var form = {
    inputHandler: function() {
      $("#myForm").validate({
        rules: {
          fullName: {
            minlength: 4,
            maxlength: 32
          },
          description: {
            minlength: 4,
            maxlength: 140
          },
          enterPass: {
            required: true,
            equalTo: "confirm"
          },
          confirm: {
            required: true,
            equalTo: "enterPass"
          }
        },

        messages: {
          fullName: {
            minlength: "Name must be at least 4 characters long",
            maxlength: "Name cannot exceed 32 characters"
          },
          description: {
            minlength: "Description must be at least 4 characters long",
            maxlength: "Description cannot exceed than 140 characters"
          },
          enterPass: {
            required: "Please enter a password",
            minlength: "Your password must be at least 4 characters long",
            equalTo: "Passwords must match"
          },
          confirmPass: {
            required: "Please reenter your password",
            minlength: "Your password must be at least 4 characters long",
            equalTo: "Passwords must match"
          }
        }
      });
    },

    charCounter: function() {
      $('#count1').hide();
      $('#count2').hide();
      $('#count3').hide();

      $("#fn").keydown(function() {
          var el = $(this);
          if (el.val().length === 0) {
       			$('#count1').hide();
          }
          else if (el.val().length >= 32) {
          	$("#count1").show();
            $("#count1").text(0);
          } else {
          	$("#count1").show();
            $("#count1").text(32 - el.val().length);
          }
      });

      $("#desc").keydown(function() {
          var el = $(this);
          if (el.val().length === 0) {
       			$("#count2").hide();
          }
          else if (el.val().length >= 140) {
          	$("#count2").show();
            $("#count2").text(0);
          } else {
          	$("#count2").show();
            $("#count2").text(140 - el.val().length);
          }
      });

      $("#pass").keydown(function() {
          var el = $(this);
          if (el.val().length === 0) {
       			$("#count3").hide();
          }
          else if (el.val().length >= 16) {
          	$("#count3").show();
            $("#count3").text(0);
          } else {
          	$("#count3").show();
            $("#count3").text(16 - el.val().length);
          }
      });
    }
  };

  // Dropdown menu
  var menu = {
    dropdown: function() {
      $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
      });

      $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
      });
    }
  };

  var image = {
    tagger: function() {
      
    }
  }

  // Call methods
  form.inputHandler();
  form.charCounter();
  menu.dropdown();
  image.tagger();
});

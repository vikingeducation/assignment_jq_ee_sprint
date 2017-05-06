$(document).ready(function() {
  //form validations
  function getLengthRemaining($target, maxLength) {
     return (maxLength - $target.val().length);
  }

  function updateLengthRemainingAttribute($target, maxLength) {
    var charsRemaining = getLengthRemaining($target, maxLength);

    if (charsRemaining < maxLength ) {
      $target.next().text(charsRemaining + " characters remaining")
    }
    else {
      $target.next().text("");
    }
  }

  function validateLength($target, minLength, maxLength) {
    if ($target.val().length < minLength) {
      $target.siblings().filter(".error-message").text("Text is too short");
    } else if ($target.val().length > maxLength) {
      $target.siblings().filter(".error-message").text("Text is too long");
    } else {
      $target.siblings().filter(".error-message").text("");
    }
  }

  function validatePasswordMatch(password, passwordConfirmation) {
    if (password == passwordConfirmation) {
      $("#password-match-validation").text("");
    } else {
      if (passwordConfirmation.length > 0) {
        $("#password-match-validation").text("Passwords do not match!");
      }
    }
  }

  $("#text-field").on("input", function(eventObj) {
    updateLengthRemainingAttribute($(this), 32);
  });

  $("#text-area").on("input", function(eventObj) {
    updateLengthRemainingAttribute($(this), 140);
  });

  $("input[type='password']").on("input", function(eventObj) {
    updateLengthRemainingAttribute($(this), 16);
    validatePasswordMatch($("#password").val(), $("#password-confirmation").val());
  });

  $("button").on("click", function() {
    validateLength($("#text-field"), 4, 32);
    validateLength($("#text-area"), 5, 140);
    validateLength($("#password"), 6, 16);
    validateLength($("#password-confirmation"), 6, 16);
  });



  //dropdown menu
  $("#dropdown-list").hide();

  $(".dropdown").hover(function() {
    $("#dropdown-list").slideDown(500);
  }, function() {
    $("#dropdown-list").slideUp(500);
  });

  $(".menu").hover(function() {
    $(this).addClass("selected-item");
    $(this).css('cursor','pointer');
    }, function() {
    $(this).removeClass("selected-item");
  });

  $(".menu").click(function() {
    $("#top-item").text($(this).text());
    $("#dropdown-list").slideUp(500);
  });


  //photo tagging
  var tagClickHandlers = {
    toggleTagBoxFollow: function() {
      $(".photo").on("mouseover", function(e) {
          $("#tag-box").css({
            left: e.pageX-20,
            top: e.pageY-20
          });
        });
      },

      toggleTagBoxVisibility: function() {
        $("#tag-box").toggle();
      }
  }

  $("#tag-box").hide();
  $("#tag-dropdown").hide();
  tagClickHandlers.toggleTagBoxFollow();

  function followCursor(x, y) {
    $("#tag-box").css({
      left: x-20,
      top: y-20
    });
  }

  $(".photo").on({
    click: function(e) {
      //fix outline at current location by turning off #tag-box and creating a new div at the same location
      console.log(e);

      if ($(e.target).is("#tag-box")) {
        $(".photo").off("mouseover");

        tagClickHandlers.toggleTagBoxVisibility();
        var $staticBox = $("<div></div>")
        .addClass("photo-box")
        .css({
              left: e.pageX-20,
              top: e.pageY-20});
        $("#tag-box").after($staticBox);

        //expose dropdown menu
        $("#tag-dropdown").css({
          left: e.pageX-20,
          top: e.pageY+20
        });
        $("#tag-dropdown").slideDown(500);
      } else {
        $(".photo-box").first().remove();
        $("#tag-dropdown").hide();
        $(".photo").on("mouseover.boxFollow");
        tagClickHandlers.toggleTagBoxVisibility();
        tagClickHandlers.toggleTagBoxFollow();
        $("#tag-box").css({
          left: e.pageX-20,
          top: e.pageY-20
        });
      }

      //if not tag-box, hide tag-dropdown, remove temporary div box, and hide tag-dropdown


    }

  });

  $("#tag-dropdown li").on({
    click: function(e) {
      e.stopPropagation();
      console.log($(e.target).text());
      //affix name to bottom of box
      var $targetTagBox = $(".photo-box").first();
      console.log($targetTagBox.css("top"));
      var $name = $("<h3></h3>")
            .addClass("tag-name")
            .text($(e.target).text())
            .css({
                left: $targetTagBox.css("left"),
                top: parseInt($targetTagBox.css("top"), 10)+44
            });
      $targetTagBox.after($name);

      //hide dropdown
      $("#tag-dropdown").hide();
      tagClickHandlers.toggleTagBoxVisibility();
      tagClickHandlers.toggleTagBoxFollow();
      $("#tag-box").css({
        left: e.pageX-20,
        top: e.pageY-20
      });
    }
  });

  $(".photo").on("mouseenter", function(e) {
    $("#tag-box").show()
  });
  $(".photo").on("mouseleave", function(e) {
    $("#tag-box").hide();
  });

  // $(".photo").hover(function() {
  //   $("#tag-box").toggle();
  //   $("#tag-box").show();
  // }, function() {
  //   $("#tag-box").hide();
  // });





});

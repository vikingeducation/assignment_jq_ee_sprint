$(document).ready(function () {
  validations.init();
  dropDown.init();
  photo.init();
});

var photo = {
  init: function() {
    $(".img-container").on('mouseenter', function(e) {
      photo.startHover(e);
    });

    $(".img-container").on('mousemove', function(e) {
      photo.hover(e);
    });

    $(".img-container").on('mouseleave', function(e) {
      photo.stopHover();
    });

    $(".img-container").on('click', function(e) {
      photo.setBox(e);
      photo.startHover(e);
    });

  },

  setPosition: function(e, $object) {
    var x = e.pageX - photo.boxWidth;
    var y = e.pageY - photo.boxHeight;
    $object.css("top", y + "px").css("left", x + "px");
    return $object;
  },

  startHover: function(e) {
    // first make div
    // then css box relative to mouse position
    var $box = $("<div>").addClass("photo-box").attr("id", "hover-box");
    photo.setPosition(e, $box).insertAfter( $('#image') );
    photo.boxWidth = $box.width() / 2;
    photo.boxHeight = $box.height() / 2;
  },

  hover: function(e) {
    photo.setPosition(e, $("#hover-box"));
  },

  stopHover: function(e) {
    $("#hover-box").remove();
  },

  setBox: function(e) {
    console.log($("#hover-box"))
    $("#hover-box").removeAttr("id");
  }
}

var dropDown = {
  init: function() {
    $("#drop-down li").first().addClass("selected");
    dropDown.hide(0);

    $('#drop-down').on('mouseenter', "li", function(e){ 
      if (!dropDown.hidden) {
        dropDown.hoverOn(e);
      }
    });

    $('#drop-down').on('mouseleave', "li", function(e){ 
      dropDown.hoverOff(e);
    });

    $('#drop-down').on('mouseleave', function(e){ 
      dropDown.hide(300);
    });

    $('#drop-down').on('click', "li", function(e){ 
      if (dropDown.hidden) {
        dropDown.reveal(200);
      } else {
        dropDown.selekt(e);
        dropDown.hide(200);
      }
    });


  },

  hide: function (time) {
    $("#drop-down li").not('.selected').hide(time);


    dropDown.hidden = true;
  },

  selekt: function(e) {
    $("#drop-down li").removeClass("selected");
    $(e.target).addClass("selected");
  },

  reveal: function (time) {
    $("#drop-down li").show(time)  //removeAttr("hidden");
    // $("#drop-down").slideDown(500);
    dropDown.hidden = false;
  },

  hoverOn: function(e) {
    $(e.target).addClass("mouse-over");
  },

  hoverOff: function(e) {
    $(e.target).removeClass("mouse-over");
  }


};


var validations = {
  init: function () {
    // $('.form-group').each(function () {
    //   $(this).on('keyup', validations.charcount);
    // });
    $('#username').on('keyup', function(e) { validations.charcount(e, 32) });
    $('#description').on('keyup', function(e) { validations.charcount(e, 140) });
    $('#password').on('keyup', function(e) { 
      validations.charcount(e, 16);
      validations.passwordMatch();
    });
    $('#confirm').on('keyup', function(e) { 
      validations.charcount(e, 16);
      validations.passwordMatch();
    });

    $('input[type=submit]').on('click', function(e) { 
      if (!validations.inputValidations() ) {
        e.preventDefault();
      }
    });
  },

  // checks value length of tag
  // creates a new tag that displays value
  // inserts new tag after textfield
  charcount: function (event, max) {
    var len = max - event.target.value.length;
    // var keyid = event.keyCode;
    if (len !== max) {
      if ( $(event.target).next().is("br")) {
        var $newTag = $('<span>');
        $newTag.insertAfter(event.target);
      }
      
      $(event.target).next().text("Characters remaining: " + len);
    } else {
      $(event.target).next().text("");
    }
  },

  passwordMatch: function() {
    if ($("#password").val() !== $("#confirm").val()) {
      $("#password").addClass("red");
      $("#confirm").addClass("red");
      return false;
    } else {
      $("#password").removeClass("red");
      $("#confirm").removeClass("red");
      return true;
    }
  },

  // Text field -- 4-32 characters
  // Text area -- 4-140 characters
  // Password/confirmation -- 6-16 characters
  // Password -- must match confirmation
  // display red error message and indicate which field is wrong
  inputValidations: function (event) {
    var valid = true;

    if (!validations.rangeCheck($("#username"), 4, 32 )) {
      valid = false;
    }

    if (!validations.rangeCheck($("#description"), 4, 140 )) {
      valid = false;
    }

    if (!validations.rangeCheck($("#password"), 6, 16 )) {
      valid = false;
    }

    if (!validations.rangeCheck($("#confirm"), 6, 16 )) {
      valid = false;
    }

    if (!validations.passwordMatch()) {

      validations.highlightError($("#confirm"), "Password confirmation must match");
      valid = false;
    }

    return valid;
  },

  highlightError: function($object, message) {
    if ( !$object.prev().is('span') ) {
      var $newTag = $('<span>');
      $newTag.insertBefore($object);
    }
    $object.addClass('red');
    $( $object.prev() ).addClass('red-text');
    $object.prev().text(message);
  },

  rangeCheck: function($object, min, max) {
    if ($object.val().length <= max && $object.val().length >= min) {
      return true;
    } else {
      validations.highlightError($object, "Must be between " + min + " and " + max +" characters");
      return false;
    }
  }

};

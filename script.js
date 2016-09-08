$(document).ready(function () {
  validations.init();
  dropDown.init();
});

var dropDown = {
  init: function() {
    
    $("#drop-down li").attr("hidden", "true");
    $("#drop-down li").first().removeAttr("hidden");

    $('#drop-down').on('click', "li", function(e){ 
      dropDown.unveal();
      dropDown.selekt(e);
      dropDown.reveal();
      
    });
  },

  unveal: function () {
    // adds hidden attribute to all list elements except for the selekted
    $("#drop-down li").attr("hidden", "true");
    $("#drop-down li").find(".selected").removeAttr("hidden");

  },

  selekt: function(e) {
    $("#drop-down li").removeClass("selected");
    $(e.target).addClass("selected");
  },

  reveal: function () {
    $("#drop-down li").removeAttr("hidden");
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

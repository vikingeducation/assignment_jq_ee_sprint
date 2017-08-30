// $(document).ready(function(){
//
//   var maxText = 32;
//
//   $('input#text-field').keydown(function() {
//     maxText = 32 - $(this).val().length;
//     if (maxText >= 0 && maxText <= 31) {
//       $( ".counter" ).text(maxText).show();
//     } else if (maxText === 32) {
//       $( ".counter" ).hide();
//     }
//   });
//
//   $("form.sign-up").submit( function(event) {
//     if ( $("form.sign-up input:first").val().length > 32 || $("form.sign-up input:first").val().length < 4  ) {
//       $(".error-message:eq(0)").text("Text Field cannot be shorter than 4 or longer than 32").show();
//       event.preventDefault();
//     }
//     if ( $("form.sign-up textarea").val().length > 140 || $("form.sign-up textarea").val().length < 4  ) {
//       $(".error-message:eq(1)").text("Text Area cannot be shorter than 4 or longer than 140").show();
//       event.preventDefault();
//     }
//     if ( $("form.sign-up input:nth-child(2)").val().length > 16 || $("form.sign-up input:nth-child(2)").val().length < 6  ) {
//       $(".error-message:eq(2)").text("Password has to be between 6 and 16 signs").show();
//       event.preventDefault();
//     }
//     if ( $("input#password").val() != $("input#password-conf").val() ) {
//       $(".error-message:eq(3)").text("Your password confirmation doesn't match").show();
//       event.preventDefault();
//     }
//   });
//
//
//
// });

var validateLength = {
  init: function (){
    $("form.sign-up").submit(
      validateLength.messageOfValidation(4,16, "Text Field", 0 ),
      validateLength.messageOfValidation(4,140, "Text Area", 1 ),
      validateLength.messageOfValidation(6,16, "Password", 2 ),
      validateLength.passwordConfirmation
    );
  },
  messageOfValidation: function(min, max, fieldType, fieldNumber) {
    if ( $("input:eq(" + fieldNumber + ")").val().length > max) {
      $(".error-message:eq(" + fieldNumber + ")").text(fieldType + " cannot be longer than " + max).show();
      event.preventDefault();
    } else if ($("input:eq(" + fieldNumber + ")").val().length < min  ) {
      $(".error-message:eq(" + fieldNumber + ")").text(fieldType + " cannot be shorter than " + min).show();
      event.preventDefault();
    }
  },
  passwordConfirmation: function() {
    if ( $("input#password").val() != $("input#password-conf").val() ) {
      $(".error-message:eq(3)").text("Your password confirmation doesn't match").show();
      event.preventDefault();
    }
  }
};

$(document).ready(function() {

  // validateLength.init();

  $("div.dropdown-wrapper").click(function() {
    if ( $("li#main-ex").is(":hidden") ) {
      $("ul").slideDown( "slow", function() {
        $("ul#sub").hide();
      });
    } else {
      if ( $('li#main-ex').data('clicked') ) {
        if ( $("li#sub").is(":hidden") ) {
          $("ul#sub").slideDown( "slow");
        } else {
          $("ul#sub").hide();
        }
      } else {
        $("ul#main").hide();
      };
    }
  });


  $("img").on('mousemove', function(e) {
    $("div.tag-box").css({
      left: e.pageX - 40,
      top: (e.pageY - 40)
    });
    $("img").on('click', function(e) {
      $("div.tag-box").css({
        left: e.pageX - 40,
        top: (e.pageY - 40)
      });
    });
  });










})

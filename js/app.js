var formHandlers = {
  init: function () {
    formHandlers.countRemainCharacter();
    formHandlers.textRemainCharacter();
    formHandlers.passwordRemainCharacter();
    formHandlers.passwordConfirmRemainCharacter();
    formHandlers.formValidate();
  },

  // countHelper: function(){
  //   var allowedLengthLeft = 32 - $(this).val().length;
  //   $('.input-counter').remove();
  //   if (allowedLengthLeft < 32){
  //     $(this).after($("<p></p>").text(allowedLengthLeft + " remaining words ")
  //                                 .addClass("input-counter"));
  //   };
  // },
  //
  // countRemainCharacter: function(){
  //   $("input[type='text']").keyup(function(){
  //     this.countHelper();
  //   });
  // },

  countRemainCharacter: function(){
    $("input[type=text]").keyup(function(){
      var allowedLengthLeft = 32 - $(this).val().length;
      $('.input-counter').remove();
      if (allowedLengthLeft < 32){
        $(this).after($("<p></p>").text(allowedLengthLeft + " remaining words ")
                                    .addClass("input-counter"));
      };
    });
  },

  textRemainCharacter: function(){
    $("textarea").keyup(function(){
      var allowedLengthLeft = 140 - $(this).val().length;
      $('.input-counter').remove();
      if (allowedLengthLeft < 140){
        $(this).after($("<p></p>").text(allowedLengthLeft + " remaining words ")
                                    .addClass("input-counter"));
      };
    });
  },

  passwordRemainCharacter: function(){
    $("input[name='Password']").keyup(function(){
      var allowedLengthLeft = 16 - $(this).val().length;
      $('.input-counter').remove();
      if (allowedLengthLeft < 16){
        $(this).after($("<p></p>").text(allowedLengthLeft + " remaining words ")
                                    .addClass("input-counter")
                                    );
      };
    });
  },

  passwordConfirmRemainCharacter: function(){
    $("input[name='Confirmation']").keyup(function(){
      var passwordInput = $("input[name='Password']").val();
      var passwordConfirm = $(this).val();
      $('.input-counter').remove();
      $('.password-check').remove();
      if (passwordConfirm !== passwordInput && passwordConfirm.length >=1){
        $(this).after($("<p></p>").text("password does not fit yet")
                                    .addClass("password-check"));
      } else {
        $('.password-check').remove();
      };
    });
  },

  formValidate: function(){
    $("form").submit(function(){
      $(".input-counter").remove();
      var title = $("input[type=text]");
      var textarea = $("textarea");
      var password = $("input[name='Password']");
      var confirmation = $("input[name='Confirmation']");confirmation
      var result = true;

      if (title.val().length < 4 || title.val().length > 32){
        $(".warning").remove();
        if ( !title.parent().hasClass("input-wrap") ){
          title.wrap("<div class='input-wrap'></div>");
        };
        title.after($("<p></p>").text("title length should be within 4 and 32")
                                .addClass("warning"));
        result = false;
      } else {
        if ( title.parent().hasClass("input-wrap") ){
          title.unwrap();
        };
      };

      if (textarea.val().length < 4 || textarea.val().length > 140) {
        if ( !textarea.parent().hasClass("input-wrap") ){
          textarea.wrap("<div class='input-wrap'></div>");
        };
        result = false;
      } else {
        if ( textarea.parent().hasClass("input-wrap") ){
          textarea.unwrap();
        };
      };

      if (password.val().length < 6 || password.val().length > 16) {
        if ( !password.parent().hasClass("input-wrap") ){
          password.wrap("<div class='input-wrap'></div>");
        };
        result = false;
      } else {
        if ( password.parent().hasClass("input-wrap") ){
          password.unwrap();
        };
      };

      if (confirmation.val().length < 6 || confirmation.val().length > 16) {
        if ( !confirmation.parent().hasClass("input-wrap") ){
          confirmation.wrap("<div class='input-wrap'></div>");
        };
        result = false;
      } else {
        if ( confirmation.parent().hasClass("input-wrap") ){
          confirmation.unwrap();
        };
      };

      if (confirmation.val() !== password.val()){
        if ( !confirmation.parent().hasClass("input-wrap") ){
          confirmation.wrap("<div class='input-wrap'></div>");
        };
        if ( !password.parent().hasClass("input-wrap") ){
          password.wrap("<div class='input-wrap'></div>");
        };
        result = false;
      } else {
        if ( confirmation.parent().hasClass("input-wrap") ){
          confirmation.unwrap();
        };
        if ( password.parent().hasClass("input-wrap") ){
          password.unwrap();
        };
      };

      return result;
    });
  },

};


$(document).ready(function () {
  formHandlers.init();
});

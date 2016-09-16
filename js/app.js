var formHandlers = {
  init: function () {
    formHandlers.countRemainCharacter();
    formHandlers.textRemainCharacter();
  },

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
};


$(document).ready(function () {
  formHandlers.init();
});

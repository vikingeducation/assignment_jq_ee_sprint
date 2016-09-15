var formHandlers = {
  init: function () {
    $("input[type=text]").keyup(function(){
      allowedLength = 32 - $(this).val().length;
      if (allowedLength < 32){
        $(this).after($("<h1></h1>").text(allowedLength)
                                    .addClass("input-counter"));
      };
      $('.input-counter').remove();
    });
  },

  countInputCharacter: function(){

  },
};


$(document).ready(function () {
  formHandlers.init();
});

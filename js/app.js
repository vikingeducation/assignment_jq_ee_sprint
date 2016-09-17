var formHandlers = {
  init: function () {
    var title = {
      jqObject: $("input[type=text]"),
      minLength: 4,
      maxLength: 32,
    };
    var text = {
      jqObject: $("textarea"),
      minLength: 4,
      maxLength: 140,
    };
    var password = {
      jqObject: $("input[name='Password']"),
      minLength: 6,
      maxLength: 16,
    };
    var confirmation = {
      jqObject: $("input[name='Confirmation']"),
      minLength: 6,
      maxLength: 16,
    };

    formHandlers.inputCounter(title);
    formHandlers.inputCounter(text);
    formHandlers.inputCounter(password);
    formHandlers.passwordValueCheck(password, confirmation);

    formHandlers.lengthValidate(title);
    formHandlers.lengthValidate(text);
    formHandlers.lengthValidate(password);

    // formHandlers.formValidate();
  },

  inputCounter: function(input){
    var inputObject = input.jqObject;
    var max = input.maxLength;
    inputObject.keyup(function(){
      $('.input-counter').remove();
      var allowedLengthLeft = max - inputObject.val().length;
      if (allowedLengthLeft < max){
        inputObject.after($("<p></p>").text(allowedLengthLeft + " remaning")
        .addClass("input-counter"));
      };
    });
    inputObject.change(function(){
      $('.input-counter').remove();
    });
  },

  passwordValueCheck: function(password, confirmation){
    var result = false;
    confirmation.jqObject.change(function(){
      var passwordValue = password.jqObject.val();
      var confirmValue = confirmation.jqObject.val();
      $('.password-check').remove();
      if (passwordValue !== confirmValue && confirmValue.length > 1){
        confirmation.jqObject.after($("<p></p>").text("Warning! Password does not fit!")
                                                .addClass("password-check"));
      } else {
        result = true;
      }
    });

    $('input[type=submit]').click(function(){
      return result;
    });
  },

  lengthValidate: function(input){
    var inputObject = input.jqObject;
    var min = input.minLength;
    var max = input.maxLength;
    inputObject.change(function(){
      var objectLength = inputObject.val().length;
      if (objectLength >= min && objectLength <= max){
        inputObject.next().remove();
        inputObject.parent().removeClass("warning-line");
      };
    });

    $('input[type=submit]').click(function(){
      var objectLength = inputObject.val().length;
      if (inputObject.parent().hasClass('warning-line')){
        inputObject.next().remove();
        inputObject.parent().removeClass("warning-line");
      };
      if (objectLength < min || objectLength > max){
        inputObject.after($("<p></p>").addClass("warning")
                                      .text("Warning, maximum length " + max + ", minimum length " + min));
        inputObject.parent().addClass("warning-line");
        return false;
      };
    });
  },

};


var dropdown = {
  init: function(){
    $('.dropdown-menu ul').click(function(){
      $(this).children('li').fadeToggle(500);
    });

    $('.dropdown-menu ul li').hover(
      function(){
        $(this).addClass("bg-green").css( 'cursor', 'pointer' );
      },
      function(){
        $(this).removeClass("bg-green");
      }
    );

    $('.dropdown-menu ul p').hover(
      function(){
        $(this).css( 'cursor', 'pointer' );
      }
    );

    $('.dropdown-menu ul li').click(function(){
      $('.dropdown-menu ul p').text($(this).text());
    });

  },
};

var photoTagging = {
  init: function(){
    $('.photo-wrap').hover(
      function(){
        $(".photo-tag").show();
      },
      function(){
        $(".photo-tag").hide();
      }
    );

    $('.photo-wrap').mousemove(
      function(event){
        $(".photo-tag").css({left: event.pageX - 25, top: event.pageY -25});
      });

    $('.photo-wrap').click(function(event){
      $('.photo-wrap').append(
        $("<div></div>").addClass("fixed-tag")
                        .append($('.name-list').slideToggle(500))
                        .css({left: event.pageX - 25, top: event.pageY -25})
      );
      $('.photo-tag').hide();
    });
  },


}


$(document).ready(function () {
  formHandlers.init();
  dropdown.init();
  photoTagging.init();
});


var formHandlers = {

  handlerTextLimit: function(eventObj) {
    // obtain class of object and find that object with that class
    // and char-count
    var target = $(eventObj.target);
    var className = target.attr("class").split(' ')[0];
    var len = target.val().length;
    var maxChar = target.attr("char-high");

    // Locate elements with the className and "char-count" class
    var charCountEle = $("." + className + ".char-count");
    // case 1: no input
    if (len < 1) {
      $(charCountEle).text("");
    }
    // case 2: greater than 0 and valid length
    else if (-1 < maxChar - len) {
      $(charCountEle)
      .text(maxChar - len + " remaining characters...")
      .attr("style", "color: black");
    }
    // case 3: input is too large
    else if (len > maxChar) {
      $(charCountEle)
      .text("TOO MANY CHARACTERS!!!")
      .attr("style", "color: red");
    }
  },


  handlerPasswordConformation: function(eventObj) {
    var target = $(eventObj.target);
    var className = target.attr("class").split(' ')[0];
    var len = target.val().length;

    // Locate elements with the className and "char-match" class
    var charMatchEle = $("." + className + ".char-match");

    // no input
    if (len < 1) {
      $(charMatchEle).text("");
    } else {
      // locate both password inputs
      var passwordArray = $("input[type='password']");

      if($(passwordArray[0]).val() === $(passwordArray[1]).val()){
        $(charMatchEle)
        .text("Passwords are a match!")
        .attr("style", "color: green");
      } else {
        $(charMatchEle)
        .text("Passwords don't match..")
        .attr("style", "color: red");
      }
    }
  },


  handlerSubmit: function(){
    $(".create").each(
      function() {
        var targetInput = $(this);
        var className = targetInput.attr("class").split(' ')[0];
        var targetPar = $("p." + className + ".char-count");
        var len = targetInput.val().length;
        var charLow = targetInput.attr("char-low");
        var charHigh = targetInput.attr("char-high");

        if(charLow > len){
          $(targetPar)
          .text("Need at least " + charLow + " characters!")
          .attr("style", "color: red");
        } else if(charHigh < len){
          $(targetPar)
          .text("Need less than " + charHigh + " characters!")
          .attr("style", "color: red");
        }
      }
    );
  }

}

$(document).ready(function() {

  $(".username").on("change keyup paste", function(eventObj) {
    formHandlers.handlerTextLimit(eventObj);
  });

  $("textarea").on("change keyup paste", function(eventObj) {
    formHandlers.handlerTextLimit(eventObj);
  });

  $(".password-original").on("change keyup paste", function(eventObj) {
    formHandlers.handlerTextLimit(eventObj);
  });

  $(".password-conformation").on("change keyup paste", function(eventObj) {
    formHandlers.handlerTextLimit(eventObj);
  });

  $(".password-conformation").on("change keyup paste", function(eventObj) {
    formHandlers.handlerPasswordConformation(eventObj);
  });

  $("input[type='submit']").on("click", formHandlers.handlerSubmit);



});

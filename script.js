  var scriptMethods = { 
    charactersRemaining: function(targetElement, limit) {   
      $(targetElement).bind("change keyup input",function(e) {

        var limitNum = limit;

        if ($(this).val().length > limitNum) {
          $(this).val($(this).val().substring(0, limitNum));
        }

        currentEle = $(e.target);

        var inputLength = currentEle.val().length;

        $(currentEle).next().text(limitNum - inputLength + " characters remaining");

        if (inputLength === 0) {
          $(currentEle).next().hide();
        } else {
          $(currentEle).next().show();
        }

      });
    }
  }
$(document).ready(function() {

  scriptMethods.charactersRemaining('input[type="text"]', 32);
  scriptMethods.charactersRemaining('textarea', 140);
  scriptMethods.charactersRemaining('input[type="password"]', 16);

});

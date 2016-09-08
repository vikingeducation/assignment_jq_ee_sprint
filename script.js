var scriptMethods = {
  charactersRemaining: function(targetElement, limit) {
    $(targetElement).bind("change keyup input",function(e) {

      var limitNum = $(targetElement).attr('max');

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
  },

  passwordMatch: function() {
    $('input[name="confirmation"]').on('keyup', function(e) {

      var currentEle = $(e.target);
      var confVal = currentEle.val();
      var passVal = $('input[name="password"]').val();

      if (confVal === passVal) {
        $('.validation').hide();
      } else {
        $('.validation').text("Passwords don't match");
        $('.validation').show();
      }

    });

  },

  inputs: ['input[name="password"]', 'input[name="confirmation"]', 'input[type="text"]', 'textarea'],
  names: ['pass', 'conf', 'text', 'area'],

  checkInputs: function() {
    $('input[type="submit"]').on('click', function(e) {

      var names = scriptMethods.names;
      var inputs = scriptMethods.inputs;

      var vals = {},
          mins = {},
          errors = {};

      for (var i = 0; i < 2; i++) {
        for (var j = 0; j < inputs.length; j++) {
          if (i === 0) {
            vals[names[j]] = $(inputs[j]).val();
          } else {
            mins[names[j]] = $(inputs[j]).attr('min');
          }
        }
      }

      for (var i = 0; i < names.length; i++) {

        if (vals[names[i]].length < mins[names[i]]) {
          e.preventDefault();
          errors[inputs[i]] = "This is too short";
        };
      };

      if ($('input[name="password"]').val() !== $('input[name="confirmation"]').val() ) {
        e.preventDefault();
        if (!errors['input[name="confirmation"]']) {
          errors['input[name="confirmation"]'] = "true";
        };
      }

      for (var items in errors) {
        $(items).addClass('error');
        if (errors[items] !== "true") {
          var errorEle = '<p class="error-message">' + errors[items] + '</p>';
          $(items).next().after(errorEle);
        };
      }

    });
  },

  dropdownMenu: function() {
    $('ul').on('click', function(e) {
      var currentEle = $(e.currentTarget);
      var eleChildren = currentEle.children().filter(function(index){
        if (index > 0) {
          return $(this);
        };
      });
      eleChildren.toggle(500);
    });
  },

  liHover: function() {
    $( "li" ).hover(
      function() {
        $( this ).addClass( "hovered" );
      }, function() {
        $( this ).removeClass( "hovered" );
      }
    );
  },

  liSelect: function() {
    $("li").on('click', function(e) {
      var currentEle = $(e.target);
      $('ul').prepend(currentEle);
    });
  }

}
$(document).ready(function() {

  scriptMethods.charactersRemaining('input[type="text"]');
  scriptMethods.charactersRemaining('textarea');
  scriptMethods.charactersRemaining('input[type="password"]');
  scriptMethods.passwordMatch();
  scriptMethods.checkInputs();
  scriptMethods.dropdownMenu();
  scriptMethods.liHover();
  scriptMethods.liSelect();

});

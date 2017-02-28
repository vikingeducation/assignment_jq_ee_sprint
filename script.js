$(document).ready(function () {
  var Counter = {
    count: function (field, fieldCounter, fieldMax) {
      var length = field.val().length
      if (length === 0) {
        fieldCounter.html('');
      } else {
        fieldCounter.html(fieldMax - length);
      }
    }
  }
  var Validator = {
    validateChars: function (field, fieldErr, fieldMin, fieldMax) {
      if ((field.val().length < fieldMin) || (field.val().length > fieldMax)) {
        fieldErr.html('Value must be between ' + fieldMin + ' and ' + fieldMax + ' characters.')
        field.css('border-color', 'red')
      };
    },
    validPass: function (field, pass, confErr) {
      if (field.val() != pass.val()) {
        confErr.html('Passwords must match.');
        field.css('border-color', 'red');
      };
    },
    confirmPass: function (field, confMes, pass) {
      if (field.val().length === 0) {
        confMes.html('');
      } else if (field.val() != pass.val()) {
        confMes.html('Passwords do not match.');
      } else {
        confMes.html('')
      };
    },
    reset: function () {
      $('#nameErr').html('');
      $('#emailErr').html('');
      $('#passErr').html('');
      $('#confErr').html('');
      $('input').css('border-color', 'black');
    }
  };
  $('#name').keyup(function () {
    Counter.count($('#name'), $('#nameCounter'), 32);
  });
  $('#email').keyup(function () {
    Counter.count($('#email'), $('#emailCounter'), 140);
  });
  $('#pass').keyup(function () {
    Counter.count($('#pass'), $('#passCounter'), 16);
  });
  $('#conf').keyup(function () {
    Validator.confirmPass($('#conf'), $('#confMessage'), $('#pass'));
    Counter.count($('#conf'), $('#confCounter'), 16);
  });
  $('#myForm').submit(function () {
    Validator.reset();
    Validator.validateChars($('#name'), $('#nameErr'), 4, 32);
    Validator.validateChars($('#email'), $('#emailErr'), 4, 140);
    Validator.validateChars($('#pass'), $('#passErr'), 6, 16);
    Validator.validPass($('#conf'), $('#confMessage'), $('#pass'));
    return false;
  });
//end form exercise
  $('#menu').click(function () {
    $('.items').slideToggle('slow');
  });

});

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
// end form exercise
  $('#menu').click(function () {
    $('.items').slideToggle('slow', function () {
      $('.items').css('background-color', 'blue');
    });
  });
  $('.items').click(function () {
    $('.items').slideToggle('slow');
    $('#menu').html($(this).text());
    $('form').submit();
  });
  $('.items').hover(function () {
    $(this).css('background-color', 'yellow').css('cursor', 'pointer');
  }, function () {
    $(this).css('background-color', 'blue').css('cursor', 'default');
  });


// end dropdown exercise
  document.onmousemove = function (e) {
    $('#photo').hover(function () {
      $('#targ').css('visibility', 'visible');
      }, function () {
      $('#targ').css('visibility', 'hidden');
      });
    $('#targ').css('position', 'absolute').css('left', (e.pageX - 50) + 'px').css('top', (e.pageY - 75) + 'px');
  };


  $('#photoWrap').click(function (e) {
    var currentX = e.pageX;
    var currentY = e.pageY;

    $('.names').slideDown('slow', function () {
      $('.names').css('background-color', 'red');
        $('#29').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 75) + 'px')
        $('#58').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 95) + 'px')
        $('#28').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 115) + 'px')
        $('#72').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 135) + 'px')
        $('#62').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 155) + 'px')

    });

    $("<div class='clickedOutline'></div>").appendTo($('#targ')).css('position', 'fixed').css('left', (currentX - 50) + 'px').css('top', (currentY - 122) + 'px')
   });
});

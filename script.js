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
//   document.onmousemove = function (e) {
//     var tagged = false;
//     var named = false;
//
//     $('#photo').hover(function () {
//       $('#targ').css('visibility', 'visible');
//       }, function () {
//       $('#targ').css('visibility', 'hidden');
//       });
//     $('#targ').css('position', 'absolute').css('left', (e.pageX - 50) + 'px').css('top', (e.pageY - 75) + 'px');
//   };
//
//   $('#photoWrap').click(function (e) {
//     var currentX = e.pageX;
//     var currentY = e.pageY;
//     var nameX = e.pageX - 50;
//     var nameY = e.pageY + 15;
//     var tagged = true;
//     $("<div class='clickedOutline'></div>").appendTo($('#targ')).css('position', 'fixed').css('left', (currentX - 50) + 'px').css('top', (currentY - 122) + 'px')
//     $('.names').slideDown('slow', function () {
//       $('.names').css('background-color', 'red');
//         $('#29').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 75) + 'px')
//         $('#58').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 95) + 'px')
//         $('#28').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 115) + 'px')
//         $('#72').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 135) + 'px')
//         $('#62').css('position', 'absolute').css('left', (currentX - 50) + 'px').css('top', (currentY + 155) + 'px')
//     }); //end names Slide Down
//       $('.names').click(function () {
//         var currentName = $(this).text();
//         // $("<div class='nameBar'></div>").appendTo($('.clickedOutline')).css('position', 'fixed').css('left', (nameX) + 'px').css('top', (nameY) + 'px').css('background-color', 'red');
//         $('.nameBar').html(currentName);
//         $('.names').slideUp('slow');
//         named = true;
//   });
//
//       $('#photowrap2').click(function () {
//         if ((tagged) && (!named)) {
//           alert('cancel');
//         } else
//           $("<div class='clickedOutline'></div>").appendTo($('#targ')).css('position', 'fixed').css('left', (currentX - 50) + 'px').css('top', (currentY - 122) + 'px')
//         });
//         tagged = false;
//         name = false;
//
//   }); // end photowrap

    var _borderWidth = 8;
    var _taggerPosition = {};
    var _people = [
      'Marc-Andre',
      'Kris',
      'Ian',
      'Patric',
      'Carl'
    ];

    // ----------------------------------------
    // Tagger Position
    // ----------------------------------------
    var _setTagPosition = function($tag, x, y) {
      var offset = $('.image-container').offset();
      var width = $('.image-container').width();
      var height = $('.image-container').height();

      y = y - offset.top;
      x = x - offset.left;

      var w = $tag.width() + _borderWidth * 2;
      var h = $tag.height() + _borderWidth * 2;

      y -= h / 2;
      x -= w / 2;

      y = (y < 0) ? 0 : y;
      x = (x < 0) ? 0 : x;

      var maxHeight = height - h;
      var maxWidth = width - w;

      y = (y > maxHeight) ? maxHeight : y;
      x = (x > maxWidth) ? maxWidth : x;

      $tag.css({
        "z-index": 100,
        "position": 'absolute',
        "top": y + 'px',
        "left": x + 'px'
      });
    };

    // ----------------------------------------
    // Add Tagger to Container
    // ----------------------------------------
    var _createTagger = function() {
      $('.image-container').prepend('<div id="tagger" class="tag"></div>');
      $('#tagger').css('border-width', _borderWidth + 'px');
    };

    // ----------------------------------------
    // Add Menu to Tagger
    // ----------------------------------------
    var _createTaggerMenu = function() {
      $('#tagger .menu').remove();
      var $ul = $('<ul class="menu"></ul>');

      _people.forEach(function(person, index) {
        var $a = $('<a></a>');
        $a.attr('href', '#');
        $a.attr('data-person-id', index);
        $a.text(person);
        var $li = $('<li></li>');
        $li.append($a);
        $ul.append($li);
      });

      $('#tagger').append($ul);

      _setMenuAnchorClickEvents();
    };

    // ----------------------------------------
    // Menu Anchor Click
    // ----------------------------------------
    var _setMenuAnchorClickEvents = function() {
      $('#tagger .menu a').click(function(e) {
        e.preventDefault();

        var $a = $(e.target);
        var $tag = $('<div class="tag"></div>');
        $tag.css('border-width', _borderWidth + 'px');
        var $p = $('<p>' + $a.text() + '</p>');
        $tag.append($p);
        $('.image-container').prepend($tag);
        _people.splice(~~$a.attr('data-person-id'), 1);
        _setTagPosition($tag, _taggerPosition.x, _taggerPosition.y);

        $('#tagger').removeClass('locked');


        return false;
      });
    };

    // ----------------------------------------
    // Show Hide Tagger
    // ----------------------------------------
    $('.image-container').hover(function(e) {
      $('#tagger').show();
    }, function(e) {
      if (!$('#tagger').hasClass('locked')) {
        $('#tagger').hide();
      }
    });

    // ----------------------------------------
    // Lock Tagger on Click
    // ----------------------------------------
    $('.image-container').on('click', function(e) {
      var $tag = $('#tagger');
      $tag.toggleClass('locked');
      if ($tag.hasClass('locked')) {
        _createTaggerMenu();
      }
    });

    // ----------------------------------------
    // Position Tagger on Mouse Move
    // ----------------------------------------
    $('.image-container img').mousemove(function(e) {
      _taggerPosition.x = e.pageX;
      _taggerPosition.y = e.pageY;
      if (!$('#tagger').hasClass('locked')) {
        _setTagPosition($('#tagger'), e.pageX, e.pageY);
      }
    });

    // ----------------------------------------
    // Init Tagger
    // ----------------------------------------
    _createTagger();

}); // doc ready

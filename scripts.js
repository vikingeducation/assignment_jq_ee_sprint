var formHandler = {

  usernameLengthBool : false,
  passwordLengthBool : false,
  passwordBool : false,
  messageBool : false,

  init: function() {

    //Hide all helper text first
    $('.helper-text').hide();

    $('#username').on('input', function(e) {
      formHandler.usernameLengthBool = formHandler.textCounter(e, 4, 32, $('#username-helper'));
    });
    $('#password').on('input', function(e) {
      formHandler.passwordLengthBool = formHandler.textCounter(e, 6, 16, $('#password-helper'));
    });
    $('#password-confirm').on('input', function(e) {
      formHandler.passwordBool = formHandler.passwordCheck(e);
    });
    $('#msg').on('input', function(e) {
      formHandler.messageBool = formHandler.textCounter(e, 4, 140, $('#msg-helper'));
    });
    $('#form').on('submit', function(e) {
      formHandler.validateSubmission(e);
    });
  },

  textCounter: function(e, minLimit, maxLimit, $counterId) {
    var target = e.target;
    if(target.value.length > 0) {
      $counterId.show();
    }
    else {
      $counterId.hide();
    }
    if(target.value.length > maxLimit) {
      $(target).val(target.value.slice(0, maxLimit));
    }
    $counterId.text(maxLimit - target.value.length + " characters remaining.");

    if(target.value.length >= minLimit && target.value.length <= maxLimit) {
      return true;
    }
    else {
      return false;
    }
  },

  passwordCheck: function(e) {
    var oriPass = $('#password').val();
    var checkPass = e.target.value;
    var $passwordMatch = $('#password-match');

    if(checkPass.length > 0) {
      $passwordMatch.show();
    }
    else {
      $passwordMatch.hide();
    }

    if(checkPass !== oriPass) {
      $passwordMatch.text("Passwords do not match!");
      return false;
    }
    else {
      $passwordMatch.text("Passwords are OK.");
      return true;
    }
  },

  validateSubmission: function(e) {
    e.preventDefault();
    $('input').removeClass('red-warning');
    $('textarea').removeClass('red-warning');

    $('.helper-text').hide();

    if(formHandler.usernameLengthBool === false) {
      $('#username').addClass('red-warning');
      $('#username-helper').show().text("Username must be between 4 - 32 characters.")
    }

    if(formHandler.passwordLengthBool === false) {
      $('#password').addClass('red-warning');
      $('#password-helper').show().text("Password must be between 6 - 16 characters.")
    }
    else if(formHandler.passwordBool === false) {
      $('#password-confirm').addClass('red-warning');
      $('#password-match').show().text("Passwords do not match!")
    }

    if(formHandler.messageBool === false) {
      $('#msg').addClass('red-warning');
      $('#msg-helper').show().text("Message must be between 5 - 140 characters.")
    }
  }
};

var dropdownHandler = {

  isOpen: false,

  init: function() {
    $('#select-list li:nth-child(n+2)').hide();

    $('.item').on('click', function(e) {
      dropdownHandler.dropdownDisplay(e);
    });
  },

  dropdownDisplay : function(e) {
    if(dropdownHandler.isOpen === false) {
      $('.blank-item').remove();
      $('#select-list li').slideDown();

      dropdownHandler.isOpen = true;
    }
    else {
      $target = $(e.target);
      $('.item').removeClass('chosen-item');
      $target.addClass('chosen-item');
      $('#select-list li').not('.chosen-item').slideUp();
      dropdownHandler.isOpen = false;
    }

  },
}

var photoTagger = {

  cursorActive : false,
  tagFrameActive : false,

  init: function() {
    //Mouse movement
    $('#photo').on('mousemove', function(e) {
      photoTagger.movePhotoTag(e); //only act if the parent is targeted
    });

    //Show and hide photo tag cursor
    $('#photo')
    .on('mouseenter', function(e) {
      if(!photoTagger.tagFrameActive) {
        photoTagger.displayPhotoTag(e, true);
      }

    })
    .on('mouseleave', function(e) {
      if(!photoTagger.tagFrameActive) {
        photoTagger.displayPhotoTag(e, false);
      }
    });

    $('#photo').on('click', function(e) {
      photoTagger.placePhotoTagFrame(e);
    });

    $('.photo-tag-active').first().not('.placed').find('li').on('click', function(e) {
      $(this).addClass('selected-name');
      $(this).parent().addClass('placed');
      $(this).siblings().remove();
    });

  },

  displayPhotoTag : function(e, showBool) {
    photoTagger.cursorActive = showBool;
    if(showBool) {
      var $tagCursor = $('<div></div>');
      $(e.target).before($tagCursor);
      $tagCursor.addClass('photo-tag')
        .attr('id', 'photo-tag-cursor');
    }
    else {
      $('#photo-tag-cursor').remove();
    }
  },

  movePhotoTag : function(e) {
    $target = $(e.target);

    $('#photo-tag-cursor').css({
      left: e.pageX - $target.offset().left - 40,
      top: e.pageY - $target.offset().top - 40
    });
  },

  placePhotoTagFrame : function(e) {
    $target = $(e.target);
    if(photoTagger.cursorActive && !photoTagger.tagFrameActive) {
      $('#photo-tag-cursor').remove();
      photoTagger.cursorActive = false;
      photoTagger.tagFrameActive = true;
      var $tagFrame = $('<div></div>');
      $tagFrame.append('<ul></ul>');
      $tagFrame.find('ul').append('<li>Alex</li>')
        .append('<li>Lisa</li>')
        .append('<li>Tom</li>');
      $target.before($tagFrame);
      $tagFrame.addClass('photo-tag-active');
      $tagFrame.css({
        left: e.pageX - $target.offset().left - 40,
        top: e.pageY - $target.offset().top - 40
      });

      $tagFrame.not('.placed').find('li').on('click', function(e) {
        $tagFrame.addClass('placed');
        $(this).addClass('selected-name');
        $(this).siblings().remove();
        $(this).off('click');
        photoTagger.tagFrameActive = false;
      });
    }
    else if(photoTagger.tagFrameActive) {
      photoTagger.tagFrameActive = false;
      $('.photo-tag-active').not('.placed').remove();
      photoTagger.displayPhotoTag(e, true);
    }
  }
}

$(document).ready(function() {
  formHandler.init();
  dropdownHandler.init();
  photoTagger.init();
});

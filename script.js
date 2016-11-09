var validation = {
  init: function() {
    $('input#username').on('input',function(e){
      validation.displayRemainingChar(e);
    });
    $('#info').on('input', function(e){
      validation.displayRemainingChar(e);
    });
    $('#password').on('input', function(e){
      validation.displayRemainingChar(e);
    });
    $('#password_conf').on('input', function(e){
      validation.matchPassword(e);
    });
    $('#submit').on('click', function(e) {
      validation.run(e);
    });
  },

  displayRemainingChar: function(event){
    var max = parseInt($(event.target).attr("maxlength"));
    var count = (max - $(event.target).val().length).toString();
    var span = $(event.target).next('span');
    if (count == max) {
      span.text('');
    } else if (count > 0) {
      span.text(' (Remaining Chars: ' + count + ' )');
    }
  },

  matchPassword: function(event) {
    var password = $('#password').val();
    var password_conf = $(event.target).val();
    var span = $(event.target).next('span');
    if (password_conf.length > 0 && password_conf !== password) {
      span.text(' (password confirmation does not match)');
    } else {
      span.text('');
    }
  },

  validate_length: function(targetObject, minLength, maxLength) {
    if (targetObject.val().length < minLength || targetObject.val().length > maxLength) {
      targetObject.addClass('red');
      span = $('<span class="error"></span>').text(targetObject.attr('id') + ' must be between ' + minLength +'and ' + maxLength +' chars in length');
      span.insertAfter(targetObject.next());
    } else {
      targetObject.removeClass('red');
    }
  },

  run: function(event) {
    event.preventDefault();
    var username = $('#username')
    var info = $('#info');
    var password = $('#password');
    $('.error').remove()
    this.validate_length(username, 4, 32);
    this.validate_length(info, 4, 140);
    this.validate_length(password, 6, 16);
  }
}

var dropdown = {
  init: function() {
   $('.dropdown ul li').hover(
      function() {
        $(this).addClass("bg-green").css('cursor', 'pointer');
      },
      function() {
        $(this).removeClass("bg-green");
      }
    );

    $('.dropdown ul li').on("click", function() {
      $(this).siblings().slideToggle(300)
    })

    $('.dropdown ul li').first().trigger( "click" );
  }
};

var tagging = {
  init: function() {
    $('.image-container').hover(
      function() {
        $('.image-tag').show();
      },
      function() {
        $('.image-tag').hide();
      }
    );

    $('.image').on('mousemove', function(event) {
        $('.image-tag').css({left: event.pageX - 50, top: event.pageY - 50});
    });

    var imageTagListener = function() {
      $('.image-container').on('click', function(event) {
        //Adding the temp tag box
        var fixedTag = $('.image-tag').clone()
                                       .removeClass('image-tag')
                                       .addClass('fixed-image-tag')
        $(this).append(fixedTag[0]);

        var nameList = $('<div class="name-list"><ul><li>Bell</li><li>Ben</li><li>Brown</li></ul></div>');
        nameList.appendTo(fixedTag).slideDown(1000);

        //Unbind mousemove event
        $('.image').off('mousemove');
        $('.image-container').off('click');
        selectBoxListener(nameList);
      });
    }
    var selectBoxListener = function(nameList) {
        nameList.on("click", "ul li", function(event) {
        $(this).siblings().slideUp(300)
        event.stopPropagation();

        $('.image').on('mousemove', function(event) {
          $('.image-tag').css({left: event.pageX - 50, top: event.pageY - 50});
        });

        imageTagListener();
      })
    }

    $('.image-container').on('mouseenter', ".name-list ul li", function() {
        $(this).addClass("bg-green").css('cursor', 'pointer');
    });

    $('.image-container').on('mouseleave', ".name-list ul li", function() {
        $(this).removeClass("bg-green");
    });

    imageTagListener();
  }
}


$(document).ready( function() {
  validation.init();
  dropdown.init();
  tagging.init();
});



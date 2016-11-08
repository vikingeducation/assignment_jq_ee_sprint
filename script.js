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

    $('.image-container').on('click', function(event) {
      //Adding the temp tag box
      var inprogTag = $('.image-tag').clone()
                                     .removeClass('image-tag')
                                     .addClass('inprogress-image-tag')
      this.append(inprogTag[0]);

      //Name-list slideDown
      var nameList = $('.name-list')
      $(inprogTag).append(nameList.slideDown(500))

      //Unbind mousemove event
      $('.image').off('mousemove');
      $('.image-container').off('click');
    });

    $('.name-list li').on("click", function() {
      $(this).siblings().slideUp(300)

      $('.image').on('mousemove', function(event) {
        $('.image-tag').css({left: event.pageX - 50, top: event.pageY - 50});
      });

      // $('.image-container').on('click', function(event) {
      //   //Adding the temp tag box
      //   var inprogTag = $('.image-tag').clone()
      //                                  .removeClass('image-tag')
      //                                  .addClass('inprogress-image-tag')
      //   this.append(inprogTag[0]);

      //   //Name-list slideDown
      //   var nameList = $('.name-list')
      //   $(inprogTag).append(nameList.slideDown(500))

      //   //Unbind mousemove event
      //   $('.image').off('mousemove');
      //   $('.image-container').off('click');
      // });
    })
    $('.name-list li').hover(
      function() {
        $(this).addClass("bg-green").css('cursor', 'pointer');
      },
      function() {
        $(this).removeClass("bg-green");
      }
    );
  }
}


$(document).ready( function() {
  validation.init();
  dropdown.init();
  tagging.init();
});



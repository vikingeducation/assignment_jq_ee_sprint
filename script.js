var validation = {
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

$(document).ready( function() {
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
});
$(document).ready(function(){
  $('#name').keyup(function(){
    var length = $(this).val().length
    if (length === 0) {
      $('#nameCounter').html('');
    } else {
      $('#nameCounter').html(32 - length);
    }
  })
  $('#email').keyup(function(){
    var length = $(this).val().length
    if (length === 0) {
      $('#emailCounter').html('');
    } else {
      $('#emailCounter').html(140 - length);
    }
  })
  $('#pass').keyup(function(){
    var length = $(this).val().length
    if (length === 0) {
      $('#passCounter').html('');
    } else {
      $('#passCounter').html(16 - length);
    }
  })
  $('#conf').keyup(function(){
    var length = $(this).val().length
    if (length === 0) {
      $('#confCounter').html('');
    } else {
      $('#confCounter').html(16 - length);
    }
  })
  $('#conf').keyup(function(){
    var length = $(this).val().length
    if (length === 0) {
      $('#confMessage').html('');
    } else if ($(this).val() != $('#pass').val()) {
      $('#confMessage').html("Passwords do not match.");
    } else {
      $('#confMessage').html("")
    }
  })
  $('#submit').click(function() {
    reset()
    var n = $('#name').val()
    if ((n.length < 4) || (n.length > 32)) {
      $('#nameErr').html('Name must be between 4 and 32 characters.')
      $('#name').css('border-color', 'red')
      return false
    };
    var e = $('#email').val()
    if ((e.length < 4) || (e.length > 140)) {
      $('#emailErr').html('Email must be between 4 and 140 characters.')
      $('#email').css('border-color', 'red')
      return false
    };
    var p = $('#pass').val()
    if ((p.length < 6) || (p.length > 16)) {
      $('#passErr').html('Password must be between 6 and 16 characters.')
      $('#pass').css('border-color', 'red')
      return false
    };
    var c = $('#conf').val()
    if (c != p) {
      $('#confErr').html('Passwords must match.')
      $('#conf').css('border-color', 'red')
      return false
    };
  })
  var reset = function(){
    $('#nameErr').html('')
    $('#name').css('border-color', 'black')
    $('#emailErr').html('')
    $('#email').css('border-color', 'black')
    $('#passErr').html('')
    $('#pass').css('border-color', 'black')
    $('#confErr').html('')
    $('#conf').css('border-color', 'black')
  }
})

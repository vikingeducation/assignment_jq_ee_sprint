$(document).ready(function(){
    $('#name').keyup(function(){
      var length = $(this).val().length;
      if (length == 0) {
        $('#nameCounter').html('');
      } else  {
        $('#nameCounter').html(32 - length);
      }
    });
    $('#email').keyup(function(){
      var length = $(this).val().length;
      if (length == 0) {
        $('#emailCounter').html('');
      } else  {
        $('#emailCounter').html(140 - length);
      }
    });
    $('#pass').keyup(function(){
      var length = $(this).val().length;
      if (length == 0) {
        $('#passCounter').html('');
      } else  {
        $('#passCounter').html(16 - length);
      }
    });
    $('#conf').keyup(function(){
      var length = $(this).val().length;
      if (length == 0) {
        $('#confCounter').html('');
      } else  {
        $('#confCounter').html(16 - length);
      }
    });
})

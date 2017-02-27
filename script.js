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
})

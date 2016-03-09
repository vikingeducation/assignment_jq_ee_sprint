

$(document).ready(function() {

  // show remaining characters
  $('.char-count input, .char-count textarea').on("input",
    function() {
      // grab max characters from data-max tag
      var max = $(this).data("max");
      var charCount = (max - $(this).val().length);

      // stop accepting characters at 0
      if (charCount <= 1) {
        $(this).val($(this).val().substring(0,max-1));
      }

      // set html of closest span
      $(this).closest(".char-count").find('span').html(charCount + " characters remaining");

    });

  // password matching password confirmation
  $('#passwordconfirm').on("input",
    function(){
      // what's in pw fields?
      var pw = $('#password').val()
      var pwc = $('#passwordconfirm').val()

      if (pw != pwc) {
        
      }


    });



});
$( document ).ready( function() {

  $("#form-name").keyup(function() {

    var max = 32;
    var currentLength = $(this).val().length;

    if (currentLength == 0) {
       $("#char-count-name").text('');
    } else if (currentLength > max) {
      $("#char-count-name").text('too many characters!');
      $(this).removeClass('valid').addClass('invalid');
    } else {
      var charsLeft = max - currentLength;
      $("#char-count-name").text( charsLeft + ' characters left');
      $(this).removeClass('invalid').addClass('valid');
    }

  });

  $("#form-comment").keyup(function() {

    var max = 140;
    var currentLength = $(this).val().length;

    if (currentLength == 0) {
       $("#char-count-comment").text('');
       $(this).removeClass('valid').addClass('invalid');
    } else if (currentLength > max) {
      $("#char-count-comment").text('too many characters!');
      $(this).removeClass('valid').addClass('invalid');
    } else {
      var charsLeft = max - currentLength;
      $("#char-count-comment").text( charsLeft + ' characters left');
      $(this).removeClass('invalid').addClass('valid');
    }

  });

  $("#form-password").keyup(function() {

    var max = 16;
    var currentLength = $(this).val().length;

    if (currentLength == 0) {
       $("#char-count-pass").text('');
       $(this).removeClass('valid').addClass('invalid');
    } else if (currentLength > max) {
      $("#char-count-pass").text('too many characters!');
      $(this).removeClass('valid').addClass('invalid');
    } else {
      var charsLeft = max - currentLength;
      $("#char-count-pass").text( charsLeft + ' characters left');
      $(this).removeClass('invalid').addClass('valid');
    }

  });

  $("#form-password-confirmation").keyup(function() {

    var max = 16;
    var currentLength = $(this).val().length;

    if (currentLength == 0) {
       $("#char-count-pass-conf").text('');
       $(this).removeClass('valid').addClass('invalid');
    } else if (currentLength > max) {
      $("#char-count-pass-conf").text('too many characters!');
      $(this).removeClass('valid').addClass('invalid');
    } else {
      var charsLeft = max - currentLength;
      $("#char-count-pass-conf").text( charsLeft + ' characters left');
      $(this).removeClass('invalid').addClass('valid');
    }

    if ($(this).val() != $("#password-form").val()) {
      $("#pass-validation").text("Password don't match!");
      $("#form-password-confirmation").removeClass('valid').addClass('invalid');
    } else {
      $("#pass-validation").text('');
      $("#form-password-confirmation").removeClass('invalid').addClass('valid');
    }

  });

  $("#form-submit").click(function(event) {

    form_data = $("#test-form").serializeArray();
    var no_errors = true;

    for (var input in form_data) {
      var currentElement = $("#form-" + form_data[input]['name']);

      if (!currentElement.hasClass('valid')) {
        currentElement.addClass('error');
        $("span", currentElement.parent()).removeClass('error-hidden').addClass('error-displayed');
        no_errors = false;
      } else {
        currentElement.removeClass('error');
        $("span", currentElement.parent()).removeClass('error-displayed').addClass('error-hidden');
      }
    };

    if (!no_errors) {
      event.preventDefault();
    };

  })

  $("#dropdown-menu h3").click(function() {

    $("#dropdown-menu ul ul").slideUp();

    if (!$(this).next().is(":visible")) {
      $(this).next().slideDown();
    }

  })

});

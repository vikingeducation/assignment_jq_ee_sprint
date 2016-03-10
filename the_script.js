var bSelectNameFocus = false;
var $currentTagObject;


$(document).ready(function() {

  $('.valid-text').on('change keyup paste keypress',  function() {
    var currentText =  $('.valid-text').val( );
    var maxTextBoxChars = 32;
    if( currentText ){
      $('.remaining-characters').html( (maxTextBoxChars - currentText.length).toString() );
    } else {
      $('.remaining-characters').html( '' );
    }
  });


  $('.valid-textarea').on('change keyup paste keypress', function() {
    var currentText =  $('.valid-textarea').val( );
    var maxTextAreaChars = 140;
    if( currentText ){
      $('.remaining-characters-textarea').html( (maxTextAreaChars - currentText.length).toString() );
    } else {
      $('.remaining-characters-textarea').html( '' );
    }
  });

  $('.valid-password').on('change keyup paste keypress', function() {
    var currentText =  $('.valid-password').val( );
    var maxPasswordChars = 16;
    if( currentText ){
      $('.remaining-characters-password').html( (maxPasswordChars - currentText.length).toString() );
    } else {
      $('.remaining-characters-password').html( '' );
    }
  });

  $('.valid-confirmation').on('change keyup paste keypress', function() {
    var currentText =  $('.valid-confirmation').val( );
    var maxConfirmationChars = 16;
    if( currentText ){
      $('.remaining-characters-confirmation').html( (maxConfirmationChars - currentText.length).toString() );
    } else {
      $('.remaining-characters-confirmation').html( '' );
    }
  });

  $('.valid-confirmation').on('change keyup paste keypress', function() {
    var passwordText = $('.valid-password').val();
    var confirmationText = $('.valid-confirmation').val();
    if (confirmationText !== passwordText) {
      $('.password-match').html('Passwords do not match');
    } else {
      $('.password-match').html('Passwords match');
    }
  });

  $('.submit-button').click( function(event) {
    event.preventDefault();
    var inputText = $('.valid-text').val();
    var inputTextArea = $('.valid-textarea').val();
    var passwordText = $('.valid-password').val();
    var confirmationText = $('.valid-confirmation').val();

    if (inputText.length < 4 || inputText.length > 32) {
      $('.remaining-characters').html('Invalid length');
      $('.valid-text').addClass('highlight');
    }

    if (inputTextArea.length < 4 || inputTextArea.length > 140) {
      $('.remaining-characters-textarea').html('Invalid length');
      $('.valid-textarea').addClass('highlight');
    }

    if (passwordText.length < 6 || passwordText.length > 16) {
      $('.remaining-characters-password').html('Invalid length');
      $('.valid-password').addClass('highlight');
    }

    if (confirmationText.length < 6 || confirmationText.length > 16) {
      $('.remaining-characters-confirmation').html('Invalid length');
      $('.valid-confirmation').addClass('highlight');
    }

    if (confirmationText !== passwordText) {
      $('.password-match').html('Check passwords');
      $('.valid-confirmation').addClass('highlight');
    }
  });

  $('.toggle').on('click', function(event) {
    $('.dropdown-content').toggle(600);
  });

  $('.dropdown-content li').on('click', function(event) {
    $('.dropdown-content').toggle(600);
    $('.selection-text').html( $(this).html() )
  });

  $('.dropdown-content li').on('mouseenter', function(event) {
      $(this).css('color', 'yellow');
      $(this).css('cursor','pointer');
  });

  $('.dropdown-content li').on('mouseleave', function(event) {
      $(this).css('color', 'black');
  });

/////////////



  $('.names-content li').on('click', function(event) {
    console.log('im here')
    bSelectNameFocus = false;
    event.stopPropagation();

    $textDiv = $('<div class="names-text"></div>');
    $textDiv.html( $(this).html() )

    $nameDropdown = $currentTagObject.children().filter('.names-content')
    $nameDropdown.hide()
    $('#selector').append($nameDropdown);
    $currentTagObject.append( $textDiv );
  });


  $('#photo-container').on('mousemove', function(event) {

    if( !bSelectNameFocus ) {
        // create box around mouse cursor
      var mouseX = event.pageX;
      var mouseY = event.pageY;

      var ele = $('#selector');
      ele.css({left: mouseX - 25, top: mouseY - 25});
      ele.append($('.names-content'));
      $('#selector .names-content').hide();
    }
  });

  $('#photo-container').on('click', function(event) {
    if( !bSelectNameFocus ) {

      var mouseX = event.pageX;
      var mouseY = event.pageY;

      var ele = $('<div class="tag"></div>');
      ele.css({left: mouseX - 25, top: mouseY - 25});

      $('#selector .names-content').show();
      ele.append($('.names-content'));
      $('#photo-container').append(ele);

      bSelectNameFocus = true;
      $currentTagObject = ele;
    } else {
      bSelectNameFocus = false;
      $('#selector').append($currentTagObject.children().filter('.names-content'));
      $currentTagObject.remove();
    }
  });
});








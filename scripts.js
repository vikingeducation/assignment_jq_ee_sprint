/*jshint esversion: 6 */

$(document).ready(function() {
  let same;

  //create function that adds counters
  $('input, textarea').keyup(function() {
    let $userInput = $(this).val();
    let $nextSpan = $(this).next('span');
    let maxVal = $(this).attr('maxlength');
    let len = $userInput.length;

    //when clicking in element, diplay the hidden span(counter) next to it
    $nextSpan.css('display', 'inline');
    //counter disappears if text is completely removed
    if ($userInput == '') {
      $nextSpan.hide();
      //counter shows number of characters remaining in element
    } else {
      $nextSpan.text(maxVal - len);
    }
  });

  // on blur(clicking away) hide counters
  $('input, textarea').blur(function() {
    $(this)
      .next('span')
      .hide();
  });

  //verify password matches password confirmation

  $('#passConf').keyup(function() {
    let $pass = $('#pass').val();
    let $conf = $(this).val();
    let passArr = $pass.split('');
    let confArr = $conf.split('');
    same = true;

    function check() {
      for (var i = 0; i < confArr.length; i++) {
        if (confArr[i] !== passArr[i]) {
          same = false;
          return same;
        }
      }
    }
    //hide error message unless confirmation doesn't match
    check();
    if ($conf == '') {
      $('#errorMsg').hide();
    } else if (same !== false) {
      $('#errorMsg').hide();
    } else {
      $('#errorMsg').css('display', 'inline');
    }
    return same;
  });

  //submit to validate entries and show error messages
  $('form').submit(function(e) {
    if ($('#txtfield').val().length < 4) {
      e.preventDefault();
      $('#txtfield').addClass('red');
      $('#txtFieldError').addClass('error');
    } else if ($('#txtarea').val().length < 4) {
      e.preventDefault();
      $('#txtarea').addClass('red');
      $('#txtAreaError').addClass('error');
    } else if ($('#pass').val().length < 6) {
      e.preventDefault();
      $('#pass').addClass('red');
      $('#passError').addClass('error');
    } else if (
      same !== true ||
      $('#passConf').val().length !== $('#pass').val().length
    ) {
      e.preventDefault();
      $('#passConf').addClass('red');
      $('#errorMsg')
        .css('display', 'inline')
        .addClass('error');
    }
  });
});

$(document).ready(function() {

  $('input[type=text]').bind("change keyup input",function(e) {

    var limitNum = 32;

    if ($(this).val().length > limitNum) {
      $(this).val($(this).val().substring(0, limitNum));
    }

    currentEle = $(e.target);

    var inputLength = currentEle.val().length;

    $('span').text(inputLength);

    if (inputLength === 0) {
      $('span').hide();
    } else {
      $('span').show();
    }

  });
  //
  // $('input[type=text]').on('keypress', function(e) {
  //   currentEle = $(e.target);
  //   var inputLength = currentEle.val().length;
  //
  //   if (inputLength > 32) {
  //     e.preventDefault();
  //   };
  //
  //   $('span').text(inputLength);
  //
  //   if (inputLength === 0) {
  //     $('span').hide();
  //   } else {
  //     $('span').show();
  //   }
  //
  // });

});

$(document).ready(function() {

  $('#your_div_id').addClass('displayDiv');

  $(document).click(function(e) {
    $('#your_div_id').removeClass('displayDiv');
  });

  $('img').mouseleave(function() {
    $('#your_div_id').addClass('displayDiv');
  });


  $('img').mouseenter(function() {
    $('#your_div_id').removeClass('displayDiv');
    //$('#your_div_id').off();
  });

  $(document).click(function(e) {
    var $div = $('#your_div_id').clone();

    $('body').append($div)
    .css({
      top: e.pageY - 58,
      left: e.pageX - 58,
    });

    $('.name1').slideDown();
    $('.name2').slideDown();
    $('.name3').slideDown();

    $(document).off();

    $('.name').hover(function() {
      $(this).toggleClass('optionBackground');
    }, function() {
      $(this).toggleClass('optionBackground');
    });

    $('.name').click(function() {
      $(this).data('clicked', true);
      var $selection = $(this);
      $('.name').css('display', 'none');
      $selection.show();
      $(this).addClass('optionBackground');
      $('.name').off();
    });

  }); //end click function


  $('img').on('mousemove', function(event) {
      $('#your_div_id').css({
         left:  event.pageX - 50,
         top:   event.pageY - 50
      });
  });


});











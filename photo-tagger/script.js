$(document).ready(function() {
  $('.magic').addClass('hidden');
  $(document).on('mousemove', function(x) {
    if (!$('.magic').hasClass('hidden')) {
      $('.magic').css({
        left: x.pageX - 25,
        top: x.pageY - 25
      });
    }
  });

  let divCount = 0;

  $('#container')
    .mouseenter(function() {
      $('.magic').removeClass('hidden');
    })
    .mouseleave(function() {
      $('.magic').addClass('hidden');
    })
    .click(function() {
      if (divCount === 0) {
        $('.magic')
          .clone()
          .appendTo(document.body)
          .removeClass('hidden')
          .removeClass('magic')
          .addClass('new');
        $('.new .dropDown').slideDown('slow');
        divCount += 1;
      } else {
        console.log('haha');
        $('.new').remove();
        divCount = 0;
      }
    });

  $(document.body).on('mouseover', 'li', function() {
    $('li').hover(
      function() {
        console.log('hover in');
        $(this).addClass('selected');
      },
      function() {
        $(this).removeClass('selected');
      }
    );
  });

  $(document.body).on('click', 'li', function() {
    $(this)
      .addClass('selected')
      .removeClass('hidden');
    $(this)
      .siblings()
      .not('selected')
      .hide('slow');
    $('.new')
      .removeClass('new')
      .addClass('confirmed');
    divCount = 0;
  });

  $('.confirmed').hover(
    function() {
      $('.confirmed').removeClass('hidden');
    },
    function() {
      $('.confirmed').addClass('hidden');
    }
  );
});

// $("#container").click(function(){
//   $("#magic").clone().appendTo("#container").removeClass("hidden");
// })

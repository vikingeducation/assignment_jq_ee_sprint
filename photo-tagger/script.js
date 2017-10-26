$(document).ready(function() {
  $(document).on('mousemove', function(x) {
    if (!$('#magic').hasClass('hidden')) {
      $('#magic').css({
        left: x.pageX - 25,
        top: x.pageY - 25
      });
    }
  });

  $('#container')
    .mouseenter(function() {
      $('#magic').removeClass('hidden');
    })
    .mouseleave(function() {
      $('#magic').addClass('hidden');
    });

  $('#container').click(function() {
    $('#magic')
      .clone()
      .appendTo('#container')
      .removeClass('hidden');
    $('.dropDown').removeClass('hidden');
  });
});

// $("#container").click(function(){
//   $("#magic").clone().appendTo("#container").removeClass("hidden");
// })

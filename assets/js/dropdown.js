$(document).ready(function() {

    $('.dropdown .toggle, .dropdown a').on('click', function(e) {
      e.preventDefault();

      if (e.target.nodeName === 'A') {
        var $span = $('.dropdown .toggle span');
        var text = $(e.target).text();
        
        $('.dropdown .toggle')
          .text(text)
          .append($span);

        $.post('/server.php', {"selection": text}, function(response) {
          $('#output').text(response);
          console.log(response);
        });
      }

      $('.dropdown .menu').slideToggle();

      return false;
    });

});



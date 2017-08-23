$( document ).ready( function(){

  $(document).on('mousemove', 'img', function(e) {

    $( '#selection' ).css({
      left: e.pageX +20,
      top: e.pageY
    })


  })


});

$( document ).ready( function(){

  $( document ).bind('mousemove', 'img', function(e) {

    $( '#selection' ).css({
      left: e.pageX +20,
      top: e.pageY
    })


  })


});

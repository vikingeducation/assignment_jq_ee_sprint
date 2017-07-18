$(document).ready(function() {
/*
  $('img').mouseover(function(e){
    $('#box').css({
       left:  e.pageX,
       top:   e.pageY
    });
  }); */

  $('img').on('mousemove', function(e){
    $('#box').css({
       left:  e.pageX,
       top:   e.pageY
    });
  });

});

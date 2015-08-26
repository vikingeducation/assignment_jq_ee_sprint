

$( document ).ready(function() {
    $(document).on('mousemove', function(e){
      $('#bob').css({
         left:  e.pageX,
         top:   e.pageY
      });
     
    });

  $("#mainphoto").click(function(e){
    console.log(e.pageX )
    alert("you have clicked me")  
      });


});
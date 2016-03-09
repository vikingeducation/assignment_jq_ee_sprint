$( document ).ready(function(){
  var clicked = false;

  $('#puppy').on('mouseover', function(ePuppy){

    $('#target').show();

      $('#puppy').on('mousemove', function(eTarget){

        if(!clicked){
          $('#target').css('left', eTarget.pageX - 25)
          $('#target').css('top', eTarget.pageY - 25)
        }
      })

      $('#target').on('click', function(eDropdown){

        $( "#options" ).toggle();
        clicked = clicker(clicked);
        //
        // $( "ul" ).on("click", function(eUl) {
        //   $( "#target" ).text( eUl.target.innerHTML );
        // });
        //
        // $( "body" ).on("click", function(eBody) {
        //   if (eBody.target.id != "selected" && eBody.target.id != "options" ) {
        //     $( "#options" ).slideUp()
        //   }
        // })

      })

  })

  var clicker = function(bool){
    return !(bool)
  }


})

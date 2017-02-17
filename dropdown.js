var dropdown = {
  init: function() {
    // $('h3').click(function() {
    //     $('li').slideToggle();
    // } ) ;
    // $('li').hover( function() {
    //   $(this).toggleClass( 'hover-option' );
    // } ); 
    dropdown.slide();
    dropdown.hover();
    dropdown.register();
  },

  slide: function() {
    $('h3').click(function() {
        $('li').slideToggle();
    } ) ;
  },

  hover: function() {
    $('li').hover( function() {
      $(this).toggleClass( 'hover-option' );
    } ) ; 
  },

  register: function() {
    $('li').click( function() {
        $('li').slideUp();
        replacement = $(event.target).html();
        $('h3').text(replacement);
    } ) ;
  }



};

$( document ).ready( function() {
  dropdown.init(); 
} )
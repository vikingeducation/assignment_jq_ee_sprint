$(document).ready(function(){

  var $submenu = $('.dropdown input:not(#display)');
  var $display = $('#display');

  $('.dropdown input').on('click', function(){
    $submenu.toggleClass('hidden').addClass('opened')
  });
  
  $submenu.click(function(){
    $display[0].value = this.value;
  });

});

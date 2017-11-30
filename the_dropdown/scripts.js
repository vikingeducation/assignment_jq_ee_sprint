/*jshint esversion: 6 */

$(document).ready(function() {

  $("li").on("click",function() { // when LI is clicked
        $(this).siblings().removeClass("select").addClass("hide").slideUp(1000); // Swap class
        $(this).parent().prepend(this);
        $(this).addClass("select");
    });

 $( '#desserts' ).hover(function() {
  $( this).children().slideDown(1000);
}, function() {
 $( this).children().not('.select').slideUp(1000);
});

$("li").hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "transparent");
    });

});

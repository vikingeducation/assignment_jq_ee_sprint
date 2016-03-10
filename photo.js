
$(document).ready(function() {

  var $photoContainer = $('#photo-container');
  var $tagContainer = $("#tag-container");
  $tagContainer.css({"width": "100px", "height": "100px"});
  var getWidth = $tagContainer.width();
  var $photoImage = $("img");
  var $names = $(".dtags .names");

  $photoContainer.mousemove(function(event){

    var x = event.pageX;
    var y = event.pageY;

    var styles = {
      "left": x - getWidth / 2,
      "top": y - getWidth / 2
    };

    if ($photoContainer.hasClass("searching")) {
      $tagContainer.css(styles);
    }
    
  } );

  $photoContainer.hover(

    function() {
      $tagContainer.show();
    },
    function() {
      $tagContainer.hide();
    } );


  $photoContainer.click(function(){
    if ($(this).hasClass("searching")){
      $(this).removeClass("searching");
      $tagContainer.addClass("clicked");
    } else {
      $(this).addClass("searching");
      $tagContainer.removeClass("clicked");
    }

    $(".dtags").slideToggle();


  } );


  $names.mouseenter(function(eventObj){
    $(this).css({
      'background-color': 'grey'
    } );
  } );

  $names.mouseleave(function(eventObj){
    $(this).css({
      'background-color': 'white'
    } );
  } );

  $names.click(function(){
    console.log("gets here");

    var name = $(this).text();
    var position = $tagContainer.position();

    console.log(position.left);
    square = $('<div class="tagged-box"></div>');
    namebox = $('<div class="name-box"></div>')

    $photoContainer.append(square);
    square.css({"left": position.left, "top": position.top})
    square.append(namebox);
    namebox.text(name);
  } );

} );

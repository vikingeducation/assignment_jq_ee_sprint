
$(document).ready(function() {

  var height =  $(".tag-container").height();
  var width =  $(".tag-container").width()

  $(".photo-container").mousemove(function(e){
    var pageX = e.pageX - (height / 2);
    var pageY = e.pageY - (width / 2);
    //var newvalueX = width * pageX * -1 - 25;
    //var newvalueY = height * pageY * -1 - 50;
    $(".tag-container").css("top", newvalueX+"px");
    $(".tag-container").css("left", newvalueX+"px");
  });
});

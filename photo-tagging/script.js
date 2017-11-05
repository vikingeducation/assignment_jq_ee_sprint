var sampleNames=["Rick","Morty","Beth","Summer","Mr. Poopy Butthole"];

$(".photo-box").mousemove(function(e){
  $("#tag-frame").remove();
  let frame='<div id="tag-frame"></div>';
  $("#container").append($(frame));
  let yPos= e.pageY-80;
  yPos+="px";
  let xPos= e.pageX-80;
  xPos+="px";
  $("#tag-frame").css("top",yPos);
  $("#tag-frame").css("left",xPos);
})
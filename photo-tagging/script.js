var sampleNames=["Rick","Morty","Beth","Summer","Mr. Poopy Butthole"];

$(".photo-box").mousemove(function(e){
  $("#tag-frame").remove();
  let frame='<div id="tag-frame"></div>';
  $("#container").append($(frame));
  let yPos= e.pageY-50;
  yPos+=""
  setInterval(10);
  $("#tag-frame").css("top",yPos+":px");
  console.log("mousex: "+e.pageX);
  console.log("mousey: "+e.pageY);
  console.log("yPos: "+yPos);
  console.log($("#tag-frame").css());
})
var sampleNames=["Rick","Morty","Beth","Summer","Jerry","Mr. Poopy Butthole"];

$(".photo-box").mousemove(function(e){
  $("#tag-frame").remove();
  if (hovering()){

  }
  else{
    
    let frame='<div id="tag-frame"></div>';
    $("#container").append($(frame));
    let yPos= e.pageY-80;
    yPos+="px";
    let xPos= e.pageX-80;
    xPos+="px";
    $("#tag-frame").css("top",yPos);
    $("#tag-frame").css("left",xPos);
  }
  


})


$(".photo-box").click(function(e){
  if (e.target.className=="potential-tag"){

  }
  else{
    console.log("clicked");
    $("#tag-frame").addClass("potential-tag");
    let nameBox = '<div id="name-menu">';
    sampleNames.forEach(function(name){
      nameBox+='<div class="menu-item">';
      nameBox+=name;
      nameBox+="</div>";
    })
    nameBox+="</div>";
    $("#tag-frame").append(nameBox);
    $("#tag-frame").removeAttr("id");
    $("#name-menu").click(function(e){
      let name=$(e.target).html()
      $("#name-menu").remove();
      $(".potential-tag").append("<div class='name-tag'>"+name+"<div>");
      $(".potential-tag").append("<div class='close-button'>X<div>");
      $(".potential-tag").removeClass("potential-tag").addClass("tagged");
      $(".close-button").click(function(e){
        $(e.target).parent().remove();
      })
    })
  }
})


function hovering(){
  let array1=Array.from($(".tagged:hover"));
  let array2=Array.from($(".potential-tag:hover"))
  let array3=Array.from($("#name-menu:hover"))
  if (array1.length>0||array2.length>0||array3.length>0){
    return true;
  }
  else{
    return false;
  }
}


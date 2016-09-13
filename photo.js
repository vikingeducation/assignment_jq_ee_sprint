function followMouse(event){
  

  //make aboslute attrs change to follow 

  var $wrapper = $("#image-holder");
  var index = $wrapper.children().length - 1;
  var $tag = $wrapper.children().eq(index)

  var x = event.pageX;
  var y = event.pageY;

  $tag.css("top", y)
      .css("left", x);

      console.log(followMouse);
}

function quitFollow(event){
  var tag_id = $("#image-holder").children().filter("div").length - 1;
  $("#image-holder").children().filter("div").eq(tag_id).remove();
}


function createTag(event){
  var tag_id = $("#image-holder").children().filter("div").length;
  tag_id -= 1;

  var x = event.pageX;
  var y = event.pageY;

  var tag_name = "tag" + tag_id;

  var $tag = $("<div></div>")
              .attr("id", tag_name)
              .attr("class", "tag");

  $("#image-holder").append($tag);

  console.log(createTag);
  return $tag;
}

function addDropDown(tag){
  console.log(tag);
  $dropdown = $("<div></div>")
               .attr("class", "dropdown");
  tag.append($dropdown);          
  $dropdown.append($("<ul></ul>"));
  $("ul", $dropdown).append($("<h7>Title</h7>"));
  $("ul", $dropdown).append($("<li>Bob</li>"));
  $("ul", $dropdown).append($("<li>Tom</li>"));
  console.log(addDropDown);
}





$("document").ready(function(){
   
   var $frog = $("#frog");
   var $wrapper = $("#image-holder");

  $($frog).click(function(event){
    var $tag = createTag(event);
    console.log($tag);
    addDropDown($tag);

    // tag is created which is successfully passed to addDropDown

    //drop down is being added to tag created right when the mouse starts moving again
  })

  $($frog).on("mouseenter", function(event){
    createTag(event);
  })

  $($frog).on("mousemove", function(event){
    
    followMouse(event);
  })

  $($frog).on("mouseleave", quitFollow);










})
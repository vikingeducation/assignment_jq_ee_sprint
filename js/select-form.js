$(document).ready(function(){
  set_event_listeners();
  hide_list();
});

var set_event_listeners = function(){
  $("#dropdown").on('click', toggle_list);
  $("ul li").hover(list_animation);
  $("ul li").click(select_list_item);
}

var hide_list = function(){
  $("li").hide();
}

var toggle_list = function(){
  if($("li").is(":visible")){
    $("li").hide(500);
    
  }
  else{
    $("li").show(500);
   
  }
}

var list_animation = function(){
  $(this).toggleClass("hovered");
}

var select_list_item = function(){
  $("#selected").text($(this).text())
}
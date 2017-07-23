$(document).ready(function(){
  App.init();
});

var App = {
  init: function(){
    App.set_event_listeners();
  },
  
  set_event_listeners: function(){
    $("img").on("mousemove", App.mouse_hover);
    $("body").on("click", App.clear_tagbox);
    $("img").on("click", App.tag_friend);
  },
  
  set_list_listeners: function(){
    //reset listeners in case of multiple sets
    $("#tagbox-list li").off();
    $("#tagbox-list li").hover( View.list_effect );
    $("#tagbox-list li").click( View.set_friend );
  },
  
  mouse_hover: function(event){
  if(!$("#tag-box", $(this).parent()).length){
    View.create_tagbox($(this))
  }
  var $tag_box = $("#tag-box");

  $tag_box.css({
    "left": App.set_x_boundry(event),
    "top":  App.set_y_boundry(event)
  });
},
  
  set_x_boundry: function(e){
    var x_pos = e.pageX+25;
    return x_pos>680 ? 680 : x_pos
  },
  
  set_y_boundry: function(e){
    var y_pos = e.pageY+25;
    return y_pos > 275 ? 275 : y_pos;
  },
  
  clear_tagbox: function(){
    $("#tag-box").remove();
  },

  tag_friend: function(){
    App.cancel_select();
    var box = $("#tag-box").attr("id", "tagged");
    View.add_list(box);
  },
  
  cancel_select: function(){
    if($("img").click && $("#selecting").length){
      $("#selecting").remove(); 
    }
  }
}

var View = {
  create_tagbox: function(element){
    $(element).parent().append(`
    <div 
      class="tagbox-style" 
      id='tag-box'>
    </div>`)
    ;
  },
  
  add_list: function(box){
    box.append(`
      <ul id="tagbox-list">
        <li> Tim </li>
        <li> Sarah </li>
        <li> Honker </li>
        <li> Beebs </li>
      </ul>
  `)
    $("#tagbox-list", box).addClass("list-style");
    $("#tagbox-list li", box).addClass("list-item-style");
    box.attr("id", "selecting");
    App.set_list_listeners();
  },
  
  list_effect: function(){
    App.clear_tagbox();
    $(this).toggleClass("list-item-effect")
  },
  
  set_friend: function(){
    var $tag_box = $(this).parent().parent();
    
    $tag_box.append(`
      <p class="tagged-friend">
          ${$(this).text()}
      </p>
    `);
    $("#tagbox-list li", $tag_box).remove();
    $tag_box.attr("id", "selected");
  }
}
$("ul").on("click", "li", function(event){
  var $li = $(event.target);
  if ($li.text() !== "") {
    $("span").fadeOut(1000, function(){
      $("span").text($li.text()).fadeIn(1000);
    });
  } else {
    $("span").text($li.text()).fadeIn(0);
  };
});

$("#dropdown-box").on("click", function(event){
  var $topBox = $(event.target);
  $topBox.next().slideDown(4000);
})
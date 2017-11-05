
$(".dropdown-box").click(function(e){
  let target= $(e.target);
  $(".dropdown-menu").slideToggle(200);
})

$(".dropdown-menu").click(function(e){
  $(".menu-item").css("display","block");
  let target=$(e.target);
  $("#current-item").html(target.html());
  target.toggle();
})
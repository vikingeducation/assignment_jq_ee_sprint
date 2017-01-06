$("ul").on("click", "li", function(event){
  var $li = $(event.target);
  var $input = $('input[type=hidden]');
  if ($('#dropdown-box span').text() !== "") {
    $("span").fadeOut(1000, function(){
      $("span").text($li.text()).fadeIn(1000);
      $input.val($li.text());
    });
  } else {
    $("span").text($li.text()).fadeIn(1000);
    $input.val($li.text());
  }
  $li.parent().slideUp(2000);
});

$("#dropdown-box").on("click", function(event){
  $('ul').slideDown(2000);
});

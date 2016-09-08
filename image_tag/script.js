var $tagBox = $('#active')
$("#image").on("mousemove", function(event) {


  $tagBox.removeClass("hidden")

  $tagBox.offset({
       left:  event.pageX - 50,
       top:   event.pageY - 35
    });

})

$("#image").on("mouseleave", function(event) {
  $tagBox.addClass("hidden")
});

$("#image").on("click", function(event) {

    $(".container").append("<div class='tag-box'></div>")
    $newBox = $(".tag-box").last();
    $newBox.css({
       left:  event.pageX - 50,
       top:   event.pageY - 35
    });
    $newBox.append("<ul class='box-list'><li>HI</li><li>HELLO</li><li>HOLA</li></ul>")
})

$(".box-list li").on("click", function() {
  $(".box-list li").addClass("hidden");
  $(this).removeClass("hidden");
});


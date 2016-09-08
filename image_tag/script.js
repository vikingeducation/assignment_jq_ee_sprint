var $tagBox = $('#tag-box')
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

$tagBox.on("click", function(event) {
    $newBox = $("body").append("<div class='tag-box'></div>")
    $tagBox.offset({
       left:  event.pageX - 50,
       top:   event.pageY - 35
    });

})


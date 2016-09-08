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

    $newBox.append("<ul class='box-list'><li>Dylan</li><li>Hannah</li><li>Andur</li></ul>")

    $("ul > li").on("click", function() {
      $("ul > li").slice(-3).addClass("hidden");
      $(this).removeClass("hidden");
      $newBox.addClass("permanent");
      $newBox.append("<div class='x'>x</div>");

      $(".x").on("click", function(event) {
        $(this).parent().remove();
      });
    });

});

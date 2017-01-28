$(document).ready(function(){
  function moveTarget(event) {
    $(".target-outline").removeClass("hidden").css({
      top: event.pageY - 50,
      left: event.pageX - 50
    });
  }
  var $newTarget,
      $targetName,
      $removeTag,
      nameSelected = false;

  $("#photo").mousemove(function(event){
    moveTarget(event);
  });

  $(".target-outline").mouseleave(function(){
    $(".target-outline").addClass("hidden");
  });

  $(".target-outline").on("click", function(event){
    nameSelected = false;
    $(".dropdown-content").css({
      top: $(this).offset().top + 100,
      left: $(this).offset().left
    }).slideDown(200);
    $newTarget = $("<div class='fixed-target'></div>");
    $("#photo").after($newTarget.css({
      top: $(".target-outline").offset().top,
      left: $(".target-outline").offset().left
    }));
    $("#photo").off("mousemove");
  });

  $("#photo").on("click", function(){
    if (!nameSelected) {
      $(".fixed-target").not(".forever").remove();
    }
    $(".dropdown-content").slideUp(100);
    $("#photo").mousemove(function(event){
      moveTarget(event);
    });
    nameSelected = false;
  });

  $(".dropdown-content div").on("click", function(){
    var name = $(this).text();
    $targetName = $("<div class='fixed-name'></div>").text(name).css({
      top: $newTarget.offset().top + 100,
      left: $newTarget.offset().left,
    });
    $newTarget.addClass("forever");
    $removeTag = $("<button class='fixed-name'>Remove Tag</button>");
    $(".forever").first().before($removeTag.css({
      top: $newTarget.offset().top - 25,
      left: $newTarget.offset().left,
    }));
    $newTarget.after($targetName);
    $(".dropdown-content").slideUp(100);
    nameSelected = true;
    $("button").nextAll().addBack().slice(0,3).wrapAll("<div class='wrapper'></div>");
    $("#photo").mousemove(function(event){
      moveTarget(event);
    });
  });

  $("body").on("click", "button", function(event){
    $(this).parent().remove();
    $(".fixed-target").not(".forever").remove();
    $(".dropdown-content").slideUp(100);
  });
  
});

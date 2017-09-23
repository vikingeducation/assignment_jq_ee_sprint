$(document).ready(function() {

  $("img").mousemove( function(e) {
    var x = e.clientX - 30,
        y = e.clientY - 30;
    $("div.tag-box").css({
      left: x,
      top: y
    });
  });

  $("div.tag-box").on('click', function(e) {
    $("div.tag-box-dropdown").slideToggle(400);
  });


  // $("div.sign-wrapper").append(
  //
  // );
  //
  // $("div.tag-box-dropdown").css({
  //   left: e.pageX,
  //   top: (e.pageY - 60)
  // });
  //
  // $("div.tag-box").slideDown("slow");
  //
  // if ($(".tag-box").is(e.target) || $("div.tag-box-dropdown").is(e.target)) {
  //   $("div.sign-wrapper").append(
  //     $("div.tag-box")
  //   );
  //   $("div.tag-box-dropdown").css({
  //     left: e.pageX,
  //     top: (e.pageY - 60)
  //   });
  //   $("div.tag-box").slideDown("slow");
  // })

});

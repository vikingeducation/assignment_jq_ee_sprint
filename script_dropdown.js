$(document).ready(function() {

  $(".temp").click(function() {
    // $("#main").slideToggle('slow');
    if ( $("#main").is(":hidden") ) {
      $("#main").slideDown(600);
    } else {
      $("#main").slideUp('slow');
    }
  });

  $("li.main-ex").click(function() {
    // $("#main").slideToggle('slow');
    if ( $(this).next().is(":hidden") ) {
      $(this).next().slideDown(600);
    } else {
      $(this).next().slideUp('slow');
    }
  });

  $("li.sub").click(function() {
    $("div.temp").text( $(this).text() );
  });

});





// var mode = "some";
//
// $("img").on('mousemove', function(e) {
//   $("div.tag-box").css({
//     left: e.pageX - 30,
//     top: (e.pageY - 30)
//   });
// });
//
// $("div.tag-box").on('click', function(e) {
//   if ( mode === 'some') {
//     $("div.tag-box-dropdown").show();
//     mode = "x";
//   } else {
//     $("div.tag-box-dropdown").hide();
//     mode = "some";
//   }
// });
//
//
//   $("div.sign-wrapper").append(
//
//   );
//   $("div.tag-box-dropdown").css({
//     left: e.pageX,
//     top: (e.pageY - 60)
//   });
//   $("div.tag-box").slideDown( "slow");
// });
// if ($(".tag-box").is(e.target) || $("div.tag-box-dropdown").is(e.target) ) {
//   $("div.sign-wrapper").append(
//     $("div.tag-box")
//   );
//   $("div.tag-box-dropdown").css({
//     left: e.pageX,
//     top: (e.pageY - 60)
//   });
//   $("div.tag-box").slideDown( "slow");
// })

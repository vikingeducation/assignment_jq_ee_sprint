var dropdown = {
  mainDrop: function() {
    $(".temp").click(function() {
      if ( $("#main").is(":hidden") ) {
        $("#main").slideDown(600);
      } else {
        $("#main").slideUp('slow');
      }
    });
  },
  subDrop: function() {
    $("li.main-ex").click(function() {
      // $("#main").slideToggle('slow');
      if ( $(this).next().is(":hidden") ) {
        $(this).next().slideDown(600);
      } else {
        $(this).next().slideUp('slow');
      }
    });
  },
  topLeveling: function() {
    $("li.sub").click(function() {
      $("div.temp").text( $(this).text() );
    });
  }
}

$(document).ready(function() {
  dropdown.mainDrop();
  dropdown.subDrop();
  dropdown.topLeveling()

});

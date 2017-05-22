$( document ).ready( function() {
    var max = 32;
    var left = 32;
    $text = $("<p/>", {
      html: left + " left",
      style: "display: inline; margin-left: 10px;"
    });
    function initText() {
      $( "form :text" )
        .parent()
        .append($text);
    }
    function updateText() {
      left = 32 - $("form :text")
                      .val()
                      .length;
      if (left == 0)
        $( "form :text" )
          .next()
          .html("Max Length");
      else
        $( "form :text" )
          .next()
          .html(left + " left");
    }
    initText();
    $("form :text").on("keyup", updateText);
})

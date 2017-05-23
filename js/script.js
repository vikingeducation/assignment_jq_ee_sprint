// Text limit

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

// Text area limit
$( document ).ready( function() {
    var max = 140;
    var left = 140;
    $text = $("<p/>", {
      html: left + " left",
      style: "display: inline; margin-left: 10px;"
    });
    function initText() {
      $( "#textarea" )
        .parent()
        .append($text);
    }
    function updateText() {
      left = 140 - $("#textarea")
                      .val()
                      .length;
      if (left <= 0)
        $( "#textarea" )
          .next()
          .html("Max Length");
      else
        $( "#textarea" )
          .next()
          .html(left + " left");
    }
    initText();
    $("#textarea").on("keyup", updateText);
})

$( document ).ready( function() {

  function check() {
    pass = document.getElementById("password").value;
    confirm = document.getElementById("confirm").value;
    if(pass == confirm) {
      $("#password").removeClass("bad");
      $("#confirm").removeClass("bad");
      $("#submit").removeClass("bad");
      $("#password").addClass("good");
      $("#confirm").addClass("good");
      $("#submit").addClass("good");
    }
    else {
      $("#password").removeClass("good");
      $("#confirm").removeClass("good");
      $("#submit").removeClass("good");
      $("#password").addClass("bad");
      $("#confirm").addClass("bad");
      $("#submit").addClass("bad");
    }
  }
  $("#submit").on("click", check );
})

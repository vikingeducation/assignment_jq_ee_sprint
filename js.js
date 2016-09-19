

$(document).ready(function(){
  ///////////////////////////
  function getMouseCoords(e) {
  var e = e || window.event;

  }


  var followCursor = (function() {
    var s = document.createElement('div');
    s.style.position = 'absolute';
    s.style.margin = '0';
    s.style.padding = '50px';
    $(s).addClass("flying");
    s.style.border = '3px solid red';

    return {
      init: function() {
        document.body.appendChild(s);
      },

      run: function(e) {
        var e = e || window.event;
        s.style.left  = (e.clientX - 50) + 'px';
        s.style.top = (e.clientY - 50) + 'px';
        getMouseCoords(e);
      }
    };
}());

$("#menu ul li").hover( function() {
  $(this).css("background-color", "blue");
}, function() {
  $(this).css("background-color", "green");
});

  $("img").hover( function() {
    followCursor.init();
    document.body.onmousemove = followCursor.run;
  }, function () {
    $(".flying").first().remove();
  });
  ////////////////////////////////
  $(".counted").on("focus",function(event){
    var count = (parseInt($(event.target).attr("maxlength")) - $(event.target).val().length).toString();
    $(event.target).val().length == 0 ? count = "" : count;
    $("<span id='counter'>"+count +"</span>").insertAfter(event.target)
    });
  $(".counted").on("keyup", function(event){
    var count = (parseInt($(event.target).attr("maxlength")) - $(event.target).val().length).toString();
    $(event.target).val().length == 0 ? count = "" : count;
    $("#counter").text(count);
  });
  $(".counted").on("blur", function(event) {
    $("#counter").remove();
  });

  $("#confirm").on("focus",function(event){
    if ($(event.target).val() !== $("#pass").val())
    $("<span id='pass-match'>does not match pass</span>").insertAfter(event.target)
    });
  $("#confirm").on("keyup", function(event){
    if ($(event.target).val() !== $("#pass").val()) {
    $("#pass-match").text("does not match pass");
    } else {
    $("#pass-match").text("");
    };

  });
  $("#confirm").on("blur", function(event) {
    $("#pass-match").remove();
  });

  $("button").first().on("click", function(event){
    if ($("textarea").first().val().length < 4 || $("#text").val().length < 4
    || $("pass").val().length < 6 || $("confirm").val() !== $("pass").val()) {
      event.preventDefault();
      alert("fix your shit");
    };
  });
  //////////////////////////

  $("#top").click(function(){
		$("#menu ul").slideUp();
		if(!$(this).next().is(":visible"))
		{
			$(this).next().slideDown();
		}
	})
  $("#menu ul li").hover( function() {
    $(this).css("background-color", "blue");
  }, function() {
    $(this).css("background-color", "green");
  });

  $("#menu ul li").click( function() {
    $("#top").html($(this).text());
    $("#top").css("background-color", "green");
    $("#menu ul").slideUp();
  });


})

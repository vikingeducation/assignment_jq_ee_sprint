
$(document).ready(function() {
  var tagCounter = 0;
  var targetX, targetY, tagValue;
 function emailct (ele, ele1, max) {
    	$(ele).keyup(function(){
    		var eml = $(this).val().length;
    	 
    	 if (eml > 0){
        $(ele1).show().text((max - eml) + " characters remaining")};
        if (eml < 1) {
        $(ele1).hide()};
    
    
});
    }
        $("input[name='passconfirm']").keyup(function(){
        var lett = $(this).val();
        if (lett === $("input[name='pass']").val()) {
        	$(".check").show().text("Passwords Match!")
        } else { $(".check").show().text("Doesn't Match!")};
        if (lett.length === 0) {
        	$(".check").hide()
        }

        });
       
  		$('form').submit(function(event) {
   	if ($("input[name='email']").val().length < 4){
   		event.preventDefault();
   		$("input[name='email']").css("background-color","red");
   		$(".error1").show().text("must be at least 4 characters!");
		} else if ($("textarea[name='biography']").val().length < 4){
   		event.preventDefault();
   		$("textarea[name='biography']").css("background-color","red");
   		$(".error2").show().text("must be at least 4 characters!")
   	}  else if ($("input[name='passconfirm']").val().length < 6) {
   		event.preventDefault();
   		$("input[name='passconfirm']").css("background-color","red");
   		$(".error4").show().text("must be at least 6 characters!")}
   		else if ($("input[name='passconfirm']").val() !== $("input[name='pass']").val()) {
   			event.preventDefault()
   			$("input[name='pass']").css("background-color","red");
   			$(".error3").show().text("Password doesn't match confirmation!")};
   		 
 });        function recheck(ele, min, ele1){
  		   $(ele).keyup(function(){
  		if ($(ele).val().length >= min) {
  			$(ele).css("background-color","white")
  			$(ele1).hide()
  		}

  		});
  }
  $("input[name='pass']").keyup(function(){
        var lett = $(this).val();
        if (lett === $("input[name='passconfirm']").val()) {
        	$(".error3").hide();
        	$("input[name='pass']").css("background-color","white")}
        

        });
    $('.dropdown').hide();
  	$('#drop').click(function(){
  		$('.dropdown').slideToggle(400);
  	});
    $('.dropdown a').hover(function(){
      $(this).css({"background-color": "blue", 'color':'white'})},
      function(){$(this).css({"background-color": "white", 'color': 'black'})
    });
  
    $('#dropd a').click(function(e){
      $('#drop').text($(this).text());
      $(this).hide();
      $('.dropdown').slideUp(400);
      $(this).show();
      e.preventDefault();

    });
   $("#clickablePh").css({width: $("img").outerWidth(), height: $("img").outerHeight()});
   $('img').mousemove(function(event){
    
    var offset = $('img').offset();
    var mouseX = event.pageX - $('#clickablePh').offset().left;
    var mouseY = event.pageY - $('#clickablePh').offset().top;
    var targetWidth = $('#tag-target').outerWidth();
    var targetHeight = $('#tag-target').outerHeight();
        targetX = mouseX - targetWidth/2;
        targetY = mouseY - targetHeight/2;
        inputX = mouseX-25;
      inputY = mouseY+35;
    $('#tag-target').css({left: targetX, top: targetY}).show();
    $('#tag-input').css({left: inputX, top: inputY})

   });
   
  $('#clickablePh').mouseleave(function(){
 $('#tag-target').hide()
  $('#tag-input').hide();

  });
  $('#tag-target').click(function(e){
          $('#tag-input').slideToggle(400);
          e.preventDefault();

    })
  function getName(){
$('#dropd1 li').click(function(e){
  var index = $(this).index();
   tagValue = $(this).text();
   tagging()
});
}

  $('a').click(function(e){
    e.preventDefault();
  })
  $('.dropdown1 a').hover(function(){
    $(this).css({"background-color": "red"})},
    function(){$(this).css({"background-color":"transparent"})

  });

  function tagging(){

  $("#clickablePh").append('<div id="mark-' + tagCounter + '" class="selection" style="left:' + targetX + 'px; top:' + targetY + 'px;"><span>'+ tagValue +'</span></div>')
   tagCounter++;
   
  }

    $('#clickablePh').hover(function(){
    $('.selection').show()
    
  })
    getName();
    emailct ("input[name='email']", '.emchars', 32);
    emailct ("textarea[name='biography']", '.biochars', 140);
    emailct ("input[name='pass']", '.passchars', 16);
    emailct ("input[name='passconfirm']", '.passconfchars', 16);
    recheck("input[name='email']", 4, ".error1");
    recheck("textarea[name='biography']", 4, ".error2");
    recheck("input[name='passconfirm']", 6, ".error4");

});









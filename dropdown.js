



$("document").ready(function() {

    $("#selected").click(function(){
  		if(!$(this).next().is(":visible"))
  		{
  			$(this).next().slideDown();
  		}
  	})

    $("#dropdown ul li").click( function() {
      $("#dropdown ul li").addClass("dropdown");
      $("#selected").html($(this).text());
      $("#selected").addClass("dropdown");
      $("#dropdown ul").slideUp();
    });
})

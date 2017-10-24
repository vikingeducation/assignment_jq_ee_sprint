$(document).ready(function(){



	$('.start').click(function(){
		cycle();
	})




});


 function cycle() {
 	$('#gameboard.div').each(function(){
 		var that = this;

 		setInterval(function(){
 	 console.log($(that))


 		}, 2000)
 	  


 	})

 }

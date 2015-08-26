$(document).ready(function(){
  // function charCount(identifier, maximum) {
  //   var count = $(identifier).val().length;
  //   console.log(count);
  //   if (count < maximum) {
  //     $("<p>test</p>").appendTo($(identifier)[0]);
  //   }
  // }

  // $('.text-1').keyup(charCount('.text-1', 32));
	var count = $('.text-1');
	var in_max = 32;
	$('.text-1').keyup(function(){
		var count =  this.value.length;
		console.log(count);
		if (count > in_max ){
			$(".text-1")[0].style.borderColor = "red";
			$("#input_count").html("You are " + (count - in_max) + " characters over");
		}else{
			$("#input_count").html((in_max - count) + " Characters remaining");
		}
	
		
	});

});
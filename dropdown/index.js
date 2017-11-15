$(document).ready(function(){
	let index = 1

	var functions = {
		optionSelector: function(option){
			$("#dropdown header").text(option);
			$("#dropdown div").slideUp("slow");
		},
		default: function(){
			$("#dropdown div").hide();
		},
		hover: function(){
			$("header").hover(function(){
			$("#dropdown div").slideDown("slow");
		});
	},
		leave: function(){
			$("#dropdown").mouseleave(function(){
			$("#dropdown div").slideUp("slow");
		});
	}
}

	functions.default();
	functions.hover();
	functions.leave();
	
while( index < 7){
	$("#option" + index).click(functions.optionSelector.bind(this, $("#option" + index).text()));
	 index ++
}

});

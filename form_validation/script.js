$(document).ready(function(){

//updates text-counter
var count = function(){ 
	var max = this.dataset.max;
	var counter = $(this).val().length;	
	$(this).next().text(max - counter);
	display_counter($(this));
}

//checks removes counter if count == 0
var display_counter = function(e){
	if (e.val().length == 0){
		e.next().css("display", "none");
	} else{
		e.next().css({
								"display": "inline-block",
								"width": "20px"
								});
	}
}

//checks password match
var confirm = function(){
	var password = $("#password").val();
	var check =  $(this).val();
	if (check.length > 0){
		$("#check-msg").css("display", "block");
		if (password != check){
			$("#check-msg").text("Passwords do not match.");
		} else{
			$("#check-msg").text("Passwords match.");
		}
	} else{
		$("#check-msg").css("display", "none");
	}
}

//Checks before submitting form

//checks for password match
var comparePassword = function(){
	if ($("#password").val() != $("#confirm").val()){
		$("#password, #confirm").addClass( "error" );
		$("#error-msg").text("Password must match");
	}
}

//checks length
var checkLength = function(){
	//console.log(this.attr(this));
	console.log(this);
	var max = this.data("max");
	var min = this.data("min");
	if (this.val().length < min){
		console.log("min " + min)
		$("#error-msg").text(this.attr("name") + " length must be more than " + min + " characters." );
		$(this).addClass( "error" );
	} else if(this.val().length > max){
		console.log("max " + max)
		$("#error-msg").text(this.attr("name") + " length must be less than " + max + " characters." );
		$(this).addClass( "error" );
	}else{
		$("#error-msg").text("");
		$(this).removeClass("error");
	}
}
var check = function(){
	var $password = $("#password");
	var $textArea = $("#short-text");
	var $textAreaLg = $("#long-text");	
	checkLength.call($textArea);
	checkLength.call($textAreaLg);
	checkLength.call($password);
}


var submit = function(){
	//checks lengths
	//check password match
	check();
	comparePassword();
	event.preventDefault();

}


//text input count
$("#text-area input, textarea, input[type='password']").on("keyup", count);

//confirms if passwords match
$("#confirm").on("keyup", confirm);

//Submit button
$("#submit").on("click", submit);


})
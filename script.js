//Form validation

$(document).ready(function() {
	$('#tag-dropdown').hide()
  // 1. Textfield

  	var maxTextField = 32;

$('#textfield').on('keyup', function(){
	var textLength = $('#textfield').val().length;
	var textRemaining = maxTextField - textLength;

	var charWarnField = $('#textfieldCounter').html(textRemaining + ' characters remaining')  
	if (textLength ===0) {
		charWarnField.hide();
	} else {
		charWarnField.show();
	}

});

  //2. Textarea

  var maxTextArea = 140;

$('#textarea').on('keyup', function(){
	var textLength = $('#textarea').val().length;
	var textRemaining = maxTextArea - textLength;

	var charWarnArea = $('#textareaCounter').html(textRemaining + ' characters remaining')  
	if (textLength ===0) {
		charWarnArea.hide();
	} else {
		charWarnArea.show();
	}

});

// 3. Password field 1

var maxTextPass = 16;

$('#password').on('keyup', function(){
	var textLength = $('#password').val().length;
	var textRemaining = maxTextPass - textLength;

	var charWarnPass = $('#passwordCounter').html(textRemaining + ' characters remaining')  
	if (textLength ===0) {
		charWarnPass.hide();
	} else {
		charWarnPass.show();
	}

});

// 4. Password field 2 
var maxTextPassConf = 16;

$('#passwordconf').on('keyup', function(){
	var textLength = $('#passwordconf').val().length;
	var textRemaining = maxTextPassConf - textLength;

	var charWarnPass = $('#passwordCounterConf').html(textRemaining + ' characters remaining')  
	if (textLength ===0) {
		charWarnPass.hide();
	} else {
		charWarnPass.show();
	}

});

// 5. Check password match
function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#passwordconf").val();

    if ($("#passwordconf").val().length === 0); {
        $("#passwordMatchText").html(" ");
        
   } 



    

    if (password === confirmPassword) {

        $("#passwordMatchText").html("Passwords match.");

   } else if (password !== confirmPassword) {

   		$("#passwordMatchText").html('Passwords do not match');

   } 
   if (confirmPassword.length === 0) {
        $("#passwordMatchText").hide();
    }

    }



   $("#passwordconf").keyup(checkPasswordMatch);

  
// 6. Highlight validations

//Textfield
$('#submitbutton').on('click', function(event){

	event.preventDefault();

if ($('#textfield').val().length <= 3) {

	$('#textfield').siblings().filter(".error-msg").text('Text field is too short');

} else if ($('#textfield').val().length > 32) {

	$('#textfield').siblings().filter(".error-msg").text('Text field is too long');

} else if ($('#textfield').val().length > 3 && $('#textfield').val().length < 33) {

	$('#textfield').siblings().filter(".error-msg").text(' ')
} 

//Textarea
if ($('#textarea').val().length <= 3) {

	$('#textarea').siblings().filter(".error-msg").text('Text area is too short');

} else if ($('#textarea').val().length > 140) {

	$('#textarea').siblings().filter(".error-msg").text('Text area is too long');

} else if ($('#textarea').val().length > 3 && $('#textarea').val().length < 141) {

	$('#textarea').siblings().filter(".error-msg").text(' ')

}

//Password field 1
if ($('#password').val().length <= 5) {

	$('#password').siblings().filter(".error-msg").text('Password is too short');

} else if ($('#password').val().length > 16) {

	$('#password').siblings().filter(".error-msg").text('Password is too long');

} else if ($('#password').val().length > 5 && $('#password').val().length < 17) {

	$('#password').siblings().filter(".error-msg").text(' ')

}

//Password field 2

if ($('#passwordconf').val().length <= 5) {

	$('#passwordconf').siblings().filter(".error-msg").text('Password is too short');

} else if ($('#passwordconf').val().length > 16) {

	$('#passwordconf').siblings().filter(".error-msg").text('Password is too long');

} else if ($('#passwordconf').val().length > 5 && $('#passwordconf').val().length < 17) {

	$('#passwordconf').siblings().filter(".error-msg").text(' ')

}

if ($('#password').val() !== $('#passwordconf').val()) {
	$('#passwordconf').siblings().filter(".error-msg").text('Password does not match');
}


});




//Dropdown


    $("#top-item").click(function() {
        $("#dropdown-list").slideToggle(500);

 });
    $(".item").click(function() {
    	$("#top-item").text($(this).text())
    	$("#dropdown-list").slideUp(500)

    });





});












































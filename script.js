function inputAssignment(domObj1, domObj2, maxLength){
	//console.log("works!");
	//console.log(`${$("input").val().length}`);
	//domObj1.html(`${domObj2.length}`)
	let lengthVariable = domObj2.val().length;

	if(lengthVariable <= 0){
		domObj1.html("");
	}else if(lengthVariable <= maxLength){
		domObj1.html(`${maxLength - lengthVariable}`);
	}else if(lengthVariable > maxLength){
		domObj1.html(`${lengthVariable - maxLength} character(s) too many!`);
	}
}

function passConfirm(domObj1, domObj2, domObj3){
	let htmlStore = domObj3.html();

	if(domObj2.val().length == 0){
		domObj3.html("");
	}else if(domObj1.val() == domObj2.val()){
		domObj3.html(htmlStore);
	}else{
		domObj3.html(`${htmlStore} Passwords do not match!`);
	}
}

function buttonFunctionI(domObji, iSpan, minLength, maxLength, event){
	if(domObji.val().length < minLength || domObji.val().length > maxLength){
		event.preventDefault();
		domObji.addClass("bad");
		iSpan.html("Length is Wrong");
	}

	
}

function buttonFunctionJ(domObjP, domObjP2, pSpan, event){
	if(domObjP.val() != domObjP2.val()){
		event.preventDefault();
		domObjP2.addClass("bad");
		pSpan.html("Passwords do not match!");
	}
}

function closeList(domObj){
	$('#default').html(`${domObj.html()}`);
	$('#opt1').hide(1000);
	$('#opt2').hide(1000);
	$('#opt3').hide(1000);
}

function dropDownFunction(){
//	$('#opt1').removeClass("hidden");
	$('#opt1').show(1000);
	$('#opt2').show(1000);
	$('#opt3').show(1000);
	$('#opt1').click(function(){
			closeList($('#opt1'));
	});
	$('#opt2').click(function(){
			closeList($('#opt2'));
	});
	$('#opt3').click(function(){
			closeList($('#opt3'));
	});
	
}


function doAssignment(){

	$('#input').keyup(function(){
		inputAssignment($('#idSpan'), $('#input'), 32);
	});
	$('#area').keyup(function(){
		inputAssignment($('#areaSpan'), $('#area'), 140);
	});
	$('#pass').keyup(function(){
		inputAssignment($('#passSpan'), $('#pass'), 16);
	});
	$('#pass2').keyup(function(){
		inputAssignment($('#passSpan2'), $('#pass2'), 16);
	});
	$('#pass2').keyup(function(){
		passConfirm($('#pass'), $('#pass2'), $('#passSpan2'));
	});
	$('#btnId').click(function(event){
		buttonFunctionI($('#input'),$('#idSpan'), 4, 32, event);
		buttonFunctionI($('#area'), $('#areaSpan'), 4, 140, event);
		buttonFunctionI($('#pass'), $('#passSpan'), 6, 16, event);
		buttonFunctionJ($('#pass'),$('#pass2'), $('#passSpan2'),event);
	});
	$('#default').click(function(){
		dropDownFunction();
	});

}

$(function(){doAssignment()});

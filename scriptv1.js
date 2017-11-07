function inputAssignment(){
	console.log("works!");
}

function doAssignment(){
	let textInputVar = $('#input')

	textInputVar.keypress(inputAssignment);
}

$(function(){doAssignment()});

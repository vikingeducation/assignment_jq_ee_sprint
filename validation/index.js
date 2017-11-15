
$(document).ready( function(){
	 let index = 0,
	     index2 = 1,
	 	 id = (id) => document.getElementById(id),
	 	 match = (a, b) => (a === "" && b === "" ) ? "" : a === b;

function Input ( max, min, counterElement, inputElement, plainInputElement) {

	console.log(max, counterElement, inputElement, plainInputElement)
	this.add = function () {
		if (id(plainInputElement).value.length >= max) {
			$( counterElement ).text( `${max} Character Limit`);
			$( inputElement ).css( "border", "5px solid yellow" );
		} else {
			let passwordMatch = match( $("#input3").value, ("#input4").value);
			$( counterElement).html( id( plainInputElement ).value.length );
			$( "#password-check" ).html( passwordMatch.toString() );
		}
	};

	this.submit = function( event ){

		event.preventDefault();
		if (id(plainInputElement).value.length >= max) {
			$( counterElement ).text( `${id(plainInputElement).value.length} 
				is more than the ${ max } Character Limit` );
			$( inputElement ).css( "border", "5px solid red" );
			$( counterElement ).css( "color", "red" );
			$( "#password-check" ).css( "color", "red" );
		}

		if ( !match( id("input3").value, id("input4").value ) ){
				$( "#password-check" ).html("your passwords do not match!")
		}
	};
}

let instances = [
	new Input( 32, 4, "#first_counter" , "#input1", "input1"),
	new Input( 140, 4, "#second_counter", "#input2", "input2"),
	new Input( 16, 6, "#third_counter", "#input3", "input3"),
	new Input( 16, 6, "#fourth_counter", "#input4", "input4")
]

instances.forEach( ( item ) => {
	$( "#input" + index2 ).on("keyup", item.add.bind( item ) );
	$( "#formsubmit" ).on("click", item.submit.bind( item ) );
	index2 += 1
})
});
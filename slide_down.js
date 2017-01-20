$( document ).ready(function() {
	$('#selected').on('click',function(e){
		console.log('Clicked the thing');
		$( "#option1" ).slideDown( "slow", function() {
    		// Animation complete.
  		});
  		$( "#option2" ).slideDown( "slow", function() {
    		// Animation complete.
  		});
  		$( "#option3" ).slideDown( "slow", function() {
    		// Animation complete.
  		});
	});
	$('#option1').on('click',function(e){
		$( "#option1" ).slideUp( "slow", function() {
    		// Animation complete.
  		});
  		$( "#option2" ).slideUp( "slow", function() {
    		// Animation complete.
  		});
  		$( "#option3" ).slideUp( "slow", function() {
    		$( '#selected a' ).text("Pizza");
  		});
  		
	});
	$('#option2').on('click',function(e){
		$( "#option1" ).slideUp( "slow", function() {
    		// Animation complete.
  		});
  		$( "#option2" ).slideUp( "slow", function() {
    		// Animation complete.
  		});
  		$( "#option3" ).slideUp( "slow", function() {
    		$( '#selected a' ).text("Pasta");
  		});
  		
	});
	$('#option3').on('click',function(e){
		$( "#option1" ).slideUp( "slow", function() {
    		// Animation complete.
  		});
  		$( "#option2" ).slideUp( "slow", function() {
    		// Animation complete.
  		});
  		$( "#option3" ).slideUp( "slow", function() {
    		$( '#selected a' ).text("Kabob");
  		});
  		
	});
});


$(document).ready(function(){
	
	var myvar = setInterval(randomPos, 4000);

function stopCl(){
	clearInterval(myvar)
}	

function randomPos(){
var iW = $('#container').innerWidth();
var iH = $('#container').innerHeight();
var lt = Math.floor(Math.random() * iW)
var tp = Math.floor(Math.random() * iH);
$('#disc').css({"top": tp, "left": lt, }).show()


};



   $('#disc img').click(function(){
 $('#disc').animate({bottom: "-1000px", top: "1000px"}, 500);
 });

$('#container').click(function(e){
	var offset = $(this).offset();
	var relativeX = (e.pageX - offset.left);
	var relativeY = (e.pageY - offset.top);
	var ht = e.pageX;
	var lf = e.pageY;
	$('#explos').css({"left": (e.pageX -125), "top": e.pageY -100}).show().delay(1000).fadeOut();
});













setInterval(randomPos, 4000)

});

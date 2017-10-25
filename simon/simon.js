$(document).ready(function(){

var seq;
var arr = [];
var interval;
var count = 0;
var usArr = [];
var playIn = 2000;
var timeL = 5000;
var timeout = 0;
var myvar;

 

    function playgame(){
    	clearTimeout(myvar);
        interval = setInterval(function(){
   			cycle()},playIn)
   		
};
    	
    


	$('.start').click(function(){

     	seq = 2
    	count = 0;
    	arr = [];
    	usArr = [];
  		
			playgame()
	});
 


function cycle(){
	clearTimeout(myvar);
	count++
	if (count === seq){
		clearInterval(interval);
		setTimeout(function(){alert("your turn")}, playIn)
		checkUser()
	};
	var numb = generateRan();
    $('#gameboard div').eq(numb).toggleClass('highlighted')
    setTimeout(function(){
   $('#gameboard div').eq(numb).toggleClass('highlighted')
    }, 1000)
    
   
};

function generateRan() {
	clearTimeout(myvar);
  var min = Math.ceil(0);
  var max = Math.floor($('#gameboard div').length);
  var pos = Math.floor(Math.random() * (max - min) + min);
  arr.push(pos);
  return pos;
  
  

 }

function checkUser() {
    $('#gameboard div').unbind("click").click(function(){
    	
    	var indexes = $('#gameboard div').index(this)
    	confirmInp(indexes);
    	});

       
};


function confirmInp (uarr){
	 clearTimeout(myvar);
	 timedout();
	 var correct = 0;
	 usArr.push(uarr);
	 if (usArr.length === seq) {
	 	clearTimeout(myvar);
	 for (var i =0; i < usArr.length; i++){
	 if (usArr[i] !== arr[i]) {
	 	alert("wrong, try again")
    	break;

  	} else {correct+=1}
}    

}
if (correct === seq) {
alert('good, now try a harder one');
        clearTimeout(myvar);
		seq++;
		count = 0;
    	arr = [];
    	usArr = [];
    	playgame();
    	playIn -= 200;
    };
}
function timedout(){
	myvar = setTimeout(function(){alert("out of time!"); window.location.reload()}, 5000);
	

};

});


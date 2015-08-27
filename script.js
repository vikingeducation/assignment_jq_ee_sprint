$(document).ready(function(){

  function charCount(ele, in_max, count_id) {
		var count =  ele.value.length;
    if (count === 0) {
      $(count_id).html("");
    } else if (count > in_max ){
			ele.style.borderColor = "red";
			$(count_id).html("You are " + (count - in_max) + " characters over");
		}else{
			$(count_id).html((in_max - count) + " Characters remaining");
		}

  }

  // var count = $('.text-1');
  // var in_max = 3;
  $('.text-1').keyup(function() {charCount(this, 32, "#input_count")});
  $('.textarea-1').keyup(function() {charCount(this, 140, "#textarea_count")});
  $('.pwd-1').keyup(function() {charCount(this, 16, "#pwd_count")});
  $('.pwd-conf').keyup(function() {charCount(this, 16, "#pwd_conf_count")});
  $('.pwds').keyup(function() {
    if ($('.pwd-conf').val() != $('.pwd-1').val()) {
      $('#pwd_match').html("Your password confirmation has to match your password!");
      $('.pwd-conf').addClass('red-border');
    }else if (($('.pwd-conf').val() == "" ) || ($('.pwd-1').val() == "") ){
    	$('.pwd-conf').removeClass('red-border');
    	$('#pwd_match').html("");
    } 
    else {
      $('#pwd_match').html("");
      $('.pwd-conf').removeClass('red-border');
    }
  });

  function validate() {
    if(($('.text-1').val().length > 3 && $('.text-1').val().length < 33)          &&
       ($('.textarea-1').val().length > 3 && $('.textarea-1').val().length < 141) &&
       ($('.pwd-1').val().length > 5 && $('.pwd-1').val().length < 17)            &&
       ($('.pwd-conf').val().length > 5 && $('.pwd-conf').val().length < 17)      &&
       ($('.pwd-1').val() === $('.pwd-conf').val())
      ) {
      $('.submit-btn').attr('disabled', false);
    } else {
      $('.submit-btn').attr('disabled', true);
    }
  };

  // $("#dropper").hover(function(e){
  //   e.preventDefault();
  //   $(this).first().stop(true,true).slidedown();
    
  // });
// var interval;
// $('select').hover(
//   function(){
//     var count = $(this).children().length;
//     // $(this).attr('size', count);
//     interval = setInterval(
//       function() {
//         $('select').attr('size', 
//                           function(ind, val) {
//                             var v = parseInt(val)? parseInt(val) : 0;
//                             if (v < count) {return v+1;}
//                             else {return count}
//                           }
//                         )
//       },
//       50
//       )
//   },
//   function(){
//     clearInterval(interval);
//     $(this).removeAttr('size');
//   }
// );

  $('.submit-btn').attr('disabled', true);
  $('.form-1').keyup(validate);

$('li.dropdown').hover(
   function(){
       $(this).find('ul').slideDown();
   },
   function(){
       $(this).find('ul').slideUp();
   });

$('.dropdown-menu li').hover(
  function(e) {
    $(e.target).css('background-color', 'grey');
    $(e.target).css('cursor', 'pointer');
  },
  function(e) {
    $(e.target).css('background-color', 'white');
  }
  );

$('.dropdown-menu li').click(
  function(e) {
    var option = $(e.target).html();
    $('#box').html(option);
      // console.log($(e.target));
    $(e.target).parent().slideUp();
  }
  );


});












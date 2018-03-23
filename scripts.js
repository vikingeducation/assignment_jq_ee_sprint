
//jquery

$(document).ready(function(){

/*=============================
form
===============================*/

//text counter
  //Blank function that counts fields
  function counter(field, max, count){
    $(field).keyup(function(){
      var length = [max - $(this).val().length];
      if(length == max){
        $(count).text('')
      }
      else {
        $(count).text(length);
      };
    });
  };

  //Fill up that blank function with values to count the fields
  //fuck yeah object orientation
  counter('#textfield', 32, '#textfieldcounter')
  counter('#textarea', 140, '#textareacounter')
  counter('#password', 16, '#passwordcounter')
  counter('#passwordconfirm', 16, '#passwordconfirmcounter')





  //check if passwords match function
  var match = false;
  function checkMatch(){
    var password = $('#password').val();
    var passwordconfirm = $('#passwordconfirm').val();


    if (passwordconfirm == ""){
      $('#matchMaker').text('');
    } else if (password != passwordconfirm){
      $('#matchMaker').text("passwords don't match bro");
    } else {
      $('#matchMaker').text('passwords match');
      return match = true;
    }
  };


//Check if password matches with every key
  $('#passwordconfirm').keyup(checkMatch);






//BlANK VALIDATION FUNCTION
//so proud of this
  function maxMinValidation(fieldCounter, min, field, errorbox, errormessage){
    var textNum = Number($(fieldCounter).html())
    if(textNum > min || textNum < 0){
      $(field).addClass('redBox');
      $(errorbox).text(errormessage);
    } else {
      $(field).removeClass('redBox');
      $(errorbox).text('');
    }
  }

//check if validations are met
/*I discovered in order to pass arguments into click
you need an anonymous function handler*/
  $('#submit').click(function(){
    maxMinValidation('#textfieldcounter', 28, '#textfield', '#errortextfield', 'must be 4-32 characters'),
    maxMinValidation('#textareacounter', 136, '#textarea', '#errortextarea', 'must be 4-140 characters'),
    maxMinValidation('#passwordcounter', 10, '#password', '#errorpassword', 'must be 6-16 characters'),
    maxMinValidation('#passwordconfirmcounter', 10, '#passwordconfirm', '#errorconfirm', 'must be 6-16 characters')
  }
  );

/*=====================
dropdown
=======================*/

var $mainSelect = $('#main')
//hide li items on page load
$('.li').hide();

//click top itme to expand list
function menuSlide(){
  $mainSelect.click(function(){
    $('.li').slideToggle();
  });
};

menuSlide()
//Select li item adn hide others
$('.li').click(function(){
  $mainSelect.text($(this).text());
  $(".li").slideToggle();
})
//add background-color to hover selection
$('.li').hover(
  function(){$(this).addClass('hoverBackground')},
  function(){$(this).removeClass('hoverBackground')}
);


/*=============
PHOTO TAGGER
==============*/

//box
var $box = $('.box2')
$box.hide();

//optionsBox
var $optionsBox = $('.optionsBox2')
$optionsBox.hide();

//tagBox
var $tagBox = $('<div></div>')
  .addClass('tagBox');
$('.photo').append($tagBox);
$tagBox.hide();

//follow mouse with box https://stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div
function moveBox(){
  $('.photo').on('mousemove', function(e){
    $box.offset({
      left: e.pageX,
      top: e.pageY
    });
  });
};

//show box when mouse hovers
$('.photo').hover(
  function(){
    $box.show();
    //$optionsBox.show();
    moveBox();
  },
  function(){
    $box.hide();
  }
)

//click to tag
$('.photo').click( function(e) {

//when click show optionsBox
    $optionsBox.show();
    $optionsBox.offset({
      left: e.pageX,
      top: e.pageY + 40
    })
//when click sticky a new box
    $tagBox.show();
    $box.hide();
    $tagBox.offset({
      left: e.pageX,
      top: e.pageY - 20
    })
});

//select a name for
$('.friend').on('click', function(e){
  e.stopPropagation();
  $($tagBox).text($(this).text());
  $($optionsBox).hide();
})

// I still can only add one tag at a time
//it looks like shit


});//end document ready

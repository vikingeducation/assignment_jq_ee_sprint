
//jquery

$(document).ready(function(){


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
you need an anonymous function*/
  $('#submit').click(function(){
    maxMinValidation('#textfieldcounter', 28, '#textfield', '#errortextfield', 'must be 4-32 characters'),
    maxMinValidation('#textareacounter', 136, '#textarea', '#errortextarea', 'must be 4-140 characters'),
    maxMinValidation('#passwordcounter', 10, '#password', '#errorpassword', 'must be 6-16 characters'),
    maxMinValidation('#passwordconfirmcounter', 10, '#passwordconfirm', '#errorconfirm', 'must be 6-16 characters')
  }
  );



});//end document ready


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


var inputs = {
  textfieldmin: 4,
  textfield: 32,
  textareamin: 4,
  textarea: 140,
  passwordmin: 6,
  password: 16,
};


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
  counter('#textfield', inputs.textfield, '#textfieldcounter')
  counter('#textarea', inputs.textarea, '#textareacounter')
  counter('#password', inputs.password, '#passwordcounter')
  counter('#passwordconfirm', inputs.password, '#passwordconfirmcounter')

//Check if password matches
  $('#passwordconfirm').keyup(checkMatch);

  //check if validations are met
  $('#submit').click(
      textfieldvalidation
  );

});

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


//textfieldvalidation
function textfieldvalidation(){
  var textnum = Number($('#textfieldcounter').html())
  if(textnum > 28 || textnum < 0){
    $('#textfield').addClass('redBox');
  }
}


var inputs = {
  textfieldmin: 4,
  textfield: 32,
  textareamin: 4,
  textarea: 140,
  passwordmin: 6,
  password: 16,
};


//jquery

//text counter
$(document).ready(function(){

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
/*
//text field counter
  $('#textfield').keyup(function(){
    var len = [32 - $(this).val().length];
    if(len == 32){
      $("#textfieldcounter").text('')
    } else {
      $('#textfieldcounter').text(len);
    };
  });
//text area counter
  $('#textarea').keyup(function(){
    var len = [140 - $(this).val().length];
    if(len == 140){
      $("#textareacounter").text('')
    } else {
      $('#textareacounter').text(len);
    };
  });
*/





});

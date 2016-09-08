var textcounter = function (selector, counter, maxCount) {
  $(selector).on('keydown', function() {
      var letterCount = this.value.length
      if(letterCount === 0) {
         $(counter).text("")
       } else {
      $(counter).text((maxCount - letterCount) + " characters left" )
      }
    }
  )
}

textcounter("#text-field", "#text-field-counter", 32);
textcounter("#text-area", "#text-area-counter", 140);
textcounter("#password", "#password-counter", 16);
textcounter("#password-conf", "#password-conf-counter", 16);

var isValidCounter = function(selector, min, max) {
  if !($(selector).value.length > min && $(selector).value.length < max  ) {
    return $(selector);
  }
};

var validPasswords = function(password, passwordconf) {
  return $(password).value === $(passwordconf).value;
}

validPassword("#password", "#password-conf")

isValidCounter("#text-field", 4, 32)
isValidCounter("#text-area", 4, 140)
isValidCounter("#password", 6, 16)
isValidCounter("#password-conf", 6, 16)

$('#submit').on('click', function() {

});

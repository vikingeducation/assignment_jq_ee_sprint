// const displayRemaining = function(elem, initial){
//   var $element = $(elem)
//   var $parent = $element.closest($('div'))
//   $element.next($('p.remain')).remove();
//   var len = getLength($element);
//   if (len > 0){
//     var input = initial - len
//     var text = `${input} characters remaining`;
//     createP($parent, text)
//   }
//
// }
// const getLength = function(element){
//   return $(element)[0].value.length
// }
//
// const createP = function(parent, input){
//   $(parent).append(`<div class='remain'>${input}</div>`)
// }
//
// const passwordVal = function(element){
//   var passwords = $(`input[type=password]`)
//   var length = getLength(passwords[0]);
//   console.log(length)
//   var password = passwords[0].value;
//   console.log(password)
//   var confirm = passwords[1].value;
//   console.log(confirm)
//   for (var i=0; i<=length; i++){
//     if (confirm[i] != password[i] && password[i] != confirm[i]){
//       $('div.confirm div').remove();
//       createP('div.confirm', 'Your passwords do not match');
//       passwords.css('borderColor', 'red');
//       return false
//     } else {
//       passwords.css('borderColor', 'initial')
//     }
//   }
// }
//
// const checkVals= function(forms){
//   for (var i=0; i<forms.length; i++){
//     switch(forms[i].className){
//       case 'text':
//         var $text = $('input.text')
//         if (valLen($text, 4)){
//           errorMess($text, 4);
//         };
//         break
//       case 'textarea':
//         var $textarea = $('div.textarea textarea')
//           if (valLen($textarea, 4)){
//             errorMess($textarea, 4)
//           }
//         break;
//       case 'password':
//         var $password = $('input.password')
//           if (valLen($password, 6)){
//             errorMess($password, 6);
//           }
//         break;
//       case 'confirm':
//         passwordVal($('input.confirm'));
//         break;
//     }
//   }
// }
//
// const errorMess = function(elem, minLen){
//   elem.css('borderColor', 'red');
//   elem.parent().append(`<p>Minimum length of ${minLen} required</p>`);
// }
//
//
// const valLen = function(elem, length){
//   return (elem[0].value.length < length)? true : false
// }
//
// const getFormFields = function(){
//   var forms = $('form div');
//   return forms
// }
//
// const init = function(el, chars){
//   $(el).keydown(function(){
//     displayRemaining(this, chars)
//   })
// }
//
//
// $(document).ready(function(){
//   $('input.text').keydown(function(e){
//     console.log(e)
//     displayRemaining(this, 32)
//   })
//   $('textarea').keydown(function(){
//     displayRemaining(this, 140)
//   })
//   $('input.password').keydown(function(){
//     displayRemaining(this, 16)
//   })
//   $('input.confirm').keydown(function(){
//     displayRemaining(this, 16);
//     passwordVal(this);
//   })
//   $('.submit').click(function(event) {
//     event.preventDefault();
//     checkVals(getFormFields());
//   })
//
//
//
// })
var _validate = function($target, isValid, message){
  var id = $target.attr('id');
  if (isValid){
    $target.removeClass('invalid');
    !$target.val().length || $target.addClass('valid')
  } else {
    $target.removeClass('valid')
      .addClass('invalid');
  }
  var $message = $('*[invalid="' + id +'"]');
  message = isValid ? "" : message;
  $message.text(message);
}

var _validationListener = function(e) {
  var $target = $(e.target);
  var attributes = Object.keys(_validationListeners);
  var isValids = [];
  var messages = [];
  $.each(attributes, function(index, attribute){
    if ($target.attr(attribute)) {
      var result = _validationListeners[attribute]($target);
      isValids.push(result.isValid);
      if (!result.isValid){
        messages.push(result.message)
      }
    }
  });
  var isValid = isValids.reduce(function(prev, current) { return prev && current});
  _validate($target, isValid, messages.join(', '))
};

var _minLength = function($target){
  var length = $target.val().length;
  var min = $target.attr('my-min-length');
  return {
    isValid: length >= min || !length,
    message: (min - length) + ' more characters needed'
  };
};

var _matches = function($target){
  var id = '#' + $target.attr('my-matches');
  var $confirmation = $(id);
  var password = $target.val();
  var confirm = $confirmation.val();
  return {
    isValid: confirm === password || !password.length,
    message: 'Passwords must match'
  };
}


var _validationListeners = {
  'my-min-length': _minLength,
  'my-matches': _matches
};

var _registerEventListeners = function(){
  $.each(['input', 'textarea'], function(index, name){
    $('body').on('keyup', name, _validationListener);
  });
}

var _finalValidation = function() {
  $.each(['input', 'textarea'], function(index, name){
    if ($(name).hasClass('invalid')){
      $('form').append('<p>please correct the errors</p>')
    }
  });
}

$(document).ready(function(){
  _registerEventListeners();
  $('.submit').click(function(e){
    e.preventDefault();
    _finalValidation();
  })

})

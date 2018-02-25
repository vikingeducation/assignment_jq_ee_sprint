$(document).ready(function(){

class formField{
  constructor(type){
    this.field = $(type.get(0));
    this.info = $(type.get(1));
    this.valid = false;
  }
}

function charLimit(form, min, max){
  if (form.field.val().length >= min && form.field.val().length <=max && form.field.val().length > 0){
  form.info.text(max + " character limit, " + (max - form.field.val().length) + " characters remaining");
    form.valid = true;
  }
  else if (form.field.val().length <= 0){
    form.info.text("");
    form.valid = false;
  }
  else if (form.field.val().length > max){
    form.info.text(max + " character limit, " + (form.field.val().length - max) + " characters over");
    form.valid = false;
  }
  else if (form.field.val().length < min){
    form.info.text(min + " character minimum, " + (min - form.field.val().length) + " characters under");
    form.valid = false;
  }
  else {
    form.info.text("");
    form.valid = false;
  }
}

function unmark(form){
  if (form.valid === true){
    form.field.css({'background-color' : 'initial'})
    form.info.css({'color': 'initial'});
  }
}

let username = new formField($('.un'));
username.field.on("keyup", function(){
  charLimit(username, 4, 32);
  unmark(username);
});

let password = new formField($('.pw'));
password.field.on("keyup", function(){
  charLimit(password, 6, 16);
  unmark(password);
});

let passwordConfirm = new formField($('.pwc'));
passwordConfirm.field.on("keyup", function(){
  if (passwordConfirm.field.val() == password.field.val()){
    passwordConfirm.info.text("passwords match");
    passwordConfirm.valid = true;
  }
  else {
    passwordConfirm.info.text("The passwords do not match");
    passwordConfirm.valid = false;
  }
  unmark(passwordConfirm);
});

let comment = new formField($('.cmnt'));
comment.field.on("keyup", function(){
  charLimit(comment, 4, 140);
  unmark(comment);
});


function validate(form){
  if (form.valid !== true){
    form.field.css({'background-color' : 'red'})
    form.info.css({'color': 'red'});
  }
}

$('#button').on("click", function(){
  validate(username);
  validate(password);
  validate(passwordConfirm);
  validate(comment);
});

//---Dropdown Menu Controls---------->
$('nav ul').on('mouseenter', '.menu1', function(){
  $('.menu1 ul').removeClass("hidden");
});

$('nav ul').on('mouseleave', '.menu1', function(){
  setTimeout(function(){
    $('.menu1 ul').addClass("hidden");
  }, 300);
});

$('nav ul').on('click', '.menu1 ul li', function(){
  $('.menu1 .selected').text($(this).text());
});

//---Photo Tagger Controls--------->
$(document).bind('mousemove', function(e){
    $('.tagger').css({
       left:  e.pageX - 55,
       top:   e.pageY - 55
    });
    if ($('.tagger').hasClass('hidden')) {
      $('.tagger').removeClass('hidden');
    }
});

$(document).on('mouseleave', '.tagging', function(){
  $('.tagging').attr('class', 'tagger');
});

$(document).on('click', '.tagger', function(e){
  $('.tagger').attr('class', 'tagging');
});

$(document).on('click', '.tagging li', function(e){
  $('.tagging .name').text($(event.target).text());
  $('.tagging .xBox').removeClass('hidden');
  $('.tagging').attr('class', 'tagged');
  $( ".container" ).append("<div class='tagger hidden'><div class='xBox hidden'>x</div><div class='frame'></div><div class='name'><ul><li>One</li><li>Two</li><li>Three</li><li>Fork</li><li>Fyve</li></ul></div></div>");
});


$(document).on('click', '.xBox', function(e){
  $(e.target).parent().remove();
});

});



$(document).ready(function(){
    // input length remaining
    $('.form-class').keyup(textCounter);

    // password match message
    $(".confirm-password-match").toggle(false);
    $("input[name='confirm-password']").keyup(passwordConfirmMatch);

    // form validation on submit
    $("input[type='submit']").click(submitValidation);

    // menu
    $(".menu-item").slideUp(0);
    $(".menu-top").click(menuToggle);
    $(".menu-item").hover(menuItemHoverEnter, menuItemHoverLeave);
    $(".menu-item").click(menuItemClick);

    // photo TAGGING
    $(".imageFile").mouseenter(targetBox);
    $(".imageFile").mouseleave(delTargetBox);
    $(".imageFile").mousemove(setTargetBoxLoc);
    $(".imageFile").click(pickNameMenu);

    // Simon GAME
    var theSimonGame = {
        simonArray: [],
        speed: 500,
        counter: 0,
        simonClick: function(event) {

          //do blink
            if ($(event.target).is(".red")) {
              $(event.target).fadeOut(100).fadeIn(100);
            } else if ($(event.target).is(".green")) {
              $(event.target).fadeOut(100).fadeIn(100);
            } else if ($(event.target).is(".yellow")) {
              $(event.target).fadeOut(100).fadeIn(100);
            } else if ($(event.target).is(".blue")) {
              $(event.target).fadeOut(100).fadeIn(100);
            };

          // check accuracy for this click
            if ($(event.target).is(".red") && theSimonGame.simonArray[theSimonGame.counter] != '.red') {
              theSimonGame.wrong();
            } else if ($(event.target).is(".green") && theSimonGame.simonArray[theSimonGame.counter] != '.green') {
              theSimonGame.wrong();
            } else if ($(event.target).is(".yellow") && theSimonGame.simonArray[theSimonGame.counter] != '.yellow') {
              theSimonGame.wrong();
            } else if ($(event.target).is(".blue") && theSimonGame.simonArray[theSimonGame.counter] != '.blue') {
              theSimonGame.wrong();
            } else {
              theSimonGame.counter++;
            };

          // have they reached the end?
          if (theSimonGame.counter == theSimonGame.simonArray.length) {
            theSimonGame.counter = 0;
            theSimonGame.addNewMove();
            theSimonGame.simonPlay();
            theSimonGame.speed -= 20;
            if (theSimonGame.speed < 100) {theSimonGame.speed = 100;}
          }

        },
        /* simonPlay is linked to moveNext to get different elements to sequence rather
            than animate in parallel as the fadeIn/Out are linked to different div's and
            therefore different fx queues otherwise.  This forces the next item to wait
            until the first one is done before it iterates.  It's a two function for loop :-)
        */
        simonPlay: function(){
            if (theSimonGame.simonArray.length == 0) {
              theSimonGame.addNewMove();
            }
            if (theSimonGame.counter == theSimonGame.simonArray.length) {
              theSimonGame.counter = 0;
              return;
            };
            $(theSimonGame.simonArray[theSimonGame.counter]).fadeOut(theSimonGame.speed).fadeIn(theSimonGame.speed, theSimonGame.moveNext);

        },
        moveNext: function(){
          theSimonGame.counter++;
          theSimonGame.simonPlay();
        },
        addNewMove: function(){
          var randomNextMove = Math.floor(Math.random() * 4);
          console.log(randomNextMove);
          switch (randomNextMove) {
            case 0:
              theSimonGame.simonArray.push(".red");
              break;
            case 1:
              theSimonGame.simonArray.push(".blue");
              break;
            case 2:
              theSimonGame.simonArray.push(".green");
              break;
            case 3:
              theSimonGame.simonArray.push(".yellow");
              break;
            default:

          }
        },
        wrong: function() {
          alert("Sorry, you fucked it up");
          theSimonGame.simonArray = [];
          theSimonGame.counter = 0;
        }

    }
    $(".simongame").click(theSimonGame.simonClick);
    $(".simongame").hover(theSimonGame.simonPlay);


});

/* TEXTCOUNTER
   Calculate the length of text in a field and
   update a label in an adjacent element with a .text-counter
   class to show the characters remaining against the MAXlength
   set in the field parameters.  Only requirement is that Maxlength
   must be set and the target .text-counter element to be updated must
   be the next sibling with that class closest to the source field.
*/
var textCounter = function(event){
  var textLength = event.target.value.length;
  var maxLength = event.target.maxLength;
  var $textCounter;

  if (textLength) {
    $(event.target).next(".text-counter").text((maxLength - textLength) + " remaining");
    $(event.target).next(".text-counter").toggle(true);
  } else {
    $(event.target).next(".text-counter").toggle(false);
  }
}

/* CONFIRM PASSWORD MATCH
   Direct check between password field and confirm password field
   targeted by name.
*/
var passwordConfirmMatch = function(){
  var originalPassword = $("input[name='password']").val();
  var confirmPassword = $("input[name='confirm-password']").val();

  if (originalPassword !== confirmPassword) {
    $(".confirm-password-match").toggle(true);
    $("input[name='confirm-password']").addClass("warning");
  } else {
    $(".confirm-password-match").toggle(false);
    $("input[name='confirm-password']").removeClass("warning");
  }

  if (confirmPassword.length == 0) {$(".confirm-password-match").toggle(false);};
}

/* SUBMIT VALIDATION
    Check for:
      text field 4-32
      textarea 4 - 140
      password & confirmation 6-16
      password match
*/
var submitValidation = function(event){
  event.preventDefault();

  // clean-up warnings in the event this is a re-submit
  $(".warningMessage").remove();
  $(".warning").removeClass("warning");

  // get values to check
  var inputText = $("input[name='text-input']").val();
  var inputTextarea = $("textarea[name='comments']").val();
  var originalPassword = $("input[name='password']").val();
  var confirmPassword = $("input[name='confirm-password']").val();

  // no need to check for upper end as can't be exceeded due to maxlength checks
  if (inputText.length < 4) {addWarning($("input[name='text-input']"), "Text too short!")}
  if (inputTextarea.length < 4) {addWarning($("textarea[name='comments']"), "Textarea too short!")}
  if (originalPassword.length < 6) {addWarning($("input[name='password']"), "Password too short!")}
  if (confirmPassword.length < 6) {addWarning($("input[name='confirm-password']"), "Password too short!")}
}

/* HELPER FUNCTION - ADD WARNING
    Builds and adds warning function to passed in jQuery target with message
*/
var addWarning = function($target, message){
    var warningMsg = "<span class='warningMessage'>" + message + "</span>";

    $target.addClass("warning");
    $target.after(warningMsg);
}

/* MENU FUNCTIONS
  menuToggle - open and close menu itmes
  menuItemHoverEnter - upon entry into menu item update classes
  menuItemHoverLeave - upon exit from menu item update classes
  menuItemClick - when clicked update top and slide all closed
*/
var menuToggle = function() {

    $('.menu-item').slideToggle();

}
var menuItemHoverEnter = function(event) {
  console.log(event);
  $(event.target).removeClass("menu-item");
  $(event.target).addClass("menu-item-hover");
}
var menuItemHoverLeave = function(event) {
  $(event.target).removeClass("menu-item-hover");
  $(event.target).addClass("menu-item");

}
var menuItemClick = function(event) {
  $('.menu-top').text($(event.target).text());
  $('.menu-item').slideUp();
  $(event.target).slideUp();

  //insert clicked menu item into form field and submit
  $('input[name="menuInput"]').val($(event.target).text());
  alert("$('.menu-form').submit(); would be called if we wanted to submit for real, but if we did that we couldn't see the cool menu working!");
}


/* IMAGE TAGGING

*/

// create target box on entering image
var targetBox = function(event) {
  var $div = $('<div></div>')
        .attr('class', 'target-box');
  $(event.target).parent().append($div);
}

// move target box with mouse
var setTargetBoxLoc = function(event) {
  var $targetBox = $(".target-box:last");
  $targetBox.css('left', event.pageX);
  $targetBox.css('top', event.pageY);
}

// user left image without click event in place, will always be last one in list
var delTargetBox = function(){
  $(".target-box:last").remove();
  $(".name-menu-item").remove();
  $(".name-menu").remove();
  $(".imageFile").mousemove(setTargetBoxLoc);
}

// show dropdown menu for name selection upon click
var pickNameMenu = function(event) {

  var cleanup = function() {
    $(".name-menu-item").remove();
    $(".name-menu").remove();
    $(".imageFile").mousemove(setTargetBoxLoc);
  }

  // clicked in the image box, but there is no menu showing so freeze the box and show menu
  if ($(".name-menu-item").length === 0)
    {
      // stop box movement
      $(".imageFile").off("mousemove");

      var $namemenu = $('<div></div>')
          .attr('class','name-menu');
      $namemenu.css('top', event.pageY + 55);
      $namemenu.css('left', event.pageX);
      $(".target-box:last").after($namemenu);

      var $namemenuItems = $('<div>Waldo</div><div>Fred</div><div>Jane</div><div>Giraffe</div>')
        .attr('class','name-menu-item');
      $(".name-menu").append($namemenuItems);
      $(".name-menu-item").slideUp(0);
      $(".name-menu-item").slideDown();
      return;
  }

  // click outside box and menu so remove menu and float the box again
  if ($(event.target).is("img")) {
    cleanup();
    setTargetBoxLoc(event);
    return;
  }

  /* clicked on the menu item so save it, add a span to hold it and then ditch the
     menu as well as add another floating box when the user moves again*/
  if ($(event.target).is(".name-menu-item")) {
    var $boxName = $('<span></span>')
        .attr('class', 'box-name');
    var position = $(".target-box:last").position();
    $boxName.css({'top': position.top + 55,
                  'left': position.left,
                  'background-color': 'green',
                  'border': 'none'});
    $(".target-box:last").after($boxName);
    $(".target-box:last").css('border-color','green');
    $(".box-name:last").text($(event.target).text());
    //do clean-up
    cleanup();
    targetBox(event);
    return;
  }
}

/* SIMON GAME

*/

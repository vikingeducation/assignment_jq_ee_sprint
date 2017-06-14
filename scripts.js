var formHandlers = {

  handlerTextLimit: function(eventObj) {
    // obtain class of object and find that object with that class
    // and char-count
    var target = $(eventObj.target);
    var className = target.attr("class").split(' ')[0];
    var len = target.val().length;
    var maxChar = target.attr("char-high");

    // Locate elements with the className and "char-count" class
    var charCountEle = $("." + className + ".char-count");
    // case 1: no input
    if (len < 1) {
      $(charCountEle).text("");
    }
    // case 2: greater than 0 and valid length
    else if (-1 < maxChar - len) {
      $(charCountEle)
      .text(maxChar - len + " remaining characters...")
      .attr("style", "color: black");
    }
    // case 3: input is too large
    else if (len > maxChar) {
      $(charCountEle)
      .text("TOO MANY CHARACTERS!!!")
      .attr("style", "color: red");
    }
  },


  handlerPasswordConformation: function(eventObj) {
    var target = $(eventObj.target);
    var className = target.attr("class").split(' ')[0];
    var len = target.val().length;

    // Locate elements with the className and "char-match" class
    var charMatchEle = $("." + className + ".char-match");

    // no input
    if (len < 1) {
      $(charMatchEle).text("");
    } else {
      // locate both password inputs
      var passwordArray = $("input[type='password']");

      if($(passwordArray[0]).val() === $(passwordArray[1]).val()){
        $(charMatchEle)
        .text("Passwords are a match!")
        .attr("style", "color: green");
      } else {
        $(charMatchEle)
        .text("Passwords don't match..")
        .attr("style", "color: red");
      }
    }
  },


  handlerSubmit: function(){
    $(".create").each(
      function() {
        var targetInput = $(this);
        var className = targetInput.attr("class").split(' ')[0];
        var targetPar = $("p." + className + ".char-count");
        var len = targetInput.val().length;
        var charLow = targetInput.attr("char-low");
        var charHigh = targetInput.attr("char-high");

        if(charLow > len){
          $(targetPar)
          .text("Need at least " + charLow + " characters!")
          .attr("style", "color: red");
        } else if(charHigh < len){
          $(targetPar)
          .text("Need less than " + charHigh + " characters!")
          .attr("style", "color: red");
        }
      }
    );
  }
}

let countryColors = {
  brazil: "#FEDF00",
  sweden: "#006AA7",
  usa: "#E71029",
  argentina: "#74ACDF",
  default: "#DCDCDC"
}

var dropDownHandlers = {

  handlerDropDownMenu: function(){
    $("li").each(
      function() {
        if($(this).css("display") === "none"){
          $(this).fadeIn(1000);
        } else {
          $(this).fadeOut(1000);
        }
      }
    );
  },

  handlerHoverColor: function(eventObj){
    $("li").each(
      function() {
        $(this).css("background-color", countryColors.default);
      }
    );
    var id = $(eventObj.target).attr("id");
    $(eventObj.target).css("background-color", countryColors[id]);
  },

  handlerSelectClick: function(eventObj) {
    var country = $(eventObj.target).text();
    $("#selected")
    .text(country);
  }

};

let targetBoxCreationStatus = false;

function insidePicture(eventObj){
  let target = $("#taggedPhoto");
  let position = target.position();
  let posXMin = position.left;
  let posXMax = posXMin + target.width();
  let posYMin = position.top;
  let posYMax = posYMin + target.height();

  return (
  eventObj.pageX > posXMin &&
  eventObj.pageX < posXMax &&
  eventObj.pageY > posYMin &&
  eventObj.pageY < posYMax
  );
}

const photoTaggingHandlers = {

  handlerTargetMovement: function(eventObj) {
    // show the target box if we are inside pic and not creating tag
    if(insidePicture(eventObj) && !targetBoxCreationStatus){
      $("#targetingBox")
      .show()
      .css("left", eventObj.pageX - 50)
      .css("top", eventObj.pageY - 50);
    } else {
      $("#targetingBox").hide();
    }
  },

  handlerCreateTaggedPhoto: function(eventObj){
    // Check to make sure that the click is INSIDE the picture
    if(!insidePicture(eventObj)) return;

    // Are already in the process of making a tagbox?
    if(targetBoxCreationStatus){
      return;
    } else {
      // well.. we are now!
      targetBoxCreationStatus = true;
    }

    // Obtain position of target box to set position of new tagBox
    let target = $("#targetingBox");
    let position = target.position();
    let posX = position.left;
    let posY = position.top;

    // Create new tag box
    $newTagBox = $("<div></div>")
    .addClass("taggedBox")
    .addClass("current")
    .css("width", "100px")
    .css("height", "100px")
    .css("border", "solid 10px green")
    .css("position", "absolute")
    .css("left", posX)
    .css("top", posY);

    // Create new name box (will be inserted below tag box)
    $newNameBox = $("<div></div>")
    .addClass("nameBox")
    .addClass("current")
    .css("display", "inline-block")
    .css("width", "100px")
    .css("height", "auto")
    .css("border", "10px solid green")
    .css("background-color", "white")
    .css("position", "absolute")
    .css("left", posX)
    .css("top", posY + 100);



  // Make names and append them into namebox
  let names = ["Jerry", "Jim", "Jelly", "Jam"];

  for(let i = 0; i < names.length; i++){
    // create name option
    $nameSelect = nameOption(names[i], true);

    // insert name option into name box
    $newNameBox.append($nameSelect);
  }

  // insert name box, then tag box
  $($newNameBox).insertAfter("#targetingBox");
  $($newTagBox).insertAfter("#targetingBox");

  $(document).on("click", function(eventObj){
    let nameTest = $(eventObj.target).attr("class");

    if(nameTest != null && nameTest.split(" ")[0] == "nameSelection"){
      // will insert useful stuff here eventually
      handlerCreateLastingTag(eventObj);
    } else {
      // Reset the process and go back to using target box on picture
      $("#targetingBox").next().remove();
      $("#targetingBox").next().remove();

      // turn off all picture options and reset
      // this doesn't seem like a best practice... ask someone about alternatives
      $(this).off();
      $(document).mousemove(photoTaggingHandlers.handlerTargetMovement);
      $(document).on("click", photoTaggingHandlers.handlerCreateTaggedPhoto);
    }
    targetBoxCreationStatus = false;
  });
}

};

// function to make names to insert into name box
function nameOption(personName, hoverOption){
  $nameSelect = $("<p></p>")
  .css("width", "100%")
  .css("height", "auto")
  .css("display", "inline-block")
  .css("font-size", "16px")
  .css("padding", "5px")
  .css("cursor", "pointer")
  .addClass("nameSelection")
  .text(personName);

  if(hoverOption){
    $nameSelect
    .addClass("current")
    .hover(function(){
      $(this).css("background-color", "gray");
    }, function(){
      $(this).css("background-color", "white");
    });
  } else {
    $nameSelect.css("background-color", "red");
  }
  return $nameSelect;
}


function handlerCreateLastingTag(eventObj){
  /*
  1. find the name that was clicked on and assign that to something
  2. delete all buttons within
  4. change background-color of only one left
  5. change border color of both "current" div items to red
  6. remove class of "current" from both newly made divs
   */

   // find name that was clicked on
  let nameSelected = $(eventObj.target).text();
  console.log(nameSelected);

  // delete all buttons with "current" name selection
  $(".nameSelection.current").each(function(){
    $(this).remove();
  });

  // change border-color of "current" nameBox and
  $(".taggedBox.current").css("border-color", "red");
  $(".nameBox.current").css("border-color", "red");

  // Add our new name to namebox
  $(".nameBox.current").append(nameOption(nameSelected, false));

  // Get rid of "current" artifact class so we can use it later
  $(".current").removeClass("current");
}

$(document).ready(function() {

  $(".username").on("change keyup paste", function(eventObj) {
    formHandlers.handlerTextLimit(eventObj);
  });

  $("textarea").on("change keyup paste", function(eventObj) {
    formHandlers.handlerTextLimit(eventObj);
  });

  $(".password-original").on("change keyup paste", function(eventObj) {
    formHandlers.handlerTextLimit(eventObj);
  });

  $(".password-conformation").on("change keyup paste", function(eventObj) {
    formHandlers.handlerTextLimit(eventObj);
  });

  $(".password-conformation").on("change keyup paste", function(eventObj) {
    formHandlers.handlerPasswordConformation(eventObj);
  });

  $("input[type='submit']").on("click", formHandlers.handlerSubmit);

  $("#selected").on("click", dropDownHandlers.handlerDropDownMenu);

  $("li").hover(dropDownHandlers.handlerHoverColor);

  $("li").on("click", dropDownHandlers.handlerSelectClick);

  $("li").on("click", dropDownHandlers.handlerDropDownMenu);


  $(document).mousemove(photoTaggingHandlers.handlerTargetMovement);

  $(document).on("click", photoTaggingHandlers.handlerCreateTaggedPhoto);

});

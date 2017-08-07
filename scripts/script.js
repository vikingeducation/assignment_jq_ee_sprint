//-----------------Problem 1 functions
//Return text length
function textCount ($item) {
  var counter = $item.val().length;
  return counter;
}

//Tell remaining letters usable
function charCounter($item, inputIdName, maxTotal ) {
  if ($("#"+inputIdName).length) {
    $("#"+inputIdName).remove();
  }
  var counted = textCount($item);
  if (counted) {
    $item.after($("<span>")
      .text(maxTotal - counted + " remaing")
      .attr("id", inputIdName)
    )
  }
}

//Validate input
function validateInput($item, minVal, maxVal){
  if ( ( ($item.val().length < minVal) || ($item.val().length > maxVal) ) && ($item.hasClass("highlightedText")==0) )  {
    $item.addClass("highlightedText");
    $item.after("<div class='alert alert-danger'> <strong>Sorry</strong> Please enter a name between 4-32 characters. </div>");
  }
  //if input is correct => remove warnings if up
  else if ( ($item.val().length >= minVal) && ($item.val().length <= maxVal) ) {
    $item.removeClass("highlightedText");
    $(".alert").remove();
  }
}


$(window).on("load", function() {

//-----------Problem 1 form validation------------
  //Name char counter
  $inputName = $("input[type='text'][name='name']");
  var inputIdName = "textCounter";
  var inputMax = 32;
  $inputName.on("keyup",function() {charCounter($inputName,inputIdName,inputMax) });

  //Text area counter
    $textAreaName = $("textarea");
    var textArea = "textAreaCounter";
    var textMax = 140;
    $textAreaName.on("keyup", function() {charCounter($textAreaName, textArea, textMax) });

    //Pass char counter
    $passName = $("input[type='password'][name='pass']");
    var passId = "passwordIdName";
    var passwordMax = 16;
    $passName.on("keyup", function() {charCounter($passName, passId, passwordMax)});

    //Pass Confirm char counter
    $passConfirmName = $("input[type='password'][name='passConfirm']");
    $passConfirmName.on("keyup", function() {
      if ($("#passConfirmCounter").length) {
        $("#passConfirmCounter").remove();
        $("#passConfirmer").remove();
      }
      var counted = textCount($passConfirmName);
      if (counted) {
        $passConfirmName.after($("<span>")
          .text(16 - counted + " remaing")
          .attr("id", "passConfirmCounter")
        )
        if ($passConfirmName.val() != $passName.val()) {
          $passConfirmName.after($("<span>")
            .text("Passwords must match")
            .attr("id", "passConfirmer")
            )
        }
      }
    });


    //Form validation
    $("#form1").submit(function (event) {
      //If inputs are incorrect
      validateInput($inputName, 4, 32);
      validateInput($textAreaName, 4, 140);
      validateInput($passName, 6, 16);
      validateInput($passConfirmName, 6, 16);

      //If passwords dont match
      if ( ( ($passConfirmName.val() != $passName.val() ) && ($passConfirmName.hasClass("highlightedText")==0) ) )  {
        $passConfirmName.addClass("highlightedText");
        $passConfirmName.after("<div class='alert alert-danger'> <strong>Sorry</strong> Passwords must match. </div>");
      }
      //if passwords match => remove warnings if up
      else if (($passConfirmName.val() === $passName.val())&& $passConfirmName.hasClass("highlightedText")==0 ) {
        $passConfirmName.removeClass("highlightedText");
        $(".alert").remove();
      }

      event.preventDefault();
    });

    var $form2 = $("#form2");
    var $firstLi = $("#form2").find("li").first();
    var $allLi = $("#form2").find("li:not(:first-child)");
    var $firstInList = $("");
    $allLi.hide();
    $allLi.addClass("hidden-list");
    $firstLi.addClass("shown-top")

    $form2.on("click",".hidden-list", function(event) {
        $(event.target).removeClass("hidden-list");
        $(event.target).addClass("shown-top");
        $(".hidden-list").slideUp('slow');
    })

    $form2.on("click",".shown-top", function(event){
      $firstLi.remove();
      $(event.target).addClass("hidden-list");
      $(event.target).removeClass("shown-top");
      $(".hidden-list").slideDown('slow');
    })
    $allLi.hover(
  function() {
    $( this ).css( "background-color", "#EE9955" );
  }, function() {
    $( this ).css("background-color", "white");
  }
);



  //-----------Problem 2 'The dropdown'--------------------
  function moveHandler(event) {

    $("#imageToTag").on("mousemove", function (event) {


      var drawnBoxCss = {
        "position": "absolute",
        "left": event.pageX-70 + "px",
        "top": event.pageY-70 + "px",
        "background-color": "transparent",
        "border": "4px solid red",
        "height": "140px",
        "width": "140px",
        "padding-top": "144px"
      }
      $("#dropdownImage > li").hide();
      $("#dropdownImage").css(drawnBoxCss);

    });


    $("#dropdownImage").on("mouseup",function(event){
      event.stopPropagation();

      $("#imageToTag").off("mousemove");
      var tempLoc = {
        "background-color": "white"
      }

      $allLiDropdown = $("#dropdownImage").find("li");
      $allLiDropdown.css(tempLoc);
      $allLiDropdown.show();

      $onlyImage = $("#imageToTag").not($allLiDropdown);

      $onlyImage.on("mouseup",function(event){
        event.stopPropagation();
        moveHandler(this);
      })

      $allLiDropdown.hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "white");
        })

      $allLiDropdown.on("mousedown", function(event){
        event.stopPropagation();
        $allLiDropdown.hide();
        $(event.target).show();
        $("#dropdownImage").clone(false).removeAttr("id").appendTo("body");
        moveHandler(this);
    })
    });

  }
  $("#imageToTag").before("<p class=stopTagging>X - to stop Tagging<p>");
  $(".stopTagging").css(
    "margin-left", "90%"
    )

    function ToStopTagging () {
  $(".stopTagging").on("mousedown", function(event){
    event.stopPropagation();
    return false;
  })
}

  var x = true;
  while (x){
    x = ToStopTagging();
    moveHandler(this);
  }


});

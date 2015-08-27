"use strict";

$(document).ready(function () {

  $("#input-field-counter").keyup(function (event) {
    if ($(event.target).val().length > 0 && $(event.target).val().length <= 32) {
      $("#char-logger").html("Remaining chars: " + (32 - $(event.target).val().length));
    } else if ($(event.target).val().length > 32) {
      $(event.target).val($(event.target).val().substr(0, 32));
    } else {
      $("#char-logger").html("");
    }
  });

  $("textarea").keyup(function (event) {
    if ($(event.target).val().length > 0 && $(event.target).val().length <= 140) {
      $("#textarea-logger").html("Remaining chars: " + (140 - $(event.target).val().length));
    } else if ($(event.target).val().length > 140) {
      $(event.target).val($(event.target).val().substr(0, 140));
    } else {
      $("#textarea-logger").html("");
    }
  });

  $("#password").keyup(function (event) {
    if ($(event.target).val().length > 0 && $(event.target).val().length <= 16) {
      $("#password-logger").html("Remaining chars: " + (16 - $(event.target).val().length));
    } else if ($(event.target).val().length > 16) {
      $(event.target).val($(event.target).val().substr(0, 16));
    } else {
      $("#password-logger").html("");
    }
  });

  $("#password-confirmation").keyup(function (event) {
    if ($(event.target).val().length > 0 && $(event.target).val().length <= 16) {
      $("#password-confirmation-logger").html("Remaining chars: " + (16 - $(event.target).val().length));
      if ($("#password").val() === $("#password-confirmation").val()) {
        $("#password-confirmation-feedback").html("Your passwords match!");
        $("#password-confirmation-feedback").removeClass("text-danger").addClass("text-success");
      } else {
        $("#password-confirmation-feedback").html("The password confirmation doesn't match the password");
        $("#password-confirmation-feedback").removeClass("text-success").addClass("text-danger");
      }
    } else if ($(event.target).val().length > 16) {
      $(event.target).val($(event.target).val().substr(0, 16));
    } else {
      $("#password-confirmation-feedback").html("");
      $("#password-confirmation-logger").html("");
    }
  });

  $("button").click(function(event) {
    passTextFieldValidation();


    passTextAreaValidation();


    passPasswordValidation();


    passPasswordConfirmationValidation();


    passwordsMatching();

    event.preventDefault();
  });


  function passTextFieldValidation(){

    if( $("#input-field-counter input").val().length < 4 || $("#input-field-counter input").val().length > 32 ){
      $("#char-logger").addClass("alert-danger alert");
      $("#char-logger").html("input needs to be between 4 and 32 characters");
      return false;
    }
    else{
      $("#char-logger").removeClass("alert-danger alert");
      $("#char-logger").html("");
      return true;
    }
  }

  function passTextAreaValidation(){
    if( $("textarea").val().length < 4 || $("textarea").val().length > 140 ){
      $("#textarea-logger").addClass("alert-danger alert");
      $("#textarea-logger").html("input needs to be between 4 and 140 characters");
      return false;
    }
    else{
      $("#textarea-logger").removeClass("alert-danger alert");
      $("#textarea-logger").html("");
      return true;
    }

  }

  function passPasswordValidation() {
    if( $("#password").val().length < 6 || $("#password").val().length > 16 ){
      $("#password-logger").addClass("alert-danger alert");
      $("#password-logger").html("input needs to be between 6 and 16 characters");
      return false;
    }
    else{
      $("#password-logger").removeClass("alert-danger alert");
      $("#password-logger").html("");
      return true;
    }
  }

  function passPasswordConfirmationValidation() {
    if( $("#password-confirmation").val().length < 6 || $("#password-confirmation").val().length > 16 ){
     $("#password-confirmation-logger").addClass("alert-danger alert");
      $("#password-confirmation-logger").html("input needs to be between 6 and 16 characters");
      return false;
    }
    else{
      $("#password-confirmation-logger").removeClass("alert-danger alert");
      $("#password-confirmation-logger").html("");
      return true;
    }
  }

  function passwordsMatching(){
    if ( $('#password').val() != $("#password-confirmation").val() ){
      $("#password-confirmation-feedback").addClass("alert-danger alert");
      $("#password-confirmation-feedback").html("passwords dont match");
      return false;
    }
    else{
      $("#password-confirmation-feedback").removeClass("alert-danger alert");
      $("#password-confirmation-feedback").html("");
      return true;
    }
  }

  $("#accordian h3").click(function() {
    if ($("#accordian ul").is(":visible")) {
      $("#accordian ul").slideUp();
    } else{
      $("#accordian ul").slideDown();
    }
  });

  $("#accordian h3").mouseenter(function(){
    $(event.target).css("cursor", "pointer");
  });

  $("#accordian ul li").mouseenter(function (event) {
    $(event.target).addClass("bg-info");
    $(event.target).css("cursor", "pointer");
  });

  $("#accordian ul li").mouseout(function (event) {
    $(event.target).removeClass("bg-info");
    // $(event.target).css("cursor", "default");
  });

  $("#accordian ul li").click(function (event) {
    $(event.target).parent().prev().text($(event.target).text());
    $("#accordian ul").slideUp();
  });

  var $photo = $('.image-wrapper');
  var $tagBox = $('.tag-box');
  var $img = $("img");
  var $dropdown = $(".people-names");
  var $close = $('.remove-tag');

  $photo.mousemove(function (event){
    // console.log("on imge!");
    if (insideImage()) {
      $tagBox.css({
        'visibility': 'visible',
        'top': event.pageY - 16,
        'left': event.pageX - 16
      });
    } else {
      $tagBox.css("visibility", "hidden");
    };

  });

  var insideImage = function() {
    if (event.pageY > $img.offset().top &&
        event.pageY < ($img.offset().top + $img.height()) &&
        event.pageX > $img.offset().left &&
        event.pageX < ($img.offset().left + $img.width()) ) {
      return true;
    } else{
      return false;
    };
  }

  $photo.click(function (event){
    if (insideImage()) {
      if( $(".people-names h5").last().text() === "Select Name" && $(".people-names").length > 1 ) {
        $(".people-names h5").last().parent().detach();
        $(".tag-box").last().detach();
      }
      else{
        $tagBox.clone().css("border-color", "green").appendTo("body");
        //append close tag here?
        var $newClose = $close.clone();
        $newClose.css({
          'top': event.pageY - 25,
          'left': event.pageX,
          'display': 'block'
        });

        $newClose.appendTo("body");

        var $newDropdown = $dropdown.clone();
        $newDropdown.css({
          'top': event.pageY + 13,
          'left': event.pageX -16
        });
        $newDropdown.appendTo("body").slideDown();
      }
    }
    else {
      // $tagBox.css("visibility", "hidden");
    };
  })

  $("body").on("click", ".people-names h5", function (event){
    if ($(event.target).next().is(":visible")) {
      $(event.target).next().slideUp();
    } else{
      $(event.target).next().slideDown();
    }
  });

  $("body").on("mouseenter", ".people-names", function (event){
    $tagBox.css("visibility", "hidden");
    $(event.target).css("cursor", "pointer");
  });

  $("body").on("mouseenter", ".people-names ul li", function (event){
    $(event.target).addClass("bg-info");
  });

  $("body").on("mouseout", ".people-names ul li", function (event){
    $(event.target).removeClass("bg-info");
  });

  $("body").on("click", ".people-names ul li", function (event){
    $(event.target).parent().prev().text($(event.target).text());
    $(".people-names ul").slideUp();
  });

  $("body").on("click", ".remove-tag", function (event){
    $(event.target).prev().remove();
    $(event.target).next().remove();
    $(event.target).remove();
  });

  $("body").on("mouseenter", ".remove-tag",function() {
    $tagBox.css("visibility", "hidden");
  });

  $("body").on("mouseenter", ".tag-box:not(:first)", function(event) {
    $(event.target).css("visibility", "visible");
    $tagBox.css("visibility", "hidden");
    $(event.target).next().next().css("visibility", "visible");
    
  });

  $("body").on("mouseleave", ".tag-box:not(:first)", function(event) {
    $(event.target).css("visibility", "hidden");
    $(event.target).next().css("visibility", "hidden");
    // $(event.target).next().next().css("visibility", "hidden");


  });



});












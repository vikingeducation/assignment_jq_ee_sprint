"use strict";

// function createSpan(charsTyped, maxChars){
//   var $span = $("<span></span>");
//   var charsLeft = maxChars - charsTyped;
//   var message = charsLeft.toString() + " characters left";
//   $span.append(message);
//   return $span;
// }

// function giveId(node, selector) {
//   return node.attr('id', selector);
// }

// function hasSpan(selector) {
//   return $(selector);
// }
//
// function removeSpan(node, selector) {
//   return node.remove(selector);
// }

function getCharsLeft(value, max) {
  return max - value;
}

function changeSpanValue(span,value) {
  var message = value.toString() + " characters left";
  return span.html(message);
}

function getPasswordContent() {
  return $('#password').val();
}

function compare(value, passwordContent) {
  return value === passwordContent;
}

function isEmpty() {
  Array.prototype.forEach.call(arguments, function(value) {
    if (value === '') {
      return true;
    }
  });
}

function isTooShort(node){
  //debugger;
  return node.val().length < parseInt(node.attr("minLength"));
}

function isTooLong(node){
  return node.val().length > parseInt(node.maxLength);
}

function validateLength(node){
  var spanName = "#error-" + node.attr("id");
  var $span = $(spanName);
  //console.log($span);
  if (isTooShort(node)){
    $span.html("Must be at least " + node.attr("minLength") + " characters!");
    node.addClass("error");
  }
  else if (isTooLong(node)){
    $span.html("Must be shorter than " + node.maxLength.toString() + " characters!");
    node.addClass("error");
  }
  else{
    $span.hide();
  }
}

function showChildItems(node) {
  node.children('.dropdown-item').slideDown(1000).removeClass('hidden');
}

function hideChildItems(node) {
  node.children('.dropdown-item').slideUp(1000).addClass('hidden');
}

function validatePassword(){
  var $span = $('#counter-password-confirmation');
  if(compare($('#password-confirmation'),$('#password'))){
    $span.hide();
  }
  else{
     var message = "Password doesn't match!";
     changeSpanValue($span, message);
     $span.show();
     $('#password-confirmation').addClass("error");
  }
}

$(document).ready(function(e) {
  $("form").on("input", "input, textarea", function(e) {
     var charsLeft = getCharsLeft(e.target.value.length, parseInt(e.target.maxLength));
     var spanName = "#counter-"+ e.target.id;
     var $span = $(spanName);
     changeSpanValue($span, charsLeft);
      if(e.target.value.length === 0){
        $span.hide();
      }
  });

  $("form").on("input", "#password-confirmation", function(e) {
    var passwordContent = getPasswordContent();
    var message;
    var $span = $('#matching-pw-confirm');
    if (compare(e.target.value, passwordContent) || e.target.value.length === 0) {
      $span.hide();
    } else {
      message = "Password doesn't match!";
      changeSpanValue($span, message);
      $span.show();
    }
  });

  $("#submit-button").on("click", function(e){
    //e.preventDefault();
    validateLength($("#text-field"));
    validateLength($("#text-area"));
    validateLength($("#password"));
    validatePassword();
  });

  // Handlers for menu items.
  $("#dropdown-menu").on("click", function(e) {
    if ($(this).hasClass('closed')) {
      showChildItems($(this));
      $(this).removeClass('closed');
    } else {
      hideChildItems($(this));
      $(this).addClass('closed');
    }
  });

  // Clicking this triggers the menu <ul>.
  $("#dropdown-bar").on("click", function(e) {
    $("#dropdown-menu").trigger("click");
  });

  $(".dropdown-item").hover(function(e){
    $(e.target).toggleClass("hovered");
  })

  $(".dropdown-item").on("click", function(e){
    $('.dropdown-bar').html(e.target.innerHTML);
    $("#dropdown-bar").trigger("click");
  })

});

function countCounter(element, max) {
  return max - element.val().length;
}
function showCounter(element, counterN) {
  $(".counter-" + element).removeClass("hidden");
  $(".number-" + element).text(counterN);
}
function hideCounter(element) {
  $(".counter-" + element).addClass("hidden");
}
function hideOffend() {
  $("form").children().removeClass("offend");
  $(".offend-text").addClass("hidden");
}
function checkCounter(element, counter, max) {
  if (counter < max) {
    showCounter(element, counter);
  } else {
    hideCounter(element);
  }
}
function offend(element, min, max) {
  var $offendSpan;
  if (element.val().length < min) {
    $offendSpan = $("<span class='offend-text'>It's too short! </span>");
  } else if (element.val().length > max) {
    $offendSpan = $("<span class='offend-text'>It's too long! </span>");
  }
  if ($offendSpan) {
    element.addClass("offend").after($offendSpan);
  }
}

$(document).ready( function(){
  
  $("#input").keyup(function(){
    hideOffend();
    var counterN = countCounter($("#input"), 32);
    checkCounter("input", counterN, 32);
  });

  $("textarea").keyup(function(){
    hideOffend();
    var counterN = countCounter($("textarea"), 140);
    checkCounter("area", counterN, 140);
  });

  $("#password").keyup(function(){
    hideOffend();
    var counterN = countCounter($("#password"), 16);
    checkCounter("password", counterN, 16);
  });

  $("#password-conf").keyup(function(){
    hideOffend();
    var counterN = countCounter($("#password-conf"), 16);
    if (counterN < 16) {
      showCounter("password-conf", counterN);
      $(".approve-password-conf").removeClass("hidden");
      if ($("#password-conf").val() === $("#password").val()) {
        $(".approve-password-conf").text("Password match");
      }
    } else {
      hideCounter("password-conf");
      $(".approve-password-conf").addClass("hidden");
    }
  });

  $("form").submit(function(event) {
    var $offendSpan;
    offend($("#text-field"), 4, 32);
    offend($("textarea"), 4, 140);
    offend($("#password"), 6, 16);
    offend($("#password-conf"), 6, 16);
    
    if ($("#password-conf").val() !== $("#password").val()) {
      $offendSpan = $("<span class='offend-text'>Your passwords must match! </span>");
      $("#password-conf").addClass("offend");
        $(".approve-password-conf").after($offendSpan);
      }
    event.preventDefault();
  });

  $(".dropbtn").on("click", function(){
    $(".dropdown-content").slideDown(200);
  });
  $(".dropdown-content div").on("click", function(){
    $(".dropdown-content").slideUp(200);
    $(".dropbtn").text($(this).text());
  });
});
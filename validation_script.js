$(document).ready(function() {

  $("#text-field, #text-area, #password, #c-password").on("input", function() {
    var $this = $(this);
    var max = $this.attr("maxlength");
    var remaining = max - $this.val().length;
    var $counter = getSpan($this);
    $counter.removeClass("hidden")
            .text(remaining + " characters remaining.");
    if (remaining == max) {
      $counter.addClass("hidden");
    };
    checkPasswordMatch();
  });

  $("#submit").on("click", function(event) {
    event.preventDefault();
    validation();
  });
});

function getSpan($this) {
  var $span = $this.parent()
                .next()
                .find("span");
  return $span;
};

function checkPasswordMatch() {
  var pass = $("#password").val();
  var cPass = $("#c-password").val();

  if (pass.length > 0 || cPass.length > 0) {
    $(".c-pass-match").removeClass("hidden");
  } else {
    $(".c-pass-match").addClass("hidden");
  }

  if (pass !== cPass) {
    $(".c-pass-match").text("Your passwords do not match");
  } else {
    $(".c-pass-match").text("Your passwords match");
  };
};

function validation() {
  var inputs = [$("#text-field"),
                $("#text-area"),
                $("#password"),
                $("#c-password")];

  $.each(inputs, function(index, element) {
    var $element = $(element);
    var inputLength = $element.val().length;
    var maxLength = $element.attr("maxlength");
    var minLength;

    if (($element.prop("tagName") == "TEXTAREA") || $element.attr("type") == "text") {
      minLength = 4;
    } else {
      minLength = 6;
    };

    if (inputLength < minLength || inputLength > maxLength) {
      $element.addClass("field-error");
      var $span = getSpan($element);
      $span.removeClass("hidden")
        .addClass("error-message")
        .text("Please input between " + minLength + " and " + maxLength + " characters.");
    };
  });

  if ($(".c-pass-match").text() == "Your passwords do not match") {
    $("#c-password").addClass("field-error");
    $(".c-pass-match").removeClass("hidden")
      .addClass("error-message")
      .text("Your passwords must match.");
  };
};

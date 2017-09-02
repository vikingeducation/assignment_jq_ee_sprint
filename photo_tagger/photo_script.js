"use strict";
var names = ["Peter", "Paul", "John", "Thomas"];

$(document).ready(function() {

  var newOutline = function() {
    return $("<div>").attr({"id": "active",
                  class:"outline outline-moving"});
  };

  $("#image-container").hover(function() {
    $(this).append(newOutline());
  }, function() {
    $("#active").remove();
  });

  $("#image-container").on("mousemove", function(event) {
    $("#active").offset({
        left: (event.pageX - 75),
        top: (event.pageY - 75)});
  });

  $("#image-container").on("click", function() {
    $("#active").attr({"id": "choosing",
                      "class": "outline outline-fixed"})
                .append(function() {
      return $("<div>").addClass("dropdown-names hidden")
          .append(dropdownNames());
    });
    $(".dropdown-names").slideDown(200);
  });

  var dropdownNames = function() {
    return $("<ul>").append(function() {
      var liElements = "";
      $.each(names, function(index, element) {
        liElements += "<li>" + element + "</li>";
      });
      return liElements;
    });
  };

  $("#image-container").on("mouseleave", "#choosing", function() {
    $("#choosing").remove();
  });

  $("#image-container").on({
    mouseenter: function(event) {
      $(event.target).addClass("option-active");
    },
    mouseleave: function(event) {
      $(event.target).removeClass("option-active");
    },
    click: function(event) {
      event.stopPropagation();

      $("#choosing").attr({"id": ""});

      if ($(event.target).hasClass("remove-tag")) {
        $(event.target).parent().parent().parent().remove();
      } else {
        $(event.target).parent().children().not(event.target).remove();
        var $removeTag = $("<li>Remove Tag</li>")
                        .addClass("remove-tag");
        $(event.target).parent().append($removeTag);
        $("#image-container").append(newOutline());
      }
    }
  }, "li");

});

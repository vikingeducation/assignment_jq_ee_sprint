( function ($ ) {
  "use strict";

  $(document).ready(function() {

  //1. Change header
    var changeHeader = function() {
      var $header = $("h1");
      $header.text("jQuerulous");
    };

    changeHeader();

  //2. Create and insert an ordered list
    var insertList = function() {
      var $container = $(".info-box");

      $container.append();

    };

    insertList();

  //3. Change sad classes to happy
    var sadToHappy = function() {
      var $sadClassed = $(".sad");
      $sadClassed.toggleClass("sad");
      $sadClassed.toggleClass("happy");
    };

    sadToHappy();

  //4. Change popup link

    var linkChange = function() {
      var $popupLink = $("#annoying-popup a");

      $popupLink.attr("href", "http://www.cashcats.biz");
    };

    linkChange();

  //5. Reposition popup

    var movePopup = function() {
      var $popup = $("#annoying-popup");

      $popup.css("left", "75%")
      .css("top", "+=30");
    };

    movePopup();

  //6. Replace list item by traversing from another element

    var replaceEllipsis = function () {
      var $listItemsParent = $("ul");

      $listItemsParent.children()
        .each(function( index, element ) {
          if ( element.textContent === "...") {
            $( element ).replaceWith("<li>Additional addendums</li>");
          }
        });
     };

     replaceEllipsis();

    //7. Replace form input with textarea

    var replaceForm = function() {
      var $inputForm = $("form input:first-child");

      $inputForm.replaceWith("<textarea placeholder=\"Tell me a story!\"></textarea>");
    };

    replaceForm();

    // Form countdown

    var $inputs = $(".input-box");

    $inputs.on("keyup", function(event){
      var $inputBox = $(event.target);
      var $target = $inputBox.next();
      var currentCount = $inputBox.val().length;
      var remainingCharacters = 32 - currentCount;

      if (remainingCharacters < 0) {
        remainingCharacters = 0;
      }

      $target.html(remainingCharacters + " characters remaining");

      if (currentCount === 0) {
        $target.hide();
      }
      else {
        $target.show();
      }
    });

// password countdown
      var $passConfirm = $("#pass-confirm");


      $passConfirm.on("keyup", function(event){
        var $passOrig = $("#pass-orig");
        var $matchMessage = $("#pass-match");

        if ($passConfirm.val() === $passOrig.val()) {
          $matchMessage.hide();
        }
        else {
          $matchMessage.show();
        }

      });

  });
} ( jQuery ) );

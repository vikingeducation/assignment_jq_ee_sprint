"use strict";
$( document ).ready(function() {

  // var $textFieldInput = $('input:text');
  var $textFieldLimit = 32;
  // var $textAreaInput = $('textarea');
  var $textAreaLimit = 140;

  var textCounterDowner = function(inputField, fieldLimit, outputId){
    $('fieldset').on('keyup', inputField, function(){
      var $inputCharCount = $(this).val().length;
      var $remainingChars = fieldLimit - $inputCharCount;

      if($inputCharCount <= fieldLimit ){
        $( outputId ).text($remainingChars + ' remaining');
      }else{
        $( outputId ).text("exceeded");
      };
    });
  };

  textCounterDowner('input:text', $textFieldLimit, '#text-field-counter');
  textCounterDowner('textarea', $textAreaLimit, '#text-area-counter');


  // $.each($textFieldInput, function(index, element) {
  //   console.log(element);
  // });





});
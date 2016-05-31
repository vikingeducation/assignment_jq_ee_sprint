"use strict;"

var PHOTO = {};

PHOTO.PhotoModule = (function(){

  function init(){

  }

  return {
    init: init
  }
})();

$(document).ready(function(){
  PHOTO.PhotoModule.init();
});
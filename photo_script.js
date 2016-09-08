var photoMethods = {

  targetOutline: function() {
    $('body').append($('<div/>').addClass('tagger'));
    $('img, .tagger').mousemove(function(event) {
      var div = '<div class="tagger"></div>';
      var leftCoord = event.pageX - 25 + "px";
      var topCoord = event.pageY - 25 + "px";
      $('.tagger')
        .css('top', topCoord)
        .css('left', leftCoord);
    });
    // $('img').mouseleave(function() {
    //   $('.tagger').hide();
    // });
  },

  fixTarget: function() {
    var friendList = "<ul> </ul>";
    $('.tagger').click(function(event) {
      var leftCoord = event.pageX - 25 + "px";
      var topCoord = event.pageY - 25 + "px";
      $('body').append(
        $('<div/>')
        .addClass('fixed-tags')
        .css('top', topCoord)
        .css('left', leftCoord)
        );
    });
  }


};

$(document).ready(function() {
  photoMethods.targetOutline();
  photoMethods.fixTarget();
});



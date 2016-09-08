var photoMethods = {

  mousemoveEvent: function(event) {
    var div = '<div class="tagger"></div>';
    var leftCoord = event.pageX - 50 + "px";
    var topCoord = event.pageY - 25 + "px";
    $('.tagger')
      .css('top', topCoord)
      .css('left', leftCoord);
  },

  targetOutline: function() {
    $('body').append($('<div/>').addClass('tagger'));

    $('img').on('mousemove', photoMethods.mousemoveEvent);

    $('img').hover(function() {
      $('.tagger').toggle();
    });
  },

  friends: ["John", "Tom", "Sarah"],

  fixTargetEvent: function(event) {
    var friendList = $("<ul class='friends'></ul>");
    for (var i = 0; i< photoMethods.friends.length; i++) {
      var listItem = $("<li/>").text(photoMethods.friends[i]);
      friendList.append(listItem);
    }

    $('.tagger').hide();

    $('img').off('mousemove', photoMethods.mousemoveEvent);

    var leftCoord = event.pageX - 50 + "px";
    var topCoord = event.pageY - 25 + "px";

    var container = $('<div/>')
                    .addClass('fixed-container')
                    .css('top', topCoord)
                    .css('left', leftCoord);

    $('body').append(container);


    container.append(
      $('<div/>')
      .addClass('fixed-tags')
      );

    container.append(friendList);

    $('img').off('click', photoMethods.fixTargetEvent);
  $('ul').click(function(e) {

    var list = $(e.currentTarget);
    list.parent().addClass('selected');

    var currentEle = $(e.target);
    currentEle.addClass("selected");

    $('ul').children().filter(function(_, ele) {
      ele = $(ele);
      return !ele.hasClass('selected');
    }).hide();
    $('.tagger').hide();
    $('img').on('click', photoMethods.fixTargetEvent);
  });

    $('img').on('mousemove', photoMethods.mousemoveEvent);
    $('img').on('click', photoMethods.photoStuff);

  },

  photoStuff: function() {
    if (!$('.fixed-container').last().hasClass('selected')) {
      $('.tagger').show();
      $('.fixed-container').last().remove();
    }
    $('img').on('click', photoMethods.fixTargetEvent);
    $('img').off('click', photoMethods.photoStuff);
  },

  fixTarget: function() {
    $('img').on('click', photoMethods.fixTargetEvent);
  }
};

$(document).ready(function() {
  photoMethods.targetOutline();
  photoMethods.fixTarget();
});

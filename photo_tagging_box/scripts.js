/*jshint esversion: 6 */

let photoMethods = {

  followMouse: function(event) {
    let left = event.pageX - 50;
    let top = event.pageY - 25;
    $('.tagger')
      .css('top', top)
      .css('left', left);
  },

  targetOutline: function() {
    //add div with tagger class
    $('body').append($('<div/>').addClass('tagger'));

    //follow cursor and only show over the image
    $('img').on('mousemove', photoMethods.followMouse);
    $('img').hover(function() {
      $('.tagger').toggle();
    });

    //delete any fixed tags
    photoMethods.removeTarget();
  },

  friends: ['Angela', 'Michael', 'Pam', 'Jim', 'Dwight'],

  //create list of people available to tag
  findFriends: function() {
    let friendList = $('<ul></ul>');
    for (let i = 0; i < photoMethods.friends.length; i++) {
    let listItem = $('<li/>').text(photoMethods.friends[i]);
    friendList.append(listItem);
  }
  return friendList;
},

  //if user clicks on name, the friend is tagged and dropdown disappears
   choseFriend: function() {
     $('ul').click(function(e) {
       let list = $(e.currentTarget);
       list.parent().addClass('selectedCont');

       let currentEle = $(e.target);
       currentEle.addClass('selected');

       $('ul')
         .children()
         .filter(function(_, ele) {
           ele = $(ele);
           return !ele.hasClass('selected');
         })
         .hide();
     });
   },

//create fixed tagbox and friendslist dropdown
  tagSelector: function(event) {

  $('img').off('click', photoMethods.tagSelector);

    let friendList = photoMethods.findFriends();

    let left = event.pageX - 50 + 'px';
    let top = event.pageY - 25 + 'px';

    let container = $('<div/>')
      .addClass('fixed-container')
      .css('top', top)
      .css('left', left);

    $('body').append(container);

    container.append(
      $('<div/>')
        .addClass('delete')
        .text('x')
    );
    container.append($('<div/>').addClass('fixed-tags'));
    container.append(friendList);

    //call choseFriend function in case a friend is tagged
    photoMethods.choseFriend();

    $('img').on('mousemove', photoMethods.followMouse);
    $('img').on('click', photoMethods.cleanUp);
  },

//if no friend was selected, remove the dropdown
  cleanUp: function() {
    if (
      !$('.fixed-container')
        .last()
        .hasClass('selectedCont')
    ) {
      $('.fixed-container')
        .last()
        .remove();
    }
    $('img').on('click', photoMethods.tagSelector);
    $('img').off('click', photoMethods.cleanUp);
  },

  //when the user clicks on the image, the fixed tagbox with dropdown appears
  tagDropdown: function() {
    $('img').on('click', photoMethods.tagSelector);
  },

  //removes target when it's child with class 'delete'is clicked
  removeTarget: function() {
    $('body').on('click', '.delete', function(event) {
      $(this)
        .parent('.fixed-container')
        .hide();
    });
  }
};

$(document).ready(function() {
  photoMethods.targetOutline();
  photoMethods.tagDropdown();
});

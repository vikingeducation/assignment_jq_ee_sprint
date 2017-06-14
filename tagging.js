// sets up div to follow cursor on mousemove

const setTag = function(jqObj){
  $('.photo').on('mousemove', function(e){
    jqObj.css({
      left: e.pageX,
      top: e.pageY,
    });
    jqObj.on('mousemove', function(e){
      $(this).css({
        left:e.pageX-50,
        top:e.pageY-50,
      })
    });
  });
  jqObj.click(function(e){
    freezeTag(e);
    pickTag();
  })
}

const freezeTag = function(e){
  $('.photo').off('mousemove', "");
  $('.cursor').off('mousemove', "");
  $('.cursor').off('click', "")
  showTagList(e, e.target)
}

const cleanUp = function(element){

}

const hide = function(target){
  target.addClass('hidden')
}

const showTagList = function(e, target){
  console.log(e)
  var $newList = $('.friend-list').clone();

  $newList.appendTo('.photo').css({
      'left': e.pageX-50,
      'top': e.pageY+60,
  });
  $newList.on('click', 'li', function(){
    console.log($(this))
    console.log($('.friend-list li').not($(this)))
    $('.friend-list li').not($(this)).remove();
    var newDiv = $('.friend-list').clone();
    console.log(newDiv)
    setTag(newDiv);
  });
}

const pickTag = function(){
    var toBeDeleted = $('.cursor li').not($(this)).remove()
    console.log(toBeDeleted)
    $(toBeDeleted).remove()
}



$(document).ready(function(){
  //
  // var $cursor = $('.cursor');
  //
  // $('.photo').on('mousemove', function(e){
  //   $('.cursor').css({
  //     left: e.pageX,
  //     top: e.pageY,
  //   });
  // });
  // $cursor.click(function(e){
  //   var div = `<div class="clicked" style="left:${e.pageX}px; top:${e.pageY}px"></div>`
  //   $('.photo').append(`<div class='click-container'>${div}</div>`)
  //     // left: e.pageX,
  //     // top: e.pageY
  //     $('.cursor').toggleClass('hidden');
  //     var friendList = $('<div class="friend-list"><ul><li>Greg</li><li>Della</li></ul></div>')
  //
  //     $('.friend-ist').clone().appendTo('.click-container')
  //     $('.friend-list').css({
  //       left: e.pageX,
  //       top: e.pageY+90,
  //     })
  //   });
  //
  //
  // $('.clicked').click(function(){
  //   var div = 'div class="dropdown"'
  // })
  // $('body').on('click', 'li', function(){
  //   console.log($(this))
  //   $(this).next().remove();
  //   $('.cursor').toggleClass('hidden')
  // })

  setTag($('.cursor'));
  $('.cursor').click(function(e){
    freezeTag(e)
  })
})

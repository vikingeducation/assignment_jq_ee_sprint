function init() {

  var counter = 0;

  var initTag = function(){
    setCursor();
    $('.cursor').click(function(e){
      cancelHandler('body','mousemove');
      cancelHandler('.cursor', 'click');
      freezeTag(e);
      setCancel()
    })
  }

  var setCancel = function(e){
    $('.photo').click(function(){
      initTag()
      cleanUp(counter)
    });
  }

  var setCursor = function(){
    var cursor = createDiv();
    $(cursor).addClass(`${counter}`).addClass('cursor')
    $(cursor).appendTo('.click-container')
    // $('.photo').append($(cursor))
    // $('.photo').on('mousemove', function(e){
    //   $(`div.${counter}`).css({
    //     left:e.pageX,
    //     top:e.pageY
    //   })
    // });
    $(`div.${counter}`).on('mousemove', function(e){
      $(this).css({
        left:e.pageX-50,
        top:e.pageY-50,
      })
    });
  }

  var createDiv = function(){
    counter = counter + 1
    return `div`
  }

  var createList = function(){
    var friendList = `<ul><li>Della</li><li>Greg</li></ul>`
    return `<div class="friend-list ${counter}">${friendList}</div>`
  }

  var cancelHandler = function(el, handler){
    $(el).off(handler)
  }

  var freezeTag = function(e){
    showTagList(e, e.target)
  }

  var cleanUp = function(count){
    $(`.${counter}`).remove();
  }

  var showTagList = function(e, target){
    console.log(e)
    var newList = createList()
    $(newList).appendTo('.photo').css({
        'left': e.pageX-50,
        'top': e.pageY+60,
    });
    $(newList).on('click', 'li', function(){
      $(`${counter} li`).not($(this)).remove();
    });
    cancelHandler('.photo', 'click');
    initTag();
  }
//
// setTag($('.cursor'));
// $('.cursor').click(function(e){
//   freezeTag(e)
// })

  initTag();
}

$(document).ready(function(){

  init();

})

$( document ).ready(function() {

  createBox();

  $( "img" ).click(function() {
    var $latestBox = $(".container").children(".box").last();
    prepareBoxForMouse($latestBox);
  });

  // find position of picture
  var divOffset = {
    top: $( "img" ).offset().top,
    left: $( "img" ).offset().left,
    right: $( "img" ).offset().left + $( "img" ).width(),
    bottom: $( "img" ).offset().top + $( "img" ).height(),
    isOver: false
  }

  // red square will not show outside of picture
  $(window).mousemove(function (event){
    var $latestBox = $(".container").children(".box").last();
    if (!(event.pageX >= divOffset.left && event.pageX <= divOffset.right && event.pageY >= divOffset.top && event.pageY <= divOffset.bottom)) {
      $latestBox.addClass("invisible");
    }
  });

  var $latestBox = $(".container").children(".box").last();
  prepareBoxForMouse($latestBox);
  prepareNameList();
  chooseName();
});

var currentMousePos = { x: -1, y: -1 };

$(document).mousemove(function(event) {
  currentMousePos.x = event.pageX;
  currentMousePos.y = event.pageY;
});

function chooseName() {
  $( "li" ).click(function(e) {
    var name = $(this).text();
    var $latestBox = $(".container").children(".box").last();

    $latestBox.children('.name-display')
      .removeClass('invisible')
      .text(name);

    $latestBox.children('.name-list').hide();

    createBox();
    $latestBox = $(".container").children(".box").last();
    prepareNameList();
    chooseName();

    $( "img" ).hover(function() {
      var $latestBox = $(".container").children(".box").last();
      prepareBoxForMouse($latestBox);
    });
  });
}

function prepareNameList() {
  var $latestBox = $(".container").children(".box").last();
  $latestBox.click(function() {
    $( "img" ).off("mousemove");
    $latestBox.off("mousemove");

    // show name list
    $(this).children('.name-list').removeClass('invisible');
  });
}

function prepareBoxForMouse(box) {
  $( "img" ).mousemove(function(e) {
    setBoxToMouse(box)
  });

  box.mousemove(function(e) {
    setBoxToMouse(box)
  });

  box.children('.name-list').addClass('invisible');
}

function setBoxToMouse(box) {
  box.removeClass("invisible")
  .css("position", "absolute")
  .offset({
    left: currentMousePos.x - 35,
    top: currentMousePos.y - 35
  });
}

function createBox() {
  var count = $( ".box" ).length;

  var $ul = $("<ul>" +
      "<li>Jack</li>" +
      "<li>Jill</li>" +
      "<li>Gail</li>" +
      "<li>Sarah</li>" +
      "<li>Aaron</li>" +
    "</ul>"
  );

  var $nameDisplay = $("<div></div>")
    .attr("class", "name-display invisible");

  var $nameList = $("<div></div>")
    .attr("class", "name-list invisible")
    .append($ul);

  var $div = $( "<div></div>" )
    .attr("id", "box" + count)
    .attr("class", "invisible box")
    .append($nameDisplay)
    .append($nameList);

  $( ".container" ).append($div);
}

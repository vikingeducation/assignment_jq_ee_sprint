$(document).ready(function(){



$("#imageHolder img").on('mousemove', function(e){
    $('#tail').css({
       left:  e.pageX - 207,
       top:   e.pageY - 50
    });
});

/*
$('#imageHolder').click(function(event){
    event.stopPropagation();
    alert(event.target.id);
})
*/

function handler(event) {
    event.stopPropagation();
    // now do your stuff
    console.log('dropdown clicked');
}

$('.unique').add('#dropdown').click(handler);

$("#imageHolder").on('click', function (e) {
  var left = e.pageX - 207
  var top = e.pageY - 50
  console.log(left);
  console.log(top);
  var identity = Math.floor(Math.random() * 1000000000).toString()
  var identityTwo = Math.floor(Math.random() * 1000000000).toString()
  console.log(identity);
  document.getElementById("imageHolder").insertAdjacentHTML("beforeend", "<div>"
    + "<div id="
    + identity
    + " class = 'notag'></div>"
    + "<div id="
    + identityTwo
    + " class = 'dropdown notag'></div>"
    + "</div>"
  )
  $('#' + identity).css({
     float: 'left',
     position: 'absolute',
     left:  $('#tail').position().left,
     top:   $('#tail').position().top,
     width: '100px',
     height: '100px',
     border: 'solid 3px red'
  });
  $('#' + identityTwo).css({
     float: 'left',
     position: 'absolute',
     left:  $('#tail').position().left,
     top:   $('#tail').position().top+100,
     width: '100px',
     height: 'auto',
  });
  $('#' + identityTwo).html('Add name')
  });
});

/*
$("#dropdown").click(function(event){
    console.log('dropdown clicked');
    event.stopPropagation()
});
*/

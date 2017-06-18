
tagBoxFollow = true;
tagBox = document.getElementById("theBox");
MoveThis = document.getElementById("MoveThis");
x = 0;
y = 0;

var TagHere =  function(){
tagBox = document.getElementById("theBox");
MoveThis = document.getElementById("MoveThis");
if (tagBoxFollow === true){tagBoxFollow = false;
tagBox.style.borderColor = "red";
MoveThis.style.left = x ;

MoveThis.style.top = y ;
}else{tagBoxFollow = true;
tagBox.style.borderColor = "green";
}


}

var ShowTagBox =  function(){
  tagBox = document.getElementById("theBox");
if(tagBoxFollow === true){
x = event.clientX  - 50 + "px";

     y = event.clientY - 50 + "px";

tagBox.style.opacity = 1 ;

var coor = "X coords: " + x + ", Y coords: " + y;

    tagBox.style.left = x  ;
    tagBox.style.top = y ;
  }
}
var DontShowTagBox =  function(){
  if (tagBoxFollow === true){
  }else{
    tagBox.style.opacity = 0;
  tagBox.style.borderColor = "green";
  }
tagBox.style.borderColor = "green";
tagBoxFollow = true;
}

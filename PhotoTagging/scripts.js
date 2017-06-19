
var tagBoxFollow = true;
var tagBox = document.getElementById("theBox");
var MoveThis = document.getElementById("MoveThis");
var x = 0;
var y = 0;
var currentTag;

var ReTagThis = function(oldTag){
  if(currentTag === oldTag){DontTagHere(); return; }
  if(currentTag != null && currentTag.innerHTML === "Who is This"){currentTag.remove(currentTag);}
  console.log(currentTag);
  currentTag = oldTag



MoveThis = document.getElementById("MoveThis");

tagBox = currentTag.style.left;
tagBox = currentTag.style.top;
MoveThis.style.left = currentTag.style.left;
MoveThis.style.top = currentTag.style.top;
tagBoxFollow = false;


}
var DontTagHere =  function(){
tagBox.style.borderColor = "green";
MoveThis.style.left = "-510px" ;
MoveThis.style.top = "-150px" ;
tagBoxFollow = true;
if(currentTag != null && currentTag.innerHTML === "Who is This"){currentTag.remove(currentTag); console.log("why arent I deleting"); }

}
var TagHere =  function(){
tagBox = document.getElementById("theBox");
MoveThis = document.getElementById("MoveThis");
insideboxx = document.getElementById("insideBoxx");



if (tagBoxFollow === true){tagBoxFollow = false;
  currentTag = document.createElement("p");
  currentTag.addEventListener("click",function(){ ReTagThis(this); });
  tagBox.appendChild(currentTag);
  currentTag.setAttribute("class", "insideBox");
  currentTag.innerHTML = "Who is This";
tagBox.style.borderColor = "red";
MoveThis.style.left = x ;

MoveThis.style.top = y ;
currentTag.style.top = y ;

currentTag.style.left = x ;
}
}
SelectFromDropDown =  function(objID){
  MoveThis = document.getElementById("MoveThis");
dropDown = document.getElementById("SelectedFromDropDown");

dropDown.innerHTML = objID.innerHTML;

if(currentTag != null){
if(dropDown.innerHTML === "Remove"){currentTag.remove(currentTag); DontTagHere(); return;}
  currentTag.innerHTML = objID.innerHTML;}

MoveThis.style.left = "-510px" ;
MoveThis.style.top = "-150px" ;
currentTag.style.backgroundColor = "green";
tagBoxFollow = true;
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

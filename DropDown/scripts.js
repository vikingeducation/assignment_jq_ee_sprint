
var SelectFromDropDown =  function(objID){
dropDown = document.getElementById("SelectedFromDropDown");
console.log(objID.innerHTML);
console.log(dropDown.innerHTML);
dropDown.innerHTML = objID.innerHTML;

}

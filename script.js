$(document).ready(function() {
        hackedDropBox.init();
});

var hackedDropBox = {
    "init" : function init() {
        this.ulListener();
    },
    "ulListener" : function ulListener() {
        $("ul").on("click", "li", function whichClicked(event) {
            console.log(event.target, " was clicked");
        });
    }
    
};
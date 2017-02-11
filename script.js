$(document).ready(function() {
        hackedDropBox.init();
});

var hackedDropBox = {
    "init" : function init() {
        this.ulListener(this.liClicked);
        this.ulListener(this.toggleDisplayedClass);
    },
    "ulListener" : function ulListener(fn) {
        $("ul").on("click", "li", fn);
    },
    "targetAllLiOnClick" : function targetAllLiOnClick(event) {
        return $(event.delegateTarget).children();
    },
    "liClicked" : function liClicked(event) {
        console.log(event.target, " was clicked");
    },
    "toggleDisplayedClass" : function toggleDisplayedClass(event) {
        $(event.delegateTarget).children().toggleClass("displayed");
    }
    
};
$(document).ready(function() {
        hackedDropBox.init();
});

var hackedDropBox = {
    "init" : function init() {
        this.ulListener(this.toggleSelectedClass);
        this.ulListener(this.toggleDisplayedClass);
    },
    "ulListener" : function ulListener(fn) {
        $("ul").on("click", "li", fn);
    },
    "targetAllLiOnClick" : function targetAllLiOnClick(event) {
        return $(event.delegateTarget).children();
    },
    "toggleSelectedClass" : function toggleSelectedClass(event) {
        $(event.target).toggleClass("selected");
    },
    "toggleDisplayedClass" : function toggleDisplayedClass(event) {
        $(event.delegateTarget).children().toggleClass("displayed");
    }
    
};
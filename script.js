$(document).ready(function() {
        hackedDropBox.init();
});

var hackedDropBox = {
    "init" : function init() {
        this.ulListener(this.toggleSelectedClass);
        this.ulListener(this.toggleDisplayedClass);
        this.positionLis();
    },
    "ulListener" : function ulListener(fn) {
        $("ul").on("click", "li[id!='default-value']", fn);
        $("ul").one("click", "li[id='default-value']", fn);
    },
    "targetAllLiOnClick" : function targetAllLiOnClick(event) {
        return $(event.delegateTarget).children();
    },
    "toggleSelectedClass" : function toggleSelectedClass(event) {
        $(event.target).toggleClass("selected");
    },
    "toggleDisplayedClass" : function toggleDisplayedClass(event) {
        $(event.delegateTarget).children().toggleClass("displayed");
    },
    "positionLis" : function positionLis() {
        $("li").each(function (index, element) {
            $(element).css("top", index + "em");
        });
    }
    
};
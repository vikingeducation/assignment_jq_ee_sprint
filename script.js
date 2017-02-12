$(document).ready(function() {
        hackedDropBox.init();
});

var hackedDropBox = {
    "init" : function init() {
        this.ulListener(this.toggleSelectedClass);
        this.ulListener(this.toggleDisplayedClass);
        this.ulListener(this.toggleCollapsedClass);
        this.styleLis();
        this.defineUlSize();
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
    "toggleCollapsedClass" : function toggleCollapsedClass(event) {
        $(event.delegateTarget).children().toggleClass("collapsed");

    },
    "styleLis" : function styleLis() {
        $("li").each(function (index, element) {
            $(element).css("top", index + "em");
            $(element).css("transition", "top 1s");
        });
    },
    "defineUlSize" : function defineUlSize() {
        var $ul = $("ul");
        var height = $ul.children().length;
        $ul.css("height", height + "em");
    }
    
    
};
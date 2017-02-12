$(document).ready(function() {
        hackedDropBox.init();
        formValidator.init();
});

var hackedDropBox = {
    "init" : function init() {
        this.ulListener(this.toggleSelectedClass);
        this.ulListener(this.toggleDisplayedClass);
        this.ulListener(this.toggleCollapsedClass);
        this.ulListener(this.toggleCollapsedViewClass);
        this.styleLis();
        this.defineUlSize();
    },
    "ulListener" : function ulListener(fn) {
        $("ul").on("click", "li[id!='default-value']", fn);
        $("ul").one("click", "li[id='default-value']", fn);
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
    "toggleCollapsedViewClass" : function toggleCollapsedViewClass(event) {
        $(event.delegateTarget).toggleClass("collapsed-view");
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

var formValidator = {
    "init" : function init() {
        $("#username").keyup(this.displayNumberOfChars);
        $("#message").keyup(this.displayNumberOfChars);
        $("#password").keyup(this.displayNumberOfChars);
        $("#passwordconfirm").keyup(this.checkIfPasswordsMatching);
    },
    "displayNumberOfChars" : function displayNumberOfChars(event) {
        var $input = $(event.target);
        var inputValue = $input.val();
        var inputValueLength = inputValue.length;
        
        //Find the corresponding div which displays this value as defined in the html
        $input
            .siblings(".remaining-chars")
            .children(".remaining-number")
            .text(inputValueLength); //Pass the length of the value into this HTML element for the user.

    },
    "checkIfPasswordsMatching" : function checkIfPasswordsMatching(event){
        var $confirmPass = $(event.target);
        var passConfirmVal = $confirmPass.val();
        
        //Get the password input value
        var passVal = $("#password").val()
        var isMatching = passVal === passConfirmVal;
        //Find the matching display for the user
        $confirmPass
            .siblings(".matching-chars")
            .children(".is-matching")
            .text(isMatching); //Pass the boolean value into HTML element for the user. jQuery will coerce boolean to string
        
    }
    
    
};
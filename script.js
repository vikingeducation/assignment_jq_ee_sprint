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
        var usernameCalc = this.makeRemainingCharsCalc(32);
        var messageCalc = this.makeRemainingCharsCalc(140);
        var passwordCalc = this.makeRemainingCharsCalc(16);
        var makeUsernameLengthChecker = this.makeLengthChecker(4, 32, "#username");
        var makeMessageLengthChecker = this.makeLengthChecker(4, 140, "#message");
        var makePasswordLengthChecker = this.makeLengthChecker(6, 16, "#password");
        var testSuite = {
            "username" : makeUsernameLengthChecker,
            "message" : makeMessageLengthChecker,
            "password" : makePasswordLengthChecker,
            "confirmpassword" : this.checkIfPasswordsMatching //Empty passwords and passwords less than length still pass the test
        };
        $("#username").keyup(usernameCalc);
        $("#message").keyup(messageCalc);
        $("#password").keyup(passwordCalc);
        $("#username").keyup(this.toggleFeedbackDisplay);
        $("#message").keyup(this.toggleFeedbackDisplay);
        $("#password").keyup(this.toggleFeedbackDisplay);
        $("#passwordconfirm").keyup(this.updatePasswordMatching(this.checkIfPasswordsMatching));
        $("#test-form").submit(testSuite, this.checkInputs);
    },
    "makeRemainingCharsCalc" : function makeRemainingCharsCalc(maxChars) {
        return function displayNumberOfChars(event) {
            var $input = $(event.target);
            var inputValue = $input.val();
            var inputValueLength = inputValue.length;
            
            //Find the corresponding div which displays this value as defined in the html
            $input
                .siblings(".remaining-chars")
                .children(".remaining-number")
                .text(maxChars - inputValueLength); //Pass the length of the value into this HTML element for the user.
        };
    },
    "checkIfPasswordsMatching" : function checkIfPasswordsMatching(){
        var passConfirmVal = $("#passwordconfirm").val();
        
        //Get the password input value
        var passVal = $("#password").val()
        var isMatching = passVal === passConfirmVal;
        return isMatching;
        
    },
    "updatePasswordMatching" : function updatePasswordMatching(checkFn) {
        return function (event) {
        $("#passwordconfirm")
            .siblings(".matching-chars")
            .children(".is-matching")
            .text(checkFn()); //Pass the boolean value into HTML element for the user. jQuery will coerce boolean to string
        };
    },
    "makeLengthChecker" : function makeLengthChecker(min, max, DOMElement) {
        var tempArr = [min, max];
        tempArr.sort(function sorter(a, b) { //sort in ascendering order
            return a - b;
        });
        min = tempArr[0];
        max = tempArr[1];
        return function lenChecker() { //Can also accept jQuery objects
            var inputLen = $(DOMElement).val().length;
            if (inputLen < min || inputLen > max) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    "checkInputs" : function checkInputs(event) {
        Object.getOwnPropertyNames(event.data).forEach(function (element, index, arr) {
            console.log(event.data[element]());
        });
        event.preventDefault();
        alert("You did it!");
    },
    "toggleFeedbackDisplay" : function toggleFeedbackDisplay(event) {
        var $input = $(event.target);
        var inputLen = $input.val().length;
        var $display = $input
                        .siblings(".remaining-chars, .matching-chars"); //Gets the inputs corresponding display
        $display.toggleClass("displayed", (function() {
            if (inputLen > 0){
                return true;
            }
            else {
                return false;
            }
        })());
    },
    
    "getLengthOfInput" : function getLengthOfInput() {
        //Maybe use to refactor?
    }
    
    
};
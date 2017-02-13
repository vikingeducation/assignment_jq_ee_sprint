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
        this.styleUls();
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
    "styleUls" : function styleUls() {
    $("ul").css("transition", "height 1s");
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
    "init" : function init() { //Init should be passed all input elements with corresponding information
               
        var makeUsernameLengthChecker = this.makeLengthChecker(4, 32, "#username");
        var makeMessageLengthChecker = this.makeLengthChecker(4, 140, "#message");
        var makePasswordLengthChecker = this.makeLengthChecker(6, 16, "#password");
        var checkIfPasswordsMatching = this.checkIfValuesMatching("#password", "#passwordconfirm");
        
        var usernameCalc = this.makeRemainingCharsCalc(32);
        var messageCalc = this.makeRemainingCharsCalc(140);
        var passwordCalc = this.makeRemainingCharsCalc(16);
        var passMatch = this.updatePasswordMatching(checkIfPasswordsMatching);
 
        
        var testSuite = {
            "#username" : this.makeValidatorObject(makeUsernameLengthChecker, "Error: Username not between 4 and 32 chars"),
            "#message" : this.makeValidatorObject(makeMessageLengthChecker, "Error: Message not between 4 and 140 chars"),
            "#password" : this.makeValidatorObject(makePasswordLengthChecker, "Error: Password not between 6 and 16 chars"),
            "#confirmpassword" : this.makeValidatorObject(checkIfPasswordsMatching, "Error: Passwords do not match") //Empty passwords and passwords less than length still pass the test
        };
        
        $("#username").keyup(usernameCalc);
        $("#message").keyup(messageCalc);
        $("#password").keyup(passwordCalc);
        $("#passwordconfirm").keyup(passMatch);
        $("#test-form").submit(testSuite, this.checkInputs);
    },
    "makeRemainingCharsCalc" : function makeRemainingCharsCalc(maxChars) {
        return (event) => {
            var $input = $(event.target);
            var inputValueLength = this.getLengthOfInput($input);
            this.toggleFeedbackDisplay(inputValueLength, $input);
            var message = "Remaining characters: " + (maxChars - inputValueLength);
            this.updateUserFeedback($input, message);
        };
    },
    "checkIfValuesMatching" : function checkIfValuesMatching(DOMElementOne, DOMElementTwo){
        return function checkMatching() {
        var val1 = $(DOMElementOne).val();
        
        //Get the password input value
        var val2 = $(DOMElementTwo).val();
        var isMatching = val1 === val2;
        return isMatching;
        };
        
    },
    "updatePasswordMatching" : function updatePasswordMatching(checkFn) {
        return (event) => {
        var $input = $(event.target);
        var inputValueLength = this.getLengthOfInput($input);
        this.toggleFeedbackDisplay(inputValueLength, $input);
        var message = "Passwords matching: " + checkFn();
        this.updateUserFeedback($input, message);  //Pass the boolean value into HTML element for the user. jQuery will coerce boolean to string
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
        };
    },
    "checkInputs" : function checkInputs(event) {
        event.preventDefault();
        var passing = false;
        Object.getOwnPropertyNames(event.data).forEach(function (currentValue, index, arr) {
            event.data[currentValue].testResult = event.data[currentValue]["test"](); //Run the test and assign the result to the testResult property on the respective input
        });
        var results = Object.getOwnPropertyNames(event.data).map(function (currentValue, index, arr) {
            return [currentValue, event.data[currentValue].testResult]; //Run the test and assign the result to the testResult property on the respective input
        });
        //Go through the results, if there is a false value, Call the updateUserFeedback function passing in the error message and the id
        //Have local validateTrigger, if true at the end, tests passed!
        results.forEach(function (currentValue, index, arr) {
            if (!currentValue[1]) { //Then display feedback message
                $(currentValue[0])
                    .siblings(".feedback")
                    .text(event.data[currentValue[0]].errorMessage);
            }
        });
        
        var justResults = results.map(function(currentValue, index, arr) {
            return currentValue[1]; //Grab the testResult value from each test
        });
        passing = justResults.reduce(function(acc, currentValue) {
            return acc && currentValue;
        }, true); //See if all tests passing
        console.log(results); //Display testResults
        console.log("All tests passing: ", passing); //Display if all tests passed
    },
    "toggleFeedbackDisplay" : function toggleFeedbackDisplay(valLen, DOMElement) {
        var $input = $(DOMElement);
        var $display = $input
                        .siblings(".feedback"); //Gets the inputs corresponding display
        $display.toggleClass("displayed", (function() {
            if (valLen > 0){
                return true;
            }
            else {
                return false;
            }
        })());
    },
    
    "getLengthOfInput" : function getLengthOfInput(DOMElement) {
        var $input = $(DOMElement);
        return $input.val().length;
        //Maybe use to refactor?
    },
    
    "makeValidatorObject" : function makeValidatorObject(test, errMessage){
        var validatorObject = {
        "test" : test,
        "testResult" : false,
        "errorMessage" : errMessage
        }
        return validatorObject;
    },
    
    "updateUserFeedback" : function updateUserFeedback(DOMElement, message) {
        var $input = $(DOMElement);
        $input
            .siblings(".feedback")
            .text(message);
    }
    
    
};

var photoTagger = {
    
};
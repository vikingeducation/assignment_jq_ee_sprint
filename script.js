"use strict";

$(document).ready(function() {
        hackedDropBox.init();
        formValidator.init();
        photoTagger.init("#photo-tagger");
});


/********************************************************** Start hackedDropdown ***********************************************/



var hackedDropBox = {
    "init" : function init() {
        $("ul").on("click", function(event) {
            $(event.currentTarget).toggleClass("displayed-view")
        });
        this.ulListener(this.toggleSelectedClass);
    },
    "ulListener" : function ulListener(fn) {
        $("ul").on("click", "li", fn);
    },
    "toggleSelectedClass" : function toggleSelectedClass(event) {
        //If an li gets clicked (detects a click event), change the value of "selected-value" to the contents of the event.currentTarget
        $("#selected-value").text($(event.currentTarget).text());
    },
    /* NOT PRESENTLY USED, CONSIDER DELETING
    "toggleCollapsedViewClass" : function toggleCollapsedViewClass(event) {
        $(event.delegateTarget).toggleClass("collapsed-view");
    },
    NOT PRESENTLY USED
    "styleUls" : function styleUls() {
    $("ul").css("transition", "height 1s");
    },
    "defineUlSize" : function defineUlSize() {
        var $ul = $("ul");
        var height = $ul.children().length;
        $ul.css("height", height + "em");
    }
    */
    
};

/************************************************* End hackedDropDown *****************************************************/




/*********************************************** Start formValidator object ************************************************/

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
            "#passwordconfirm" : this.makeValidatorObject(checkIfPasswordsMatching, "Error: Passwords do not match") //Empty passwords and passwords less than length still pass the test
        };
        var tests = this.checkInputs(testSuite);
        
        $("#username").keyup(usernameCalc);
        $("#message").keyup(messageCalc);
        $("#password").keyup(passwordCalc);
        $("#passwordconfirm").keyup(passMatch);
        $("#test-form").submit(tests);
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
    "checkInputs" : function checkInputs(testSuite) {
        return (event) => {
            event.preventDefault();
            var passing = false;
            Object.getOwnPropertyNames(testSuite).forEach(function (currentValue, index, arr) {
                testSuite[currentValue].testResult = testSuite[currentValue]["test"](); //Run the test and assign the result to the testResult property on the respective input
            });
            var results = Object.getOwnPropertyNames(testSuite).map(function (currentValue, index, arr) {
                return [currentValue, testSuite[currentValue].testResult]; //Run the test and assign the result to the testResult property on the respective input
            });
            //Go through the results, if there is a false value, Call the updateUserFeedback function passing in the error message and the id
            //Have local validateTrigger, if true at the end, tests passed!
            for (let i = 0; i < results.length; i++) {
                let currentValue = results[i];
                if (!currentValue[1]) { //Then display feedback message
                    this.toggleFeedbackDisplay(0, $(currentValue[0]), true); //This is referencing the results array right now. We need it to reference the formValidation object
                    this.updateUserFeedback($(currentValue[0]), testSuite[currentValue[0]].errorMessage);
                }
            }
        
            var justResults = results.map(function(currentValue, index, arr) {
                return currentValue[1]; //Grab the testResult value from each test
            });
            passing = justResults.reduce(function(acc, currentValue) {
                return acc && currentValue;
            }, true); //See if all tests passing
            console.log(results); //Display testResults
            console.log("All tests passing: ", passing); //Display if all tests passed
        };
    },
    "toggleFeedbackDisplay" : function toggleFeedbackDisplay(valLen, DOMElement, onError) {
        var $input = $(DOMElement);
        var $display = $input
                        .siblings(".feedback"); //Gets the inputs corresponding display
        $display.toggleClass("display", (function() {
            if (valLen > 0 || onError){
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
/********************************** End formValidator object *****************************************************/



/********************************** Start photoTagger object ************************************************************/


var photoTagger = { //Good idea to use namespaces for attaching and detaching event handlers and specifying handler names
    "init" : function init(DOMElement) {
        let targetImg = $(DOMElement);
        console.log("What do, time for photoTagger!");
        this.changeState("default");
        this.updateEventHandlers();

    },
    "makeTaggerBox" : function makeTaggerBox() {
        //make box (div) element with width and height and background color and absolute positioning and place it in the body element
        let $box = $("<div></div>")
            .addClass("tagger");
        $box.append(this.makeTagFrame());
        $("#photo-tagger").append($box); //targeting the body element
        return $box;
    },
    "makeBox" : function makeBox() {
        //make box (div) element with width and height and background color and absolute positioning and place it in the body element
        let $box = $("<div></div>")
            .addClass("tagger");
        $box.append(this.makeTagFrame());
        $("#photo-tagger").append($box); //targeting the photo container
        return $box;
    },
    "makeTagFrame" : function makeTagFrame() {
        let $tagFrame = $("<div>")
            .addClass("tag-frame");
        return $tagFrame;
    },
    "addNamesDropDown" : function addNamesDropDown() {
        var $selectElement = $("<select>").attr("name", "tagFriends").attr("size", 3);
        var $optionOne = $("<option>").attr("value", "jane").text("Jane");
        var $optionTwo = $("<option>").attr("value", "jill").text("Jill");
        var $optionThree = $("<option>").attr("value", "jan").text("Jan");
        $selectElement.append($optionOne);
        $selectElement.append($optionTwo);
        $selectElement.append($optionThree);
        return $selectElement;

    },
    "nameAppend" : function nameAppend(option) {
        let $option = $(option);
        let name = $option.text() //Get text of the name clicked
        let $nameDisplay = $("<div>").text(name);
        let $parentTagger =$option.parents(".tagger");
        $parentTagger.append($nameDisplay);
    },
    "selectRemove" : function selectRemove(option) {
        //DOMElement is the option element with select as it's only parent
        $(option).parent().remove();
    },
    "removeUnpersistedTagger" : function removeUnpersistedTagger() {
        $(".tagger:not(.persist)").remove(); //remove any tagger boxes that do not also have persist class
        
    },
    "addPersistClass" : function addPersistClass(DOMElement) {
        $(DOMElement).parents(".tagger").addClass("persist");
    },
    "updateEventHandlers" : function updateEventHandlers(eventTrigger) {
        photoTagger.removeUnpersistedTagger();
        $("#photo-tagger").off(); //clear all previous handlers Async problems? Does not return promise. Hope that all previous handlers are remove before new ones are attached
        let height;
        let width;
        switch(photoTagger.state) {
            case "default":
                console.log("now attaching default state handlers");
                $("#photo-tagger").one("mouseenter", function(event) {
                    photoTagger.state = "awaitingBoxLocation";
                    photoTagger.updateEventHandlers(event);
                });
                break;
            case "awaitingBoxLocation":
                console.log("now attaching awaitingBoxLocation handlers");
                let $tagger = $(photoTagger.makeTaggerBox());
                //Look at the dimensions of the tagger-box.
                height = $($tagger).height(); //Should this be $(tagger).children(".tagger-box"). But we really want to take into account to total with a name. We can calculate that prior and hide it.
                width = $($tagger).width();
                let topOffset = height/2;
                let leftOffset = width/2;
                
                
                let topAndLeftPositionOfPhoto = $("#photo-tagger").offset();
                let widthOfPhoto = $("#photo-tagger").width();
                let heightOfPhoto = $("#photo-tagger").height();
                let topEdgeOfPhoto = topAndLeftPositionOfPhoto.top;
                let leftEdgeOfPhoto = topAndLeftPositionOfPhoto.left;
                let rightEdgeOfPhoto = leftEdgeOfPhoto + widthOfPhoto;
                let bottomEdgeOfPhoto = topEdgeOfPhoto + heightOfPhoto;
                
                //Draw the box once so that it appears on state switch. Use eventTrigger
                $tagger.offset({"top": eventTrigger.pageY - topOffset, "left": eventTrigger.pageX - leftOffset});
                
                $("#photo-tagger").on("mousemove", function (event) {
                    if (event.pageX > rightEdgeOfPhoto || event.pageX < leftEdgeOfPhoto || event.pageY > bottomEdgeOfPhoto || event.pageY < topEdgeOfPhoto) {
                        $(event.currentTarget).trigger("mouseleave");
                    }
                    else {
                        $tagger.css("top", event.pageY - topOffset)
                                .css("left", event.pageX - leftOffset);
                    }
                });
                $("#photo-tagger").one("mouseleave", function(event) {
                    photoTagger.state = "default";
                    photoTagger.updateEventHandlers();
                });
                $("#photo-tagger").one("click", function(event) {
                    photoTagger.state = "awaitingNameSelection";
                    photoTagger.updateEventHandlers(event);
                });
                //We need to make a function in here which refers to the "box" that we want to place somewhere
                
                break;
            case "awaitingNameSelection":
                let $box = $(photoTagger.makeBox());
                height = $box.height();
                width = $box.width();
                let topAdjust = height/2;
                let leftAdjust = width/2;
                let topAdjusted = eventTrigger.pageY - topAdjust;
                let leftAdjusted = eventTrigger.pageX - leftAdjust;
                $box.append(photoTagger.addNamesDropDown());
                $box.offset({"top": topAdjusted, "left": leftAdjusted});
                
                console.log("now attaching awaitingNameSelection handlers");
                $("#photo-tagger").one("mouseleave", function(event) {
                    photoTagger.state = "default";
                    photoTagger.updateEventHandlers();
                });
                $("#photo-tagger").one("click", function(event) {
                    photoTagger.state = "awaitingBoxLocation";
                    photoTagger.updateEventHandlers(event);
                });

                $("#photo-tagger").one("click", "option", function(event) {
                    event.stopPropagation(); //Stop listener on photo-tagger from being triggered
                    photoTagger.addPersistClass(event.currentTarget);
                    photoTagger.nameAppend(event.currentTarget);
                    photoTagger.selectRemove(event.currentTarget);
                    photoTagger.state = "awaitingBoxLocation";
                    photoTagger.updateEventHandlers(event);
                });
 
                break;
            default:
                console.log("No handlers registered. Error");
        }
        
    },
    
    "buildState" : function buildState() {
        
    },
    "changeState" : function changeState(state) {
        this.state = state; //Need to figure out how to assign state to photoState
    },
    "makeDefaultState" : function makeDefaultState(fnOne) { //div id=photo-tagger is waiting for mouse enter event. Initial state and triggered when mouseleave event occurs
        return (event) => {
            console.log("defaultState active!");
            $("#photo-tagger").off(); //Clear all listeners
            $("#photo-tagger").one("mouseenter", fnOne); //trigger awaitingBoxLocation state
        };
    },
    "makeAwaitingBoxLocationState" : function makeAwaitingBoxLocationState() {
        return () => {
            console.log("awaitingBoxLocationState active!");
            $("#photo-tagger").off(); //Clear all listeners. Is this needed if we make all listeners one()?
            $("#photo-tagger").one("mouseleave", function(event) {console.log("Now in DefaultState.");}); //trigger defaultState state
            $("#photo-tagger").one("click", function(event) {console.log("Now in AwaitingNameSelectionState");}); //Move to AwaitinNameSelectionState
        };
    },
    
    "makeAwaitingNameSelectionState" : function makeAwaitingNameSelectionState(handler) {
        return () => {
            
        }
    }
};


/************************************************ End photoTagger object **************************************************/



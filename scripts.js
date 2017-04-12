(function init() {
    "use strict";

    var formValidator = {
        init: function() {
            formValidator.config = {
                $formInputs: $("form *").filter(":input"),
                $passInputs: $("form *").filter(":password"),
                $password: $("form *")
                    .filter(":password")
                    .first(),
                $passwordConfirm: $("form *")
                    .filter(":password")
                    .last() ,
                $passNotification: $("p.pass-warning"),
                $submitBtn: $("#form-submit") 
            };
            formValidator.setup();
        },

        setup: function() {
            formValidator.config.$formInputs.each(function(i, inputField) {
                $(inputField).keyup(function () {
                    var self = this;
                    formValidator.checkInputLength($(self));
                });
            });
            formValidator.config.$passwordConfirm.keyup(function () {
                formValidator.checkPasswords(
                    formValidator.config.$password, 
                    formValidator.config.$passwordConfirm, 
                    formValidator.config.$passNotification
                );
            });
            formValidator.config.$submitBtn.click(function(event) {
                event.preventDefault();
                event.stopPropagation();
                formValidator.validateInput(formValidator.config.$formInputs);
            })
        },

        checkInputLength: function(self) {
            var inputLength = self.val().length;
            var remaining = self.attr("data-max-length") - inputLength;
            var $inputNotification = self.next(".input-notification");
            if (inputLength) {
                $inputNotification.text("Remaining Characters: " + remaining);
            } else {
                $inputNotification.text("");
            }
        },

        checkPasswords: function($password, $passwordConfirm, $passNotification) {
            if ($passwordConfirm.val().length === 0) {
                $passNotification.html("");
            } else if ($password.val() !== $passwordConfirm.val()) {
                $passNotification.html("Passwords do not match");
            } else {
                $passNotification.html("");
            }
        },

        validateInput: function($formInputs) {
            $formInputs.each(function(i, inputField) {
                var $inputField = $(inputField);
                var $inputError = $inputField.siblings(".input-error");
                var maxLength = $inputField.attr("data-max-length");
                var minLength = $inputField.attr("data-min-length");
                if ($inputField.val().length > maxLength) {
                    $inputField.addClass("input-error-highlight");
                    $inputError.text("Error: Exceeded " + maxLength + " character limit for field");
                } else if ($inputField.val().length < minLength) {
                    $inputField.addClass("input-error-highlight");
                    $inputError.text("Error: Please input at least " + minLength + " characters");
                }
            })
        }
    };

    var dropdown = {
        init: function() {
            dropdown.config = {
                $menu: $("ul.dropdown-menu"),
                $firstElement: $("ul li a").first()
            };
            dropdown.setup(dropdown.config);
        },

        setup: function(config) {
            // Hides menu upon initial page load
            dropdown.toggleOptions(config, 0);

            config.$menu.on("click", "a", function(event) {
                event.preventDefault();

                // Compares raw DOM elements
                var $target = $(event.target);
                if ($target.get(0) !== config.$firstElement.get(0)) {
                    dropdown.setTopElement($target, config.$firstElement);
                }
                dropdown.toggleOptions(config, 500);
            })
        },

        // Hides and displays menu options
        toggleOptions: function(config, speed) {
            config.$menu.children()
                .filter(":not(:first)")
                .slideToggle(speed);
        },

        setTopElement: function($target, $firstElement) {
            $firstElement.text($target.text())
        }
    };

    var imgTagger = {
        init: function() {
            imgTagger.config = {
                $img: $("div#tag-staging"),
                $taggingBlockHover: $("div.tagging-block-hover"),
                $taggingBlockTemp: $("div.tagging-block-temp"),
                $friendsList: $("ul.friends-list"),
                taggingBlockOffset: 50,
                taggingStage: "hover"
            };
            imgTagger.setup(imgTagger.config);
        },

        setup: function(config) {
            imgTagger.setTaggerHover(config);

            imgTagger.clearTaggerHover(config);

            imgTagger.enableTagging(config);

            imgTagger.removeTags(config);
        },

        // Sets up (x,y) coords for tagging block, display tagger
        // on mouseover
        setTaggerHover: function(config) {
            config.$img.on("mousemove.taggerHover", function(event) {
                config.$taggingBlockHover.show();

                var offset = $(this).position();
                var xCoordinate = (event.pageX - offset.left) + "px";
                var yCoordinate = (event.pageY - offset.top) + "px";

                imgTagger.moveTaggingBlock(config, xCoordinate, yCoordinate);
            });
        },

        // Clears screen when mouse leaves image area
        clearTaggerHover: function(config) {
            config.$img.on("mouseout.taggerHoverExit", function(event) {
                config.$taggingBlockHover.hide();
            });
        },

        moveTaggingBlock: function(config, x, y) {
            config.$taggingBlockHover.css({
                'left': x,
                'top': y
            });
        },

        // Removes hover tagging block and replaces it with a static temp block
        // Turns off tagging process until user clicks outside image
        enableTagging: function(config) {
            config.$img.on("click.setTag", function(event) {
                config.$img.off("mousemove.taggerHover mouseout.taggerHoverExit click.setTag");
                imgTagger.startTagging(config, event.offsetX, event.offsetY);
                config.$taggingBlockHover.hide();
            });
        },

        startTagging: function(config, x, y) {
            config.$taggingBlockTemp.css({
                'left': (x - config.taggingBlockOffset),
                'top': (y - config.taggingBlockOffset)
            });
            config.$taggingBlockTemp.show();
            config.$friendsList.slideDown("fast");
            imgTagger.selectFriend(config, x, y);
        },

        selectFriend: function(config, x, y) {
            var $friends = config.$friendsList.find("a");
            $friends.on("click.selectFriend", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var friendName = event.target.innerHTML;
                config.taggingStage = "permanent";
                config.$taggingBlockTemp.slideUp("fast");
                config.$friendsList.slideUp("fast");
                $friends.off("click.selectFriend");
                imgTagger.saveTag(x, y, config, friendName);
            });
            imgTagger.cancelTagging(config, $friends);
        },

        saveTag: function(x, y, config, friend) {
            var $taggingBlockPerm = $("<div></div>")
                .addClass("tagging-block-permanent")
                .css({
                    'left': (x - config.taggingBlockOffset),
                    'top': (y- config.taggingBlockOffset)
                });
            var $friend = $("<p></p>")
                .addClass("saved-friend")
                .text(friend);
            var $removeTag = $("<a></a>")
                .attr("href", "#")
                .addClass("remove-tag")
                .text("x");
            $friend.append($removeTag);
            $taggingBlockPerm.append($friend);
            config.$img.append($taggingBlockPerm);
            config.taggingStage = "hover";
            imgTagger.restartTagging(config);
        },

        // setTimeout used so that function only begins to listen once
        // user has started tagging process
        cancelTagging: function(config, $friends) {
            setTimeout(function() {
                $("html").on("click.cancelTagging", function(event) {
                    if (!$(event.target).is("div.tagging-block-temp *")) {
                        config.$taggingBlockTemp.hide();
                        $friends.off("click.selectFriend");
                        imgTagger.restartTagging(config);
                    }
                });
            }, 0);
        },

        restartTagging: function(config) {
            $("html").off("click.cancelTagging");
            imgTagger.setup(config);
        },

        removeTags: function(config) {
            $("a.remove-tag").on("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                $(this).parents().closest(".tagging-block-permanent").remove();
            });
        }
    };

    var simonSays = {
        init: function() {
            simonSays.config = {
                $greenPad: $("div.simon-says.simon-green"),
                $redPad: $("div.simon-says.simon-red"),
                $yellowPad: $("div.simon-says.simon-yellow"),
                $bluePad: $("div.simon-says.simon-blue"),
                $allPads: $("div#simon-says-container *"),
                $startButton: $("#simon-says-start"),
                soundSrcs: [
                    "assets/sound/greenPad.mp3",
                    "assets/sound/redPad.mp3",
                    "assets/sound/yellowPad.mp3",
                    "assets/sound/bluePad.mp3"
                ],
                computerMoves: [],
                userMoves: [],
                movePosition: 0
            };
            simonSays.setup();
        },

        setup: function() {
            simonSays.enableAudio("user");
            simonSays.enableAudio("computer");
            simonSays.config.$allPads.off("mousedown.userTouch");
            simonSays.config.$greenPad.trigger("computer.computerTouch");
            simonSays.enableStartButton();
            // 0. disable userTouch on default.
            // 1. When start button is pressed, startComputerMoves();
            // 2. select a random number between 0 and 3
            // 3. if 0, then green. if 1, then red. etc. etc.
            // 4. add this to "computerMoves" array in config.
            // 5. playComputerMoves();
            // 6. Play computerMoves[0]. delay. Then computer moves[1]. etc.
            // 7. do until length of array is traversed.
            // 8. enable userTouch
            // 9. If click is detected on a pad, addClickToMoves(), moveposition++;
            // 10. CheckMoves
            // 11. every click, iterate through computerMoves[] up to moveposition
            // 12. if move position === length of computerMoves and equivalent arrays; newComputerMove
            // 13. else play error.mp3
            // 14. move position is 0, arrays are cleared
            // 15. ocmputerMoves
        },

        // iterates through each pad and adds mousedown listeners
        // sets custom event 'computer' that only jquery can access
        enableAudio: function(player) {
            var event;
            if (player === "user") {event = "mousedown.userTouch";}
            if (player === "computer") {event = "computer.computerTouch";}
            simonSays.config.$allPads.each(function(index, element) {
                $(element).on(event, function(event) {
                    var $audioFile = $("<audio></audio")
                        .attr("src", simonSays.config.soundSrcs[index]);
                    $audioFile[0].play();

                    if (player === "user") {
                        simonSays.addTouchToUserMoves($(element));
                    }
                });
            });
        },

        addTouchToUserMoves: function($element) {
            if ($element.hasClass("simon-green")) {
                simonSays.config.userMoves.push("green");
            } else if ($element.hasClass("simon-red")) {
                simonSays.config.userMoves.push("red");
            } else if ($element.hasClass("simon-yellow")) {
                simonSays.config.userMoves.push("yellow");
            } else if ($element.hasClass("simon-blue")) {
                simonSays.config.userMoves.push("blue");
            }

            simonSays.config.movePosition++;
            console.log(simonSays.config.movePosition);
            console.log(simonSays.config.userMoves);

            // function to evaluate moves here!
        },

        enableStartButton: function() {
            simonSays.config.$startButton.on("click.startButton", function(event) {
                simonSays.initializeGame();
            });
        },

        initializeGame: function() {
            simonSays.config.userMoves = [];
            simonSays.config.computerMoves = [];
            simonSays.config.movePosition = 0;

            simonSays.createNextMove();
            simonSays.playComputerMoves();
        },

        createNextMove: function() {
            var random = Math.floor(Math.random() * (4 - 0));
            var nextMove;

            switch (random) {
                case 0:
                    nextMove = "green";
                    break;
                case 1:
                    nextMove = "red";
                    break;
                case 2:
                    nextMove = "yellow";
                    break;
                case 3:
                    nextMove = "blue";
                    break;
                default:
                    nextMove = "blue";
            }

            simonSays.config.computerMoves.push(nextMove);
        },

        playComputerMoves: function() {
            
        }

    };
    $(document).ready(function() {
        formValidator.init();
        dropdown.init();
        imgTagger.init();
        simonSays.init();
    });
}());
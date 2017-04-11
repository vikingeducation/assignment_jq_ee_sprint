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

    // TO DO:
    // 1. Fix function that restarts setup when user clicks outside image so that
    //    it ignore if user clicker ul.friends-list
    // 2. Append taggedFriend box to DOM
    // 3. Add remove tag function
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
            // Sets up (x,y) coords for tagging block, display tagger
            // on mouseover
            config.$img.mousemove(function(event) {
                if (config.taggingStage === "hover") {
                    config.$taggingBlockHover.show();

                    var offset = $(this).position();
                    var xCoordinate = (event.pageX - offset.left) + "px";
                    var yCoordinate = (event.pageY - offset.top) + "px";

                    imgTagger.moveTaggingBlock(config, xCoordinate, yCoordinate);
                }
            });

            // Clears screen when mouse leaves image area
            config.$img.mouseout(function(event) {
                if (config.taggingStage === "hover") {
                    config.$taggingBlockHover.hide();
                }
            });

            // Removes hover tagging block and replaces it with a static temp block
            // Turns off tagging process until user clicks outside image
            console.log(config.taggingStage);
            config.$img.click(function(event) {
                if (config.taggingStage === "hover") {
                    imgTagger.startTagging(config, event.offsetX, event.offsetY);
                    config.$taggingBlockHover.hide();
                }
            });
        },

        moveTaggingBlock: function(config, x, y) {
            config.$taggingBlockHover.css({
                'left': x,
                'top': y
            });
        },

        startTagging: function(config, x, y) {
            console.log("start tagging fired");
            config.taggingStage = "temp";
            config.$taggingBlockTemp.css({
                'left': (x - config.taggingBlockOffset),
                'top': (y - config.taggingBlockOffset)
            });
            config.$taggingBlockTemp.show();
            config.$friendsList.slideDown();
            imgTagger.selectFriend(config, x, y);
        },

        selectFriend: function(config, x, y) {
            console.log("select Friend fired");            
            if (config.taggingStage === "temp") {
                var $friends = config.$friendsList.find("a");
                $friends.click(function(event) {
                    if (config.taggingStage === "temp") {
                        event.preventDefault();
                        var friendName = event.target.innerHTML;
                        config.taggingStage = "permanent";
                        config.$taggingBlockTemp.slideUp();
                        imgTagger.saveTag(x, y, config, friendName);
                    }
                });
                imgTagger.cancelTagging(config);
            }
        },

        saveTag: function(x, y, config, friend) {
            console.log("save tag fired");
            if (config.taggingStage === "permanent") {
                var $taggingBlockPerm = $("<div></div>")
                    .addClass("tagging-block-permanent")
                    .css({
                        'left': (x - config.taggingBlockOffset),
                        'top': (y- config.taggingBlockOffset)
                    });
                var $friend = $("<p></p>")
                    .addClass("saved-friend")
                    .text(friend);
                $taggingBlockPerm.append($friend);
                config.$img.append($taggingBlockPerm);
                // imgTagger.removeTempFriendList();
                // config.taggingStage = "hover";
            }
        },

        // setTimeout used in order this function to only be called when user
        // start tagging process. Otherwise, runs immediately on-click,
        // interfering with other functions
        cancelTagging: function(config) {
            console.log("outter cancel tagging fired");
            setTimeout(function() {
                $("html").click(function(event) {
                    console.log("inner cancel tagging fired");
                    if (config.taggingStage === "temp" || config.taggingStage === "perm") {
                        if (!$(event.target).is("div.tagging-block-temp *")) {
                            // config.taggingStage = "hover";
                            config.$taggingBlockTemp.hide();
                            $("html").off("click");
                            console.log("cancel clicked!");
                        }
                    }
                });
            }, 0);
        }
    };

    $(document).ready(function() {
        formValidator.init();
        dropdown.init();
        imgTagger.init();
    });
}());
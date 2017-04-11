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

    // TO DO:
    // 1. Stop propagation for all name-friend clicks
    // 2. event namespacing so that you only turn on what needs to be turned on
    //      -might have a boolean that determines if this is first pass or second,
    //      and reactivate listeners on second pass :)
    // 
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

    $(document).ready(function() {
        formValidator.init();
        dropdown.init();
        imgTagger.init();
    });
}());
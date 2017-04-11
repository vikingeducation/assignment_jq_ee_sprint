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
                $menu: $("ul").addClass("dropdown-menu"),
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
                $tagger: $("div.tagging-block-hover"),
                imgHasListeners: false,
                friends: ["Caesar", "Pompey", "Crassus", "Octavian", "Mark Antony", "Lepidus"],
                taggingBlockOffset: 50
            };
            imgTagger.setup(imgTagger.config);
        },

        setup: function(config) {
            config.imgHasListeners = true;

            // Sets up (x,y) coords for tagging block
            config.$img.mousemove(function(event) {
                var offset = $(this).position();
                var xCoordinate = (event.pageX - offset.left) + "px";
                var yCoordinate = (event.pageY - offset.top) + "px";
                imgTagger.displayTaggingBlock(config);
                imgTagger.moveTaggingBlock(config, xCoordinate, yCoordinate);
            });

            // Clears screen when mouse leaves image area
            config.$img.mouseout(function(event) {
                config.$tagger.toggle();
            });

            // Removes hover tagging block and replaces it with a static temp block
            // Turns off tagging process until user clicks outside image
            config.$img.click(function(event) {
                imgTagger.addTaggingBlockTemp(event, config);
                config.$img.off();
                config.imgHasListeners = false;
                config.$tagger.toggle();
            });

            // Re-adds listeners if missing when user clicks outside image
            $("*").click(function(event) {
                if (!$(event.target).is("img#img-tagger-main") && !config.imgHasListeners) {
                    console.log("Re-add listeners being called unexpectedly!");
                    imgTagger.clearTaggingBlock(".tagging-block-temp");
                    imgTagger.setup(imgTagger.config);
                }
            });

            // stores friends list and makes available to all functions
            imgTagger.$friendsList = imgTagger.populateFriendsList(config);
        },

        displayTaggingBlock: function(config) {
            config.$tagger.css({
                "display": "block"
            });
        },

        clearTaggingBlock: function(block) {
            $(block).remove();
        },

        moveTaggingBlock: function(config, x, y) {
            config.$tagger.css({
                'left': x,
                'top': y
            });
        },

        addTaggingBlockTemp: function(event, config) {
            var $taggingBlock = $("<div></div>")
                .addClass("tagging-block-temp")
                .css({
                    'left': (event.offsetX - config.taggingBlockOffset),
                    'top': (event.offsetY - config.taggingBlockOffset)
                });
            config.$img.append($taggingBlock);
            imgTagger.$friendsList.appendTo($taggingBlock).slideDown("fast");
            imgTagger.tagFriend($taggingBlock);
        },

        populateFriendsList: function(config) {
            var $friendsList = $("<ul></ul>").addClass("friends-list");
            config.friends.forEach(function(element) {
                var $li = $("<li></li>");
                var $a = $("<a></a>")
                    .attr("href", "#");
                $li.html($a);
                $a.text(element);
                $friendsList.append($li);
            });
            return $friendsList;
        },

        tagFriend: function($element) {
            var $friends = $element
                .find("ul.friends-list li a");
            $friends.click(function(event) {
                event.preventDefault();
                $element.slideUp("slow");
            });
        }

    };

    $(document).ready(function() {
        formValidator.init();
        dropdown.init();
        imgTagger.init();
    });
}());
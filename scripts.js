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
                $passNotification.html("Password does not match!");
            } else {
                $passNotification.html("");
            }
        },

        validateInput: function($formInputs) {
            $formInputs.each(function(i, inputField) {
                var $inputField = $(inputField);
                var $inputError = $inputField.siblings(".input-error");
                if ($inputField.val().length > $inputField.attr("data-max-length")) {
                    $inputField.addClass("input-error-highlight");
                    $inputError.text("Error: Exceeded character limit for field");
                }
            })
        }
    };

    var dropdown = {
        init: function() {
            dropdown.config = {
                $menu: $("ul"),
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
                $img: $("img#img-tagger-main")
                // Likely needed:
                // Mouse Position
                // Blank "tagger" block"
                // list of names
            };
            imgTagger.setup(imgTagger.config);
        },

        setup: function(config) {
            config.$img.hover(function(event) {
                var self = this;
                imgTagger.pollMouse(self, event);
            });
            config.$img.mouseleave(function() {
                console.log("mouseleave TRIGGERED");
                clearInterval(imgTagger.pollInterval);
            });
        },

        pollMouse: function(self, event) {
            imgTagger.pollInterval = setInterval(function() {
                var parentOffset = $(self).parent().offset();
                var relativeX = event.pageX - parentOffset.left;
                var relativeY = event.pageY - parentOffset.top;
                // console.clear();
                console.log(relativeX);
                console.log(relativeY);
            }, 500);
        }
            // 1. Detect mouse entering image
            // 2. var taggingBlock (DOM div.imgtagger-hover) appears around mouse.
            // 3. if Click on img:
            //      -Create DOM div.imgtagger-active using .position(), slide out UL>LI*4 with names (.imgtagger-friends)
            // 4. Create listener, anytime .imgtagger-friends name selected, imgtagger-hover.removeClass(imgtagger-active) and this.addClass(imgtagger-placed)
            //          -also, add dom element <div> with name of friend, position() + offset
            // 4. if mouseleave or click outside of img:
            //      -delete imgtagger-hover and imgtagger-placed and imgtagger-placed.siblings("imgtagger-friends")

    };

    $(document).ready(function() {
        formValidator.init();
        dropdown.init();
        imgTagger.init();
    });
}());
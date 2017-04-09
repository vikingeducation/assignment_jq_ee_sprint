(function init() {
    "use strict";

    $(document).ready(function() {
        var checkInputLength = function($inputField, maxLength, self) {
            var inputLength = $(self).val().length;
            var remaining = maxLength - inputLength;
            var $inputNotification = $(self).next(".input-notification");
            if (inputLength) {
                $inputNotification.text("Remaining Characters: " + remaining);
            } else {
                $inputNotification.text("");
            }
        };

        var attachListener = function($inputField, maxLength) {
            $inputField.keyup(function () {
                var self = this;
                checkInputLength($inputField, maxLength, self);
            });
        };

        var config = {
            maxFormLengths: [32, 140, 16, 16]
        };

        var $formInputs = $("form *").filter(":input");

        $formInputs.each(function(i, inputField) {
            attachListener($(inputField), config.maxFormLengths[i]);
        });

        var $passInputs = $("form *").filter(":password");
        var $password = $passInputs.first();
        var $confirmPassword = $passInputs.last(); 
        var $passNotification = $passInputs.first().prev(".pass-warning");

        $passInputs.last().keyup(function() {
            if ($confirmPassword.val().length === 0) {
                $passNotification.html("");
            } else if ($password.val() !== $confirmPassword.val()) {
                $passNotification.html("Password does not match!");
            } else {
                $passNotification.html("");
            }
        });

        $("#form-submit").click(function(event) {
            event.preventDefault();
        });
    });
}());
"use strict";

$(document).ready(function () {
    //Form
    $("form[name='form1']").validate({
        rules: {
            username: {
                required: true,
                minlength: 4,
                maxlength: 32
            }
            psw: {
                required: true,
                minlength: 6,
                maxlength: 16
            }
        },
        messages: {
            username: "Username",
            psw: {
                required: "Password",
                minlength: "Minimum length"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    //Dropdown
    $("main.drop").find('div.menu').hide();
    $("main.drop").hover(function () {
        $(this).find('div.menu').slideToggle();
    });
});

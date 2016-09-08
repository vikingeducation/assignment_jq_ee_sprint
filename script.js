var colorClass = function(node, matching) {
    if (matching) {
        if (node.hasClass('red')) {
            node.toggleClass('red');
        }
        if (!node.hasClass('green')) {
            node.toggleClass('green');
        }
    } else {
        if (!node.hasClass('red')) {
            node.toggleClass('red');
        }
        if (node.hasClass('green')) {
            node.toggleClass('green');
        }
    }
}

$(document).ready(function() {
    $('.error-message').hide();
    $('.counted').keyup(function(e) {
        var $target = $(e.target);
        var type = $target.attr('type');
        var value = $target.val().length;
        var vals = {
            'text': 32,
            'ta': 140,
            'password': 16
        }
        var remainder = vals[type] - value;
        if (value === 0) {
            $target.next().hide();
        } else {
            $target.next().show();
            $target.next().text(remainder);
        }
    });

    $('.confirmation').keyup(function(e) {
        var $target = $(e.target);
        var $matching = $('.matching');
        var pass = $('#pass1').val();
        var conf = $target.val();
        if (!conf) {
            $matching.hide();
        } else {
            $matching.show();
            if (pass === conf) {
                colorClass($matching, true);
                $matching.text('matches!')
            } else {
                colorClass($matching, false);
                $matching.text("doesn't match :(")
            }
        }
    });

    $('.submit').click(function(e) {
        var textVal = $('#text1');
        var taVal = $('#ta1');
        var passVal = $('#pass1');
        var confVal = $('#pass2');
        var valueArray = [textVal, taVal, passVal, confVal];
        var validArray = [[4, 32],[4, 140],[6, 16],[6, 16]];
        for (var i = 0; i < validArray.length; i++) {
            if (valueArray[i].val().length < validArray[i][0]) {
                e.preventDefault();
                valueArray[i].addClass("error");
                valueArray[i].next().next().show().text("Field is too short.");
            } else if (valueArray[i].val().length > validArray[i][1]) {
                e.preventDefault();
                valueArray[i].addClass("error");
                valueArray[i].next().next().show().text("Field is too long.");
            }
        };

    });
})








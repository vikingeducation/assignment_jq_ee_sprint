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
})

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
    $('.my-drop-choices').hide();
    $('#target-box').hide();
    $('.waldo-drop-choices').hide();
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
        if (passVal.val() !== confVal.val()) {
            e.preventDefault();
        };

    });

    $('.my-drop-box').click(function(e) {
        $choices = $('.my-drop-choices');
        if ($choices.css('display') !== 'none') {
            $choices.slideUp();
        } else {
            $choices.slideDown();
        }
    });

    $('.my-drop-choice').click(function(e) {
        $target = $(e.target);
        $otherSelected = $('.selected');
        $otherSelected.removeClass('selected');
        $target.addClass('selected');
        $choices = $('.my-drop-choices');
        $dropBox = $('.my-drop-box');
        $dropBox.text($target.text());
        $choices.slideUp();
    });

    // $('.waldo-pic').mouseleave(function(e) {
    //     $('#target-box').hide();
    // };

    var moveMouse = function() {
        $('.waldo-container').mousemove(function(e) {
        $target = $(e.target);
        $('#target-box').show();
        $('#target-box').css({
            left:  e.pageX,
            top:   e.pageY
            })
        })
    };

    moveMouse();

    var moveSwitch = true;

    var toggleMove = function() {
        if (moveSwitch) {
            $('.waldo-container').off("mousemove");
        } else {
            moveMouse();
        }
    };

    $('.waldo-container').click(function(e) {
        toggleMove();
        moveSwitch = !moveSwitch
        $choices = $(".waldo-drop-choices");
        if ($choices.css('display') === 'none') {
            $choices.css({
                left:  e.pageX,
                top:   e.pageY += 50
            });
            $choices.slideDown();
        } else {
            $choices.slideUp();
        }
    });

    var createBox = function() {
        var tLeft = $('#target-box').css( 'left' );
        var tTop = $('#target-box').css( 'top' );
        var box = $('<div>').css({
            left: tLeft,
            top: tTop,
            position: 'absolute',
            width: '50px',
            height: '50px',
            border: '2px solid green',
        }).addClass('new-box')
        return box;
    };

    var createX = function() {

    };

    $('.waldo-drop-choice').click(function(e) {
        $target = $(e.target);
        var newBox = createBox();
        $('.waldo-container').append(newBox);
        console.log(newBox.css('left'));
        $(newBox).append($target);
        $(newBox).append($('<a href="#" class="x">x</a>'));
    });

    $('.waldo-container').on('click', '.x', function(e) {
        e.preventDefault();
        console.log("IT RUNS!");
        $target = $(e.target);
        $('.waldo-drop-choices').append($target.prev());
        $target.parent().remove();
        return false;
    });
})


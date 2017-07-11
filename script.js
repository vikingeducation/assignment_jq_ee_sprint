
$(document).ready(function() {

var alerts = {
  usernameCounter: $(".username-counter"),
  aboutCounter: $(".about-counter"),
  passwordCounter: $(".password-counter"),
  passwordConfirmCounter: $(".password-confirm-counter"),
  passwordMatch: $(".password-match-alert")
};

var formInputs = {
  form: $(".form1"),
  username: $(".username"),
  aboutMe: $(".about-me"),
  password: $(".password"),
  passwordConfirm: $(".password-confirm"),
  submit: $(".submit")
};

var alertsFunctions = {
  usernameCounterF: function() {
    var val = formInputs.username.val();
    if (val.length === 0) {
      alerts.usernameCounter.html("");
    }
    else {
    alerts.usernameCounter.html(32 - val.length)
    }
  },

  aboutCounterF: function() {
    var val = formInputs.aboutMe.val();
    if (val.length === 0) {
      alerts.aboutCounter.html("");
    }
    else {
    alerts.aboutCounter.html(140 - val.length)
    }
  },

  passwordCounterF: function() {
    var val = formInputs.password.val();
    if (val.length === 0) {
      alerts.passwordCounter.html("");
    }
    else {
      alerts.passwordCounter.html(16 - val.length)
    }
  },

  passwordConfirmCounterF: function() {
    var val = formInputs.passwordConfirm.val();
    if (val.length === 0) {
      alerts.passwordConfirmCounter.html("");
    }
    else {
    alerts.passwordConfirmCounter.html(16 - val.length)
    }
  },

  passwordConfirmMatch: function() {
    var val = formInputs.passwordConfirm.val();
    var val2 = formInputs.password.val();
    if (val === val2 || val.length === 0) {
      alerts.passwordMatch.html("");
    }
    else {
      alerts.passwordMatch.html("Password does not match...");
    }
  },

  formSubmitCheck: function() {
    var valL = formInputs.username.val().length;
    var valL2 = formInputs.aboutMe.val().length;
    var valL3 = formInputs.password.val().length;
    var valL4 = formInputs.passwordConfirm.val().length;
    var val = formInputs.passwordConfirm.val();
    var val2 = formInputs.password.val();
    if ((valL > 3 && valL < 33) && (valL2 > 3 && valL2 < 141) && (valL3 > 5 && valL3 < 17) && (val === val2)) {
      window.location.href="http://localhost:3000/";
    }
    else {
      if (valL < 4 || valL > 32) {
        alerts.usernameCounter.html("Must be 4-32 characters.");
      }
      if (valL2 < 4 || valL2 > 140) {
        alerts.aboutCounter.html("Must be 4-140 characters.");
      }
      if (valL3 < 6 || valL3 > 16) {
        alerts.passwordCounter.html("Must be 6-16 characters.");
      }
      if (!(val === val2)) {
        alerts.passwordMatch.addClass("error");
        formInputs.passwordConfirm.addClass("error");
      }
    }
  }

};

function formResponse() {
formInputs.form.on("input", "input[class='username']", function() {alertsFunctions.usernameCounterF()});
formInputs.form.on("input", "textarea[class='about-me']", function() {alertsFunctions.aboutCounterF()});
formInputs.form.on("input", "input[class='password']", function() {alertsFunctions.passwordCounterF(); alertsFunctions.passwordConfirmMatch()});
formInputs.form.on("input", "input[class='password-confirm']", function() {alertsFunctions.passwordConfirmCounterF(); alertsFunctions.passwordConfirmMatch()});
formInputs.submit.on("click", function() {event.preventDefault(); alertsFunctions.formSubmitCheck();});
};

formResponse();


var items = {
  selectButton: $(".select-button"),
  firstLi: $(".first-li"),
  subLi: $(".sub-li")
};

function menuSlide() {
  items.subLi.slideDown(1000);
};

function menuSelect() {
  var sel = event.target.innerHTML;
  items.firstLi.html(sel);
  items.subLi.slideUp(500);
};

function activateMenu() {
items.subLi.slideUp(1);
items.selectButton.on("click", function() {menuSlide()});
items.subLi.on("click", function(){menuSelect()});
};

activateMenu();


var ib = 1;
var createdBoxes = {};

var queries = {
  imgDiv: $(".photo-div"),
  img: $(".photo"),
  taggingBoxes: $(".tagging-boxes"),
  taggingBox: $(".tagging-boxes-" + ib.toString()),
  taggingMenu: $(".tagging-boxes-" + ib.toString()).children(),
  taggingOptions: $(".tagging-boxes-" + ib.toString()).children().children().not("li:first"),
  taggingChoice: $(".tagging-boxes-" + ib.toString()).children().children().first(),
  button: $("button"),
};


var taggingFunctions = {
  createBox: function() {
    var bClassN = ib.toString();
    var bClass = "tagging-boxes-" + bClassN;
    var newBox = "<div class='tagging-boxes'><ul class='tagging-options'><li class='tag-first-li'></li><span class='tag-li'><li>John Doe</li><li>Jane Doe</li><li>Jimmy Doe</li></span></ul></div>";
    queries.img.prepend(newBox);
    createdBoxes[ib.toString()]=true;
    queries.taggingBoxes = $(".tagging-boxes");
    queries.taggingBoxes.first().addClass(bClass);
  },
  tagBoxMove: function(event) {
    queries.taggingBox = $(".tagging-boxes-" + ib.toString());
    queries.taggingBox.show();
    queries.taggingBox.children().css({display: "none"})
    var offset = queries.img.offset();
    var maxY = offset.top + queries.img.height() - (queries.taggingBox.height()/2) - 18;
    var maxX = offset.left + queries.img.width() - (queries.taggingBox.width()/2) - 13;
    var minY = offset.top + (queries.taggingBox.height()/2) - 5;
    var minX = offset.left + (queries.taggingBox.width()/2) - 5;
    var yPos = event.pageY - offset.top - (queries.taggingBox.height()/2);
    var xPos = event.pageX - offset.left - (queries.taggingBox.width()/2);
    if ((event.pageY <= maxY && event.pageY > minY) && (event.pageX <= maxX && event.pageX > minX)) {
      queries.taggingBox.css({border: "8px solid red", left: xPos, top: yPos});
    }
  },
  tagBoxStay: function() {
    queries.taggingBox = $(".tagging-boxes-" + ib.toString());
    var offset = queries.img.offset();
    var maxY = offset.top + queries.img.height() - (queries.taggingBox.height()/2) - 18;
    var maxX = offset.left + queries.img.width() - (queries.taggingBox.width()/2) - 13;
    var minY = offset.top + (queries.taggingBox.height()/2) - 5;
    var minX = offset.left + (queries.taggingBox.width()/2) - 5;
    var yPos = event.pageY - offset.top - (queries.taggingBox.height()/2);
    var xPos = event.pageX - offset.left - (queries.taggingBox.width()/2);
    if ((event.pageY <= maxY && event.pageY > minY) && (event.pageX <= maxX && event.pageX > minX)) {
      queries.taggingBox.css({border: "8px solid yellow", left: xPos, top: yPos});
    }
    else {
      queries.taggingBox.css({border: "8px solid yellow"});
    }
    queries.img.off("mouseleave");
    queries.img.off("click");
  },
  menuDrop: function() {
    queries.taggingMenu = $(".tagging-boxes-" + ib.toString()).children();
    console.log(queries.taggingMenu);
    queries.taggingMenu.show();
    queries.taggingMenu.children().first().show();
    queries.taggingMenu.children().children().show();
    queries.img.one("click", function(){tagging();});
  },
  tagPerson: function() {
    queries.taggingChoice = $(".tagging-boxes-" + ib.toString()).children().children().first();
    queries.taggingOptions = $(".tagging-boxes-" + ib.toString()).children().children().not("li:first");
    queries.taggingMenu.children().one("click", function(event) {event.stopPropagation(); queries.taggingChoice.html(event.target.innerHTML); queries.taggingOptions.slideUp(100); ib++;});
  },
}

function tagging() {
  var ibS = ib.toString();
  if (!(createdBoxes[ibS])) {
    queries.img.one("mousemove", function() {taggingFunctions.createBox();});
    queries.taggingBox = $(".tagging-boxes-" + ib.toString());
    queries.img.on("mousemove", function() {taggingFunctions.tagBoxMove(event);});
    queries.img.one("click", function() {queries.img.off("mousemove"); taggingFunctions.tagBoxStay(); taggingFunctions.menuDrop(); taggingFunctions.tagPerson();});
    queries.img.on("mouseleave", function() {queries.taggingBox.hide();});
  }
  else {
    queries.img.on("mousemove", function() {taggingFunctions.tagBoxMove(event);});
    queries.img.one("click", function() {queries.img.off("mousemove"); taggingFunctions.tagBoxStay(); taggingFunctions.menuDrop(); taggingFunctions.tagPerson();});
  }
}


tagging();
queries.button.on("click", function(){tagging()})


});

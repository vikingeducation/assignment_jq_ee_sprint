var formHandlers = {

  init: function() {

    var textFields = {
      elements: $("input[type='text']"),
      minLength: 4,
      maxLength: 32
    };

    var textAreas = {
      elements: $("textarea"),
      minLength: 4,
      maxLength: 140
    };

    var passwordFields = {
      elements: $("input[type='password']"),
      minLength: 6,
      maxLength: 16
    };

    formHandlers.addCounter([textFields, textAreas, passwordFields]);
    formHandlers.removeCounter([textFields, textAreas, passwordFields]);
    formHandlers.updateCounter([textFields, textAreas, passwordFields]);
    formHandlers.passwordCaption(passwordFields);
    
    $("input[type='submit']").click( function(event) {
      lengthsOk = formHandlers.validateLength([textFields, textAreas, passwordFields]);
      passwordOk = formHandlers.confirmPassword(passwordFields)
      if (!(lengthsOk && passwordOk)) event.preventDefault();
    })

  },

  hasCaption: function(element) {
    if ($(element).next().hasClass("caption")) return true;
    return false;
  },

  addCaption: function(element) {
    if (!formHandlers.hasCaption(element) && element.value.length > 0) {
      var $caption = $("<div>").addClass("caption");
      $(element).after($caption);
    };
  },

  removeCaption: function(element) {
    if (element.value.length === 0 && formHandlers.hasCaption(element)) {
      $(element).next().remove();
    };
  },

  addCounter: function(fields) {
    fields.forEach( function(field) {
      field.elements.each( function(index, element) {
        $(element).keyup( function(event) {
          formHandlers.addCaption(element);
        });
      });
    });
  },

  removeCounter: function(fields) {
    fields.forEach( function(field) {
      field.elements.each( function(index, element) {
        $(element).keyup( function(event) {
          formHandlers.removeCaption(element);
        });
      });
    });
  },

  updateCounter: function(fields) {
    fields.forEach( function(field) {
      field.elements.each( function(index, element) {
        $(element).keyup( function(event) {
          var text = formHandlers.captionText(element, field);
          var $caption = $(element).next();
          $caption.html(text);
        });
      });
    });
  },

  captionText: function(element, field) {
    var length = element.value.length;
    if (length > 0) {
      if (length < field.minLength) {
        return "Value is too short.";
      } else if (length > field.maxLength) {
        return "Value is too long.";
      } else {
        var numChars = field.maxLength - length;
        return `${numChars} characters left.`;
      };
    };
  },

  passwordCaption: function(passwordFields) {
    var passField = passwordFields.elements[0];
    var confirmField = passwordFields.elements[1];
    $(confirmField).keyup( function(event) {
      formHandlers.addCaption(confirmField);
      formHandlers.removeCaption(confirmField);
      var length = confirmField.value.length;
      if (length > 0) {
        $caption = $(confirmField).next();
        if (passField.value === confirmField.value) {
          $caption.html("");
        } else {
          $caption.html("Must match password.");
        };
      };
    });
  },

  validateLength: function(fields) {
    var flag = true;
    fields.forEach( function(field) {
      field.elements.each( function(index, element) {
        var length = element.value.length
        if (!(length >= field.minLength && length <= field.maxLength)) {
          $(element).removeClass("error")
                    .addClass("error");
          flag = false;
        } else {
          $(element).removeClass("error");
        }
      });
    });
    return flag;
  },

  confirmPassword: function(passwordFields) {
    var passField = passwordFields.elements[0];
    var confirmField = passwordFields.elements[1];
    if (passField.value === confirmField.value &&
        confirmField.value.length > 0) {
      $(confirmField).removeClass("error");
      return true;
    } else {
      $(confirmField).removeClass("error")
                     .addClass("error");
      return false;
    };
  }

};

$(document).ready(function() {
  formHandlers.init();
});

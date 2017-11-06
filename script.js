
class Counter {
  constructor($target, maxChar) {
    this.$target = $target;
    this.maxChar = maxChar; 
    this.id = $target.parent().attr("id");
  }

  charRemaining() {
    return this.maxChar - this.$target.val().length;
  }

  addCounter() {
    $('<p></p>', {'class':'counter'}).insertAfter(this.$target);
    console.log(this.id);
    this.$target.on("input", (event) => {
      let $counter = $(`#${this.id} .counter`);
      $counter.text(this.charRemaining() + " characters remaining");
      if (this.charRemaining() === this.maxChar) $counter.text("");
    });
  }
}

class Confirmer {
  constructor($password, $confirmer) {
    this.$password = $password;
    this.$confirmer = $confirmer;
  }
 
  verifyConfirm() {
    return this.$confirmer.val() === this.$password.val().slice(0, this.$confirmer.val().length);
  } 
 
  addConfirmer() {
    this.$confirmer.on("input", (event) => {
      if (!this.verifyConfirm()) {
        $('#confirm .counter').text("Passwords do not match");
      }
    });
  }
  
}

class FieldErrorHandler {
  constructor($target, minChar) {
    this.$target = $target;
    this.minChar = minChar;
    this.id = $target.parent().attr("id");
  }

  throwError() {
    return this.$target.val().length < this.minChar
  }

  addHandler() {
    $('input[type = "submit"]').on("click", (event) => {
      if (this.throwError()) {
        $('<p></p>', {'class':'error'}).insertAfter(this.$target);
        let $error = $(`#${this.id} .error`);
        $error.text(`You need at least ${this.minChar} characters`);
        this.$target.css("background-color", "red");
      }
    });
  }
}

const MAXCHARS = {name:32, address:140, password:16, confirm:16};
const MINCHARS = {name:4, address:4, password:6, confirm:6};

$(document).ready(function() {

  $('.input').each(function(idx, el) {
    let maxLength = MAXCHARS[$(el).parent().attr("id")];
    let minLength = MINCHARS[$(el).parent().attr("id")];

    $(el).attr("maxlength", maxLength); 

    let counter = new Counter($(el), maxLength);
    counter.addCounter();

    let fieldHandler = new FieldErrorHandler($(el), minLength); 
    fieldHandler.addHandler();
  });

  let confirmer = new Confirmer($('#password input'), $('#confirm input'));
  confirmer.addConfirmer();  

  $('form').submit(function(e) {
     e.preventDefault();
   });

});


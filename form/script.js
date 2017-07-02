var dropHandler = {
  init: function() {
    dropHandler.setupDropdowns();
    $('.dropdown').on('click', 'li', dropHandler.handleSelection);
  },

  setupDropdowns: function() {
    let $dropdowns = $('.dropdown');
    $dropdowns.each(function(index, element) {
      // add blank list item to the top of the list
      let $topItem = $('<li>')
        .append($('<label>'));
      dropHandler.selectItem($topItem);
      $(element).prepend($topItem);

      // add hidden form element for submission
      let $input = $('<input>')
        .attr('type', 'hidden');
      $(element).parent()
        .append($input);
    })
  },

  selectItem: function($item) {
    $item.addClass('selected');
    // add dropdown arrow
    $item.append(
      $('<strong>')
        .text('v')
    );

    // update hidden input
    let selectedValue = $item
      .children('label')
      .text();

    let formSubmission = $item
      .closest('.dropdown')
      .siblings('input');

    $(formSubmission).val(selectedValue);
  },

  deselectItems: function($items) {
    let $selected = $items.filter('.selected');
    $.each($selected, function(index, item) {
      $(item)
        .removeClass('selected');
      $(item)
        .children('strong')
        .slideUp(function() {
          this.remove();
        })
    })
  },

  handleSelection: function(event) {
    let $clicked = $(event.currentTarget);
    let $list = $(event.delegateTarget);
    let $items = $list.children('li');

    dropHandler.deselectItems($items);

    if ($list.hasClass('open')) {
      // handle selection
      dropHandler.selectItem($clicked);
      $items
        .not('.selected')
        .each(function(index, element) {
          $(element).slideUp();
        });
      
    } else {
      // open list
      $items.each(function(index, element) {
        if (index === 0) {
          dropHandler.selectItem($(element));
        }
        $(element).slideDown(function() {
          $(element).css('display', 'flex')
        });
      });
    };
    $list.toggleClass('open');
  },


}


var validateForm = {
  init: function() {
    // listen to elements that want to be validated
    $('body').on('keyup', '.validate', validateForm.validate);

    // add labels to them
    validateForm.addLabels();

    // listen for validation submission
    $('body').on('click', '.validate-submit', validateForm.submit);
  },

  addLabels: function() {
    // iterate over appropriate elements
    $('.validate').each(function(index, element) {
      // jQuery-ify
      let $target = $(element);

      // grab their id
      let id = $target.attr('id');

      // build them a label
      let $label = $('<strong>')
        .addClass('input-feedback')
        .attr('for', id);

      // insert it
      $label.insertAfter($target);
    });

  },

  submit: function(event) {
    event.preventDefault();

    // iterate over all of the labels
    $('.input-feedback').each(function(index, element) {
      let $label = $(element)

      // if they have a message
      if ($label.text()) {
        
        // highlight the label
        $label.addClass('warning');

        // highlight the element
        let inputId = '#' + $label.attr('for');
        let $input = $(inputId);
        $input.addClass('warning');
      }
    })
  },

  validate: function(event) {
    // validate our target
    let $target = $(event.target);
    validateForm.validateElement($target);

    // validate matching elements
    selector = '[matches="#' + $target.attr('id') + '"]';
    validateForm.validateElement($(selector))

  },

  validateElement: function($target) {
    // what do we need to validate?
    let validations = validateForm.getValidations($target);

    // validate
    let status = $.map(validations, function(check) {
      return check($target);
    });
    
    // apply status to labels
    validateForm.applyStatus($target, status);
  },

  applyStatus: function($target, status) {
    // grab the appropriate label
    let id = $target.attr('id')
    let $label = $target
      .siblings('.input-feedback')
      .filter(function(index, element) {
        return $(element).attr('for') === id;
      });

    // set yo status
    $label.text(status.join(' ,'));

    // clear submit status
    $target.removeClass('warning');
    $label.removeClass('warning');
  },

  getValidations: function($target) {
    // check element for special attributes, add validations as appropriate
    let validations = []
    let validators = {
      'min-length': validateForm.minLength,
      'max-length': validateForm.maxLength,
      'matches': validateForm.match
    }
    for (let attribute in validators) {
      if ($target.attr(attribute)) {
        validations.push(validators[attribute]);
      }
    }
    return validations;
  },

  minLength: function($target) {
    let minimum = $target.attr('min-length')
    let actual = $target.val().length
    let message = null;
    if (actual && (actual < minimum)) {
      message = `${minimum - actual} characters short`;
    }
    return message;
  },

  maxLength: function($target) {
    let maximum = $target.attr('max-length')
    let actual = $target.val().length
    let message = null;
    if (actual && (actual > maximum)) {
      message = `${actual - maximum} characters long`;
    }
    return message;
  },

  match: function($target) {
    let toMatch = $target.attr('matches');
    let matchValue = $(toMatch).val();
    let actual = $target.val();
    let message = null;
    if (actual && (actual !== matchValue)) {
      message = 'Passwords differ'
    }
    return message;
  }

}


$(
  function() {
    dropHandler.init();
    validateForm.init();
  }
)

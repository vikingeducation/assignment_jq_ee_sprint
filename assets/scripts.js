'use strict'

$(document).ready( () => {

  /**
   * THE FORM VALIDATION
   */
  const formObj = {

    // Max character lengths
    TEXT_FIELD_MAX: 32,
    TEXT_AREA_MAX: 140,
    PASSWORD_MAX: 16,

    getRemainingChars ( inputType, strLen ) {

      // Check type of input
      if ( inputType === 'text') {
        return formObj.TEXT_FIELD_MAX - strLen;
      } else if ( inputType === 'textarea' ) {
        return formObj.TEXT_AREA_MAX - strLen;
      } else {
        return formObj.PASSWORD_MAX - strLen;
      }
    },

    displayRemaining ( eventTarget, remainingChars ) {

      // Update span content
      eventTarget
        .next()
        .first()
        .html(`Remaining characters: ${ remainingChars }`);

      // Display span
      eventTarget
        .next()
        .attr( 'class', 'show' );
    },

     inputHandler ( eventObject ) {

      // get event target
      let eventTarget = $( eventObject.target ).first();

      // get input type
      let inputType = eventTarget[0].type;  

      // get string length
      let strLen = eventTarget
        .val()
        .length;

      // get remaining characters 
      let remainingChars = formObj.getRemainingChars( inputType, strLen );

      // display remaining chars if not empty
      if ( strLen > 0 ) {
        formObj.displayRemaining ( eventTarget, remainingChars );
      } else {
        // hide if empty
        eventTarget
          .next()
          .attr( 'class', 'hidden' );
      }
    },

    displayError ( eventObject, errorMsg ) {
      $( eventObject )
        .next()
        .next()
        .text( errorMsg )
        .attr( 'class', 'show' )
        .addClass( 'error' );
    },

    clearError ( eventObject ) {
      $(eventObject)
        .next()
        .next()
        .attr( 'class', 'hidden' );
    },

    passwordChecker ( eventObject ) {

      // get first password
      let firstPass = $( eventObject.target )
        .parent()
        .prev()
        .children()
        .eq( 1 ) 
        .val();

      // get second password
      let secondPass = $( eventObject.target )
        .first()
        .val();

      // compare values
      if( ( secondPass.length !== 0 ) && ( firstPass !== secondPass )){
        // display error
        formObj.displayError( eventObject.target, `Passwords don\'t match!` );
      } else {
        // clear error
        $( eventObject.target )
          .next()
          .next()
          .text('')
          .attr( 'class', 'hidden' );
      }

    },

    countChecker ( textObject, min, max ) {
      // get text length
      let textLength = textObject
        .first()
        .val()
        .length;

      // check if between min and max counts
      if( (textLength >= min) && (textLength <= max) ){
        //clear any existing error
        formObj.clearError( textObject );
      } else {
        // display error
        formObj.displayError( $(textObject), `Input must be between ${min} and ${max} characters` );
      }
    },

    submitChecker ( eventObject ) {

      eventObject.preventDefault();

      // Check name
      formObj.countChecker( $( '#name' ), 4, formObj.TEXT_FIELD_MAX );

      // Check message
      formObj.countChecker( $( '#message' ), 4, formObj.TEXT_AREA_MAX );

      // Check passwords
      formObj.countChecker( $( '#password' ), 6, formObj.PASSWORD_MAX );
      formObj.countChecker( $( '#cpassword' ), 6, formObj.PASSWORD_MAX );
    }

  };

  /**
   * THE DROPDOWN
   */
  const dropdownObj = {

    updateFirstLI ( eventObject, text ) {
      // Get first LI
      let firstLI  = $( eventObject.target )
        .parent()
        .children()
        .first();

      // Change inner HTML
      firstLI.html( `${text}<span class="arrow">&#x25BC;</span>` );
    },

    openMenu ( eventObject ) {
      // Get selection text
      let innerText = $(eventObject.target)
        .text();

      // Toggle menu
      $(eventObject.target)
        .parent()
        .children('.hidden')
        .slideToggle(300);
      
      // If target is not first LI
      if($(eventObject.target).attr('class') === 'hidden'){
        dropdownObj.updateFirstLI( eventObject, innerText );
      }

    }

  };

  /**
   * THE PHOTO TAGGING BOX
   */
  const phototagObj = {
    heroes: ['Black Widow', 'Nick Fury', 'Iron Man', 'The Hulk', 'Captain America',
      'Thor', 'Hawkeye'],

    clickTag ( eventObject ) {
      // Get containing div
      let div = $( eventObject.target )
        .parent();

      // Construct box
      let box = $('<div>')
        .addClass('tag-box')
        .css({
          'left': (eventObject.pageX - eventObject.data.left - 50) + 'px',
          'top': (eventObject.pageY - eventObject.data.top - 50) + 'px'
        });

      // Display dropdown
      let dropdown = $('<ul>');

      // Fill dropdown with names
      phototagObj.heroes.forEach( hero => {
        let listItem = $('<li>')
          .text(hero);

        dropdown.append(listItem); 
      });

      // Add dropdown to box
      box.append( dropdown );

      // Add box to div
      div.append( box );
    },

    updatePosition ( eventObject ) {
      // Update position
      // -50px is to center the box around the cursor
      $( '.hover-box' )
      .css({
        'left': (eventObject.pageX - eventObject.data.left -50) + 'px',
        'top': (eventObject.pageY - eventObject.data.top -50) + 'px'
      });

    },

    showBox ( eventObject ) {
      // Get containing div
      let div = $( eventObject.target )
        .parent();

      // Get photo offset
      let offset = $('img').offset();

      // Construct box
      let box = $('<div>')
        .addClass('hover-box');

      // Add box to div
      div.append( box );

      // Follow mouse
      $( 'img' ).on( 'mousemove', offset, phototagObj.updatePosition );

      // Tag on click
      $( 'img' ).click( offset, phototagObj.clickTag );
    },

    removeBox( eventObject ) {
      // Get container div
      let div = $( eventObject.target )
        .parent();

      // Remove box
      div.find( '.hover-box' ).remove();
    }

  };

  const eventHandlers = {
    init () {
      /*
       * Form validation
       */
      // Text input event
      $( '.input' ).on( 'keyup', formObj.inputHandler );
      // Password input event
      $( '#cpassword' ).on( 'keyup', formObj.passwordChecker );
      // Submit event
      $( '#validator' ).click( formObj.submitChecker );

      /*
       * Dropdown effects
       */
      $( '#menu' ).click( dropdownObj.openMenu );

      /*
       * Phototagging effects
       */
      $( 'img' ).hover( phototagObj.showBox, phototagObj.removeBox );

    }

  };
  
  /**
   * Register event handlers
   */
  eventHandlers.init();

});

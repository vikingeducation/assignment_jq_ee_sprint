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
        [0]
        .innerHTML = `Remaining characters: ${ remainingChars }`; 

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
      let strLen = eventTarget[0]
        .value
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
        [0]
        .value;

      // get second password
      let secondPass = $( eventObject.target )
        [0]
        .value;

      // compare values
      if( ( secondPass.length !== 0 ) && ( firstPass !== secondPass )){
        // display error
        formObj.displayError( eventObject.target, `Passwords don\'t match!` );
      } else {
        // clear error
        $( eventObject.target )
          .next()
          .next()
          .attr( 'class', 'hidden' );
      }

    },

    countChecker ( textObject, min, max ) {
      // get name length
      let textLength = textObject
        [0]
        .value
        .length;

      // check if between 4-32 characters
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
      formObj.countChecker( $( '#name' ), 4, 32 );

      // Check message
      formObj.countChecker( $( '#message' ), 4, 140 );

      // Check password
      formObj.countChecker( $( '#password' ), 6, 16 );
    }

  };

  /**
   * THE DROPDOWN
   */
  const dropdownObj = {

    updateFirstLI ( eventObject, text ) {
      let firstLI = $( eventObject.target )
        .parent()
        .children()
        [0];

      firstLI.innerHTML = `${text}<span class="arrow">&#x25BC;</span>`;
    },

    openMenu ( eventObject ) {
      // get selection text
      let innerText = $(eventObject.target)
        .first()
        [0]
        .innerText;

      // Toggle menu
      $(eventObject.target)
        .parent()
        .children('.hidden')
        .slideToggle(300);
      
      // If select is not first LI
      if($(eventObject)[0].target.className === 'hidden'){
        dropdownObj.updateFirstLI( eventObject, innerText );
      }
    }

  };

  /**
   * THE PHOTO TAGGING BOX
   */
  const phototagObj = {

  };

  const eventHandlers = {
    init () {
      /**
       * Form validation
       */
      // Text input event
      $('.input').on( 'keyup', formObj.inputHandler );
      // Password input event
      $( '#cpassword' ).on( 'keyup', formObj.passwordChecker );
      // Submit event
      $( '#validator' ).click( formObj.submitChecker );

      /**
       * Dropdown effects
       */
      $('#menu').click( dropdownObj.openMenu );

      /**
       * Phototagging effects
       */

    }

  };
  
  /**
   * Register event handlers
   */
  eventHandlers.init();

});

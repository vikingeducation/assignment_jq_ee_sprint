'use strict'

$(document).ready( () => {
 
  /**
   * THE FORM VALIDATION
   */
  const formObj = {

    remainingChars ( $target, strLen ) {
      // Get max
      let max = $target.data( 'max' );

      return max - strLen;
    },

    updateCount ( e, chars ) {
      // Update span content 
      e
        .next( '.js-counter' )
        .html(`Remaining characters: ${ chars }`)
    },

     inputHandler ( e ) {

      // get event target
      let $target = $( this );

      // get string length
      let strLen = $target
        .val()
        .length;

      if ( strLen > 0 ) {
        // Get remaining chars
        let remainingChars = formObj.remainingChars( $target, strLen );

        // Display remaining
        formObj.updateCount ( $target, remainingChars );

        $target
          .next( '.js-counter' )
          .removeClass('hidden')
          .addClass('show');

      } else {
        // hide if empty
        $target
        .next( '.js-counter' )
        .removeClass('show')
        .addClass('hidden');
      }
    },

    displayError ( e , errorMsg ) {
      $( e )
        .siblings('.error')
        .text( errorMsg )
        .removeClass('hidden')
        .addClass( 'show' );
    },

    clearError ( e ) {
      $( e )
        .siblings('.error')
        .text('')
        .removeClass('show')
        .addClass('hidden');
    },

    passwordChecker ( e ) {
      // Get target
      let $target = $( this );

      // get first password
      let firstPass = $( '#password' )
        .val();

      // get second password
      let secondPass = $target 
        .val();

      // compare values
      if( ( secondPass.length > 0 ) && ( firstPass !== secondPass )){
        // display error
        formObj.displayError( $target, `Passwords don\'t match!` );
      } else {
        // clear error
        formObj.clearError( $target );
      }

    },

    countChecker ( textObject ) {
      // get min and max
      let min = +textObject.data('min');
      let max = +textObject.data('max');

      // get text length
      let textLength = textObject
        .val()
        .length;

      // check if between min and max counts
      if( (textLength >= min) && (textLength <= max) ){
        //clear any existing error
        formObj.clearError( textObject );
      } else {
        // display error
        formObj.displayError( textObject, `Input must be between ${min} and ${max} characters` );
      }
    },

    submitChecker ( e ) {

      e.preventDefault();

      // Check name
      formObj.countChecker( $( '#name' ) );

      // Check message
      formObj.countChecker( $( '#message' ) );

      // Check password
      formObj.countChecker( $( '#password' ) );
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
  const photoObj = {

    container: $('div.img-box'),

    heroes: ['Black Widow', 'Nick Fury', 'Iron Man', 'The Hulk', 'Capt America',
      'Thor', 'Hawkeye'],

    offset: $( 'img' ).offset(),

    cancelDropdown( eventObject ) {
        // Remove dropdown
        photoObj.container
          .find('.tag-dropdown')
          .remove();

        // Remove unlabeled tag boxes
        if( $('.tag-box')
          .last()
          .next()
          .hasClass('label') === false) {

            $( '.tag-box' )
              .last()
              .remove();
        }

      // Remove clicktag handler
      $( this ).off( 'click', photoObj.clickTag );

      // Remove cancel dropdown handler
      $( this ).off( 'click', photoObj.cancelDropdown );

    },

    selectLI ( eventObject ) {

      let ul = $( this ).parent();
      
      let text = $( this ).text();

      // Get coordinates of UL
      let left = ul.css('left');
      let top = ul.css('top');

      // Create label
      let label = $('<div>')
        .addClass('label')
        .text( text )
        .css({
          'left': left,
          'top': top
        });

      // Replace ul with label
      photoObj.container.children('ul').replaceWith(label);

    },

    createDropdown( left, top ) {

      // Create ul
      let dropdown = $('<ul>')
        // Add styles
        .addClass('tag-dropdown')
        // Add position
        .css({
          'left': left,
          'top': top 
          })
        // Add event listener
        .on( 'click', 'li', photoObj.selectLI );

      // Fill dropdown with heroes
      photoObj.heroes.forEach( hero => {
        let listItem = $('<li>')
          .text(hero);

        dropdown.append(listItem); 
      });

      return dropdown;
    },

    clickTag ( eventObject ) {
      // Set coordinates
      let left = (eventObject.pageX - photoObj.offset.left - 50) + 'px';
      let top = (eventObject.pageY - photoObj.offset.top - 50) + 'px';
      
      // Construct tag box
      let tagBox  = $('<div>')
        .addClass('tag-box')
        .css({
          'left': left,
          'top': top
        });

      // Create dropdown
      let dropdown = photoObj.createDropdown ( left, 
          // set top position of dropdown to be right below click box
        (eventObject.pageY - photoObj.offset.top + 60 ) + 'px' );
      
      // Add click box & dropdown to container
      photoObj.container
        .append( tagBox )
        .append( dropdown );

      // Event listener for canceling dropdown selection
      $( 'img' ).on( 'click', photoObj.cancelDropdown ); 

    },

    updatePosition ( eventObject ) {
      // Update position
      // -50px is to center the box around the cursor
      $( '.hover-box' )
      .css({
        'left': (eventObject.pageX - photoObj.offset.left -50) + 'px',
        'top': (eventObject.pageY - photoObj.offset.top -50) + 'px'
      });
    },

    showBox ( eventObject ) {

      // Construct box
      let box = $('<div>')
        .addClass('hover-box');

      // Add box to div
      photoObj.container.append( box );

      // Follow mouse
      $( 'img' ).on( 'mousemove', photoObj.updatePosition );

      // Add tag event handler
      $( 'img' ).on( 'click', photoObj.clickTag );

    },

    removeBox( eventObject ) {
      // Remove box
      photoObj.container.find( '.hover-box' ).remove();
    }

  };

  const eventHandlers = {
    init () {
      /*
       * Form validation
       */
      // Text input event
      $( '.user-input' ).on( 'keyup', formObj.inputHandler );
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
      $( 'img' ).hover( photoObj.showBox, photoObj.removeBox );

    }

  };
  
  /**
   * Register event handlers
   */
  eventHandlers.init();

});

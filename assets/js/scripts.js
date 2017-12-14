'use strict'

$(document).ready( () => {
 
  /**
   * THE FORM VALIDATION
   */
  const FORM = {

    _remainingChars ( $target, strLen ) {
      // Get max
      let max = $target.data( 'max' );

      return max - strLen;
    },

    _updateCount ( e, chars ) {
      // Update span content 
      e
        .next( '.js-counter' )
        .html(`Remaining characters: ${ chars }`)
    },

    _checkInput ( e ) {

      // Get event target
      let $target = $( this );

      // Get string length
      let strLen = $target
        .val()
        .length;

      if ( strLen > 0 ) {
        // Get remaining chars
        let remainingChars = FORM._remainingChars( $target, strLen );

        // Display remaining
        FORM._updateCount ( $target, remainingChars );

        $target
          .next( '.js-counter' )
          .removeClass('hidden')
          .addClass('show');

      } else {
        // Hide if empty
        $target
        .next( '.js-counter' )
        .removeClass('show')
        .addClass('hidden');
      }
    },

    _displayError ( e , errorMsg ) {
      $( e )
        .siblings('.error')
        .text( errorMsg )
        .removeClass('hidden')
        .addClass( 'show' );
    },

    _clearError ( e ) {
      $( e )
        .siblings('.error')
        .text('')
        .removeClass('show')
        .addClass('hidden');
    },

    _checkPasswords ( e ) {
      // Get target
      let $target = $( this );

      // Get first password
      let firstPass = $( '#password' )
        .val();

      // Get second password
      let secondPass = $target 
        .val();

      // Compare values
      if( ( secondPass.length > 0 ) && ( firstPass !== secondPass )){
        // Display error
        FORM._displayError( $target, `Passwords don\'t match!` );
      } else {
        // Clear error
        FORM._clearError( $target );
      }

    },

    _checkCount ( textObject ) {
      // Get min and max
      let min = +textObject.data('min');
      let max = +textObject.data('max');

      // Get text length
      let textLength = textObject
        .val()
        .length;

      // Check if between min and max counts
      if( (textLength >= min) && (textLength <= max) ){
        // Clear any existing error
        FORM._clearError( textObject );
      } else {
        // Display error
        FORM._displayError( textObject, `Input must be between ${min} and ${max} characters` );
      }
    },

    _checkSubmit ( e ) {

      e.preventDefault();

      // Check name
      FORM._checkCount( $( '#name' ) );

      // Check message
      FORM._checkCount( $( '#message' ) );

      // Check password
      FORM._checkCount( $( '#password' ) );
    }

  };

  /**
   * THE DROPDOWN
   */
  const DROPDOWN = {

    _updateFirstLI ( e, text ) {
      // Get first LI
      let firstLI  = $( e.target )
        .parent()
        .children()
        .first();

      // Change inner HTML
      firstLI.html( `${text}<span class="arrow">&#x25BC;</span>` );
    },

    _openMenu ( e ) {
      // Get selection text
      let innerText = $( e.target )
        .text();

      // Toggle menu
      $( e.target )
        .parent()
        .children('.hidden')
        .slideToggle(300);
      
      // If target is not first LI
      if($( e.target ).attr('class') === 'hidden'){
        DROPDOWN._updateFirstLI( e, innerText );
      }

    }

  };

  /**
   * THE PHOTO TAGGING BOX
   */
  const PHOTOTAGGER = {

    _container: $('div.img-box'),

    _heroes: [
      'Black Widow',
      'Nick Fury',
      'Iron Man',
      'The Hulk',
      'Capt America',
      'Thor',
      'Hawkeye'
    ],

    _offset: $( 'img' ).offset(),

    _cancelDropdown( e ) {
        // Remove dropdown
        PHOTOTAGGER._container
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
      $( 'img' ).off( 'click', PHOTOTAGGER._clickTag );

      // Remove cancel dropdown handler
      $( 'img' ).off( 'click', PHOTOTAGGER._cancelDropdown );

    },

    _selectLI ( e ) {

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
      PHOTOTAGGER._container.children('ul').replaceWith(label);

      // Remove selection from heroes
      let idx = $( this ).attr( 'data' );
      PHOTOTAGGER._heroes.splice( idx, 1);

    },

    _createDropdown( left, top ) {

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
        .on( 'click', 'li', PHOTOTAGGER._selectLI );

      // Fill dropdown with heroes
      PHOTOTAGGER._heroes.forEach( (hero, idx) => {
        let listItem = $('<li>')
          .text(hero)
          .attr('data', idx);

        dropdown.append(listItem); 
      });

      return dropdown;
    },

    _clickTag ( e ) {
      // Set coordinates
      let left = ( e.pageX - PHOTOTAGGER._offset.left - 50) + 'px';
      let top = ( e.pageY - PHOTOTAGGER._offset.top - 50) + 'px';
      
      // Construct tag box
      let tagBox  = $('<div>')
        .addClass('tag-box')
        .css({
          'left': left,
          'top': top
        });

      // Create dropdown
      let dropdown = PHOTOTAGGER._createDropdown ( left, 
          // set top position of dropdown to be right below click box
        (e.pageY - PHOTOTAGGER._offset.top + 60 ) + 'px' );
      
      // Add click box & dropdown to container
      PHOTOTAGGER._container
        .append( tagBox )
        .append( dropdown );

      // Event listener for canceling dropdown selection
      $( 'img' ).on( 'click', PHOTOTAGGER._cancelDropdown ); 

      // Remove tag event handler
      $( 'img' ).off( 'click', PHOTOTAGGER._clickTag );

    },

    _updatePosition ( e ) {
      // Update position
      // -50px is to center the box around the cursor
      $( '.hover-box' )
      .css({
        'left': (e.pageX - PHOTOTAGGER._offset.left -50) + 'px',
        'top': (e.pageY - PHOTOTAGGER._offset.top -50) + 'px'
      });
    },

    _showBox ( ) {

      // Construct box
      let box = $('<div>')
        .addClass('hover-box');

      // Add box to div
      PHOTOTAGGER._container.append( box );

      // Follow mouse
      $( 'img' ).on( 'mousemove', PHOTOTAGGER._updatePosition );

      // Add tag event handler
      $( 'img' ).on( 'click', PHOTOTAGGER._clickTag );

    },

    _removeBox( ) {
      // Remove box
      PHOTOTAGGER._container.find( '.hover-box' ).remove();
    }

  };

  const eventHandlers = {
    init () {
      /*
       * Form validation
       */
      // Text input event
      $( '.user-input' ).on( 'keyup', FORM._checkInput );
      // Password input event
      $( '#cpassword' ).on( 'keyup', FORM._checkPasswords );
      // Submit event
      $( '#validator' ).click( FORM._checkSubmit );

      /*
       * Dropdown effects
       */
      $( '#menu' ).click( DROPDOWN._openMenu );

      /*
       * Phototagging effects
       */
      $( 'img' ).hover( PHOTOTAGGER._showBox, PHOTOTAGGER._removeBox );

    }

  };
  
  /**
   * Register event handlers
   */
  eventHandlers.init();

});

"use strict";

$( document ).ready(function() {

    //
    // ------- ADDING ITEMS TO THE LIST -------
    //

    // Makeshift onEnter listener
    var $inputField = $( 'input' ).attr('name', 'new-items');

    // The preferred method, with objects and not string concatenation
    $inputField.on('keyup', function (e) {
      var $trashIcon = $('<i></i>')
          .addClass('material-icons')
          .addClass('delete')
          .text('highlight_off');

      var $uncheckedBoxIcon = $('<i></i>')
          .addClass('material-icons')
          .addClass('check-boxes')
          .text('check_box_outline_blank');

      var $submittedListItem = $('<li></li>')
          .text( $(this).val() ) // always accept user input as 'text' so that it can't run malicious scripts
          .addClass('incomplete')
          .append($trashIcon)
          .append($uncheckedBoxIcon);

      if (e.keyCode == 13) {
        $( '#main-list' ).prepend( $submittedListItem );
        $inputField.val('');
      }
    });

    // --- THE NON-PREFERRED METHOD WITH STRING CONCATENTION-----
    // var $inputField = $( 'input' ).attr('name', 'new-items');

    // $inputField.on('keyup', function (e) {
    //   if (e.keyCode == 13) {
    //     $( '#main-list' ).prepend(
    //       '<li class="incomplete"><i class="material-icons delete">highlight_off</i><i class="material-icons check-boxes">check_box_outline_blank</i>'
    //       + $(this).val()
    //       + '</li>'
    //     );
    //     $inputField.val('');
    //   }
    // });
    //-------------------------------------------------------------


    //
    // ------- MARKING AS COMPLETE / INCOMPLETE -------
    //

    // Toggling the 'complete' class would be sufficient if there weren't icons
    // $( '#main-list' ).on("click", 'li', function(){
    //   $(this).toggleClass('complete');
    // });

    // Replace toggle with functionality to include icons
    // 1) switch from incomplete to complete
    $( '#main-list' ).on("click", '.incomplete', function(){
      var $unchecked = $(this).children('i').last().html('check_box_outline_blank');
      $unchecked.html('check_box');
      $(this).addClass('complete').removeClass('incomplete');
    });
    // 2) switch from complete to incomplete
    $( '#main-list' ).on("click", '.complete', function(){
      var $checked = $(this).children('i').last().html('check_box');
      $checked.html('check_box_outline_blank');
      $(this).addClass('incomplete').removeClass('complete');
    });



    //
    // ------------ ICONS ------------
    //

    // Add 'delete' icon functionality
    $( '#main-list' ).on("click", '.delete', function(){
      $(this).parent().remove();
    });



    //
    // ------------ BUTTONS ------------
    //

    // Mark all as complete
    $( '#mark-complete' ).on('click', function(){
      // change the css class
      $( '#main-list li' )
        .removeClass('incomplete')
        .addClass('complete');
      // changing the checkbox icon requires looping through the <li>s
      $.each($('#main-list li'), function(index, item) {
        var $item = $(item);
        $item.children().last().html('check_box');
      });
    });

    // Remove all from list
    $( '#remove-all' ).on('click', function(){
      var response = confirm("Are you sure you want to delete ALL of these items? This action cannot be undone.");
      if (response === true ){
        $( '#main-list li' ).remove();
      }
    });


});
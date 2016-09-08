$("#text-field").on('keydown', function() {
      var letterCount = this.value.length
      if(letterCount === 0) {
         $('#text-field-counter').text("")
       } else {
      $('#text-field-counter').text((32 - letterCount) + " characters left" )
      }
    }
  )


$("#text-area").on('keydown', function() {
      var letterCount = this.text().length
      if(letterCount === 0) {
         $('#text-area-counter').text("")
       } else {
      $('#text-area-counter').text((140 - letterCount) + " characters left" )
      }
    }
  )

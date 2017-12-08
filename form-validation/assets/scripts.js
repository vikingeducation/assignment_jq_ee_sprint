$(document).ready( () => {
  // Max character length for user inputs
  const TEXT_FIELD_MAX = 32;
  const TEXT_AREA_MAX = 140;
  const PASSWORD_MAX = 16;

  // Calculate remaining characters
  const getRemainingChars = (inputType, strLen) => {
    if(inputType === 'text'){
      return TEXT_FIELD_MAX - strLen;
    } else if (inputType === 'textarea') {
      return TEXT_AREA_MAX - strLen;
    } else {
      return PASSWORD_MAX - strLen;
    }
  };

  // Display remaining chars
  const displayRemaining = (eventTarget, remainingChars) => {
    eventTarget.next().attr('class', 'show');
    eventTarget.next()[0].innerHTML = `Remaining characters: ${remainingChars}`; 
  };

  // Input event handler
  const inputHandler = function(eventObject){
    let eventTarget = $(eventObject.target).first();
    // get input type
    let inputType = eventTarget[0].type;  
    // get string length
    let strLen = eventTarget[0].value.length;
    // get remaining characters 
    let remainingChars = getRemainingChars(inputType, strLen);

    // display remaining chars
    if(strLen > 0){
      displayRemaining(eventTarget, remainingChars);
    } else {
      eventTarget.next().attr('class', 'hidden');
    }
  }

  // Input event listener
  const inputListener = $('.input').on('keyup', inputHandler); 
 
});

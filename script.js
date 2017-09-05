//javascript
$(document).ready(function () {
  
    $('#textField').keyup(validateMaxLength);

        function validateMaxLength()
        {
                var text = $(this).val();
                var maxlength = $(this).data('maxlength');

                if(maxlength > 0)  
                {
                        $(this).val(text.substr(0, maxlength)); 
                }
        }
    
    
  
       
    var passInput = document.getElementById("password");
    var confirmPassLength = document.getElementById("confirm_password");
    var passwordMin = 6;
    var passwordMax = 16;
    
       function validatePassword1(){   
       if(confirmPassLength.length <= passwordMin && confirmPassLength.length >= passwordMax)  
          {   
            confirmPassLength.setCustomValidity('');      
              } else { 
            confirmPassLength.setCustomValidity("Please use between 6-16 characters"); 
          }   
       }
    
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("confirm_password");
        function validatePassword2(){
          if(password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
          } else {
            confirm_password.setCustomValidity('');
          }
        }



    password.onchange = validatePassword2;
    confirm_password.onkeyup = validatePassword2;
    passInput.onchange = validatePassword1;
    confirmPassLength.onkeyup = validatePassword1;


});
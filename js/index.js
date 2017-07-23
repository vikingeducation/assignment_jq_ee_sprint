$(document).ready(function(){
  listeners.init();
});

var form = {
  
  update_count: function(){
    var count = $(this).val().length;
    count == 0 ? $(".count").text(" ") : 
    $('.count').text(count);
    
    form.limit_chars($(this).attr('class'), count, $(this));
  },
  
  limit_chars: function(elem_class, count, elem){
    var elem_class = elem_class.split(" ")[0]

    if( elem_class == 'text'){
       count > 32 ? elem.parent().addClass('error') : elem.parent().removeClass('error');
    }
    else if(elem_class == 'textarea'){
      count > 144 ? elem.parent().addClass('error') : elem.parent().removeClass('error');
    }
    else if((elem_class == 'password' || elem_class == 'password-validation')){
      count > 16 ? elem.parent().addClass('error') : elem.parent().removeClass('error');
    } else{}

  },
  
  check_pass_length: function(){
    var pass_len = $(".password").val().length;
    var passconf_len = $(".password-validation").val().length;
    
    if(pass_len != passconf_len){ 
      $(".updater").append("<h6></h6>").text("Passwords do not match");
      $(".updater").addClass('error');
    }
    else{
      $(".updater").text("").removeClass("error");
    }
  },
  
  check_pass_match: function(){ 
    if($(".password").val() !== $(".password-validation").val()){
      $(".updater").append("<h6></h6>").text("Passwords do not match");
      $(".password").parent().addClass('error');
    }
    else{ $(".password").parent().removeClass('error'); return true; }
  },
  
  check_for_errors: function(){
    if($("li").hasClass("error")){
         $(".updater").append("<h6></h6>").text("Please fix your errors").addClass('error');
         return true;
       }
  },
  
  is_empty: function(){
    $("li, textarea").each(function(){
      if($(this).val().length > 0){ return false; }
    });
    return true;
  },
  
  submitted: function(e){
    if(form.check_pass_match() == false || form.check_for_errors() /*|| form.is_empty()*/){
        e.preventDefault();
    }
    else{
      //needs to stay after form submit
      $(".updater").append("<h6></h6>").text("Form data was successfully sent!").addClass("success");
    }
    
  }  
}

var animations = {
  popout: function(){ 
    if($('input, textarea').is(":focus")){ $('input, textarea').removeClass('popout'); }
    $(this).addClass('popout');
  },
  
  add_subtle_error: function(){
    $("li").each(function(){
      if($(this).attr('class') == "error"){
        if($(this).is(":focus") == false){ $(this).addClass("error-subtle")}
        //class isn't removed when not in focus
        if($(this).is(":focus") == true ){$(this).removeClass("error-subtle")}
      }
    })
    
  }
  
}
  
  
    

var listeners = {
  
  init: function(){
    listeners.keystroke();
    listeners.password_check();
    listeners.on_submit();
    listeners.on_focus();
  },
  
  password_check: function(){
    $('.password, .password-validation').keyup(form.check_pass_length); 
    $('.password, .password-validation').keydown(form.check_pass_length);
  },
  
  keystroke: function(){
    $('input, textarea').keyup(form.update_count);
    $('input, textarea').keydown(form.update_count);
  },
  
  on_focus: function(){
    $('input, textarea').focus(form.update_count);
    $('input, textarea').focus(animations.popout);
    //$('input, textarea').focus(animations.add_subtle_error);
  },
  
  on_submit: function(){
    $(".submit").click(form.submitted);
  }
}
var App = {};

App.submitContactForm = function(){

    var $form = $('#contact form');

    var formData = $form.serializeArray();
    var body = {};

    if(!formData || formData.length == 0)
        return;

    for(var i = 0; i < formData.length; i++){

        body[formData[i].name] = formData[i].value;
    }

    if(!validate(body))
        return;

    $form.find('button').html('<i class="fa fa-spinner fa-spin"></i>');
    $form.find('button').attr('disabled', 'true');

    $.post('/contact', body, function(response){

        if(response.error){
            showMessage('error', response.error);
            $form.find('button').attr('disabled', 'false').text('Submit');
        }
        else {
            showMessage('success', response.msg);
            $form.find('button').text('Sent!');
        }
    });

    function validate(body){

        var valid = true;

        //clear previous errors
        $form.find('.form-group').removeClass('has-error');

        if(!body.name){
            valid = false;
            $form.find('[name="name"]').parent().addClass('has-error');
        }
        if(!body.email || !validateEmail(body.email)){
            valid = false;
            $form.find('[name="email"]').parent().addClass('has-error');
        }
        if(!body.message){
            valid = false;
            $form.find('[name="message"]').parent().addClass('has-error');
        }

        if(!valid)
            showMessage('error', 'Please fix the errors above.');

        return valid;
    }

    function showMessage(type, msg){

        $form.find('.form-message').text(msg).attr('class', 'form-message ' + type);
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

};

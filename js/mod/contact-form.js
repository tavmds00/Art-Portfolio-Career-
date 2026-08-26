// mod -> contact-form

(function($){

    "use strict";

    var UxCBMod = [];

    UxCBMod.win = $(window);
    UxCBMod.doc = $(document);

    UxCBMod.fnContactForm = function(){

        UxCBMod.contactform.each(function(){

            var form = $(this);
            var formSubmit = form.find('.idi_send');

            form.on('submit', function(e){

                e.preventDefault();

                var name = $.trim(form.find('#idi_name').val());
                var email = $.trim(form.find('#idi_mail').val());
                var message = $.trim(form.find('#idi_text').val());

                if(name === ''){
                    alert('Please enter your name.');
                    return false;
                }

                if(email === ''){
                    alert('Please enter your email address.');
                    return false;
                }

                var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(!emailReg.test(email)){
                    alert('Please enter a valid email address.');
                    return false;
                }

                if(message === ''){
                    alert('Please enter your message.');
                    return false;
                }

                formSubmit
                    .val('Sending...')
                    .attr('disabled', 'disabled');

                var formData = new FormData(form[0]);

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(function(response){

                    if(!response.ok){
                        throw new Error('Network response was not OK');
                    }

                    return response.json();

                })
                .then(function(data){

                    if(data.success){

                        form.fadeOut('fast', function(){

                            form.before(
                                '<p class="success" style="text-align:center;">SUCCESS<br><br>Your message has been sent.</p>'
                            );

                        });

                    }else{

                        formSubmit
                            .val('Send')
                            .removeAttr('disabled');

                        alert(
                            data.message || 'There was a problem sending your message. Please try again.'
                        );

                    }

                })
                .catch(function(error){

                    console.error('Contact form error:', error);

                    formSubmit
                        .val('Send')
                        .removeAttr('disabled');

                    alert('There was a problem sending your message. Please try again.');

                });

                return false;

            });

        });

    };

    UxCBMod.fnInit = function(){

        UxCBMod.module = $('.bm-builder > .module');

        if(!UxCBMod.module.length){

            if($('.bm-builder > .bm-row').length){

                UxCBMod.module = $('.bm-builder > .bm-row > .module');

            }

        }

        UxCBMod.contactform = UxCBMod.module.find('.contact_form');

        if(UxCBMod.contactform.length){

            UxCBMod.fnContactForm();

        }

    };

    UxCBMod.doc.ready(function(){

        if(typeof UxCBModGlobal !== 'undefined'){

            UxCBModGlobal['contact-form'] = UxCBMod;

        }

        UxCBMod.fnInit();

    });

})(jQuery);
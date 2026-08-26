// mod -> contact-form

(function($){

    "use strict";

    var UxCBMod = [];

    UxCBMod.win = $(window);
    UxCBMod.doc = $(document);

    UxCBMod.fnContactForm = function(){

        UxCBMod.contactform.each(function(){

            var form = $(this),
                formSubmit = form.find('input[type="submit"]');

            form.submit(function(e){

                e.preventDefault();

                var hasError = false;

                form.find('.requiredField').each(function(){

                    if($.trim($(this).val()) === ''){

                        hasError = true;

                    }else if($(this).hasClass('email')){

                        var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if(!emailReg.test($.trim($(this).val()))){

                            hasError = true;

                        }

                    }

                });

                if(hasError){

                    return false;

                }

                formSubmit
                    .val('Sending...')
                    .attr('disabled','disabled');

                var formData = new FormData(form[0]);

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(function(response){

                    return response.json();

                })
                .then(function(data){

									if(data.success){

						$('#contact-title').text('SUCCESS');

								form.html(
									
								'<p class="success">Your message has been sent.</p>'
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
                .catch(function(){

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
/**
 *
 * Name        : Form validation Plugin using jQuery 2.2.3
 * Version     : 1.0
 * Author      : Mohamed Shanil PA
 * Description : Plugin to validate forms, user will be able to update the options and user
 *               defined rules for form fields
 *
 */

(function($) {

    /*=============================================>>>>>
    Method : formValidate
    @Params : Options to customize the plugin
    ===============================================>>>>>*/

    $.fn.extend({

        formValidate: function(options) {
            // Overide up the default options with the custom injected options
            options = $.extend(true, {}, $.formValidate.defaults, options);
            // Loop over each form objects
            this.each(function() {
                // Instantiate a formValidate plugin instance & pass the form object and  plugin options
                new $.formValidate(options);
            });
            return this;
        }

    });

    /*=============================================>>>>>
    = formValidate constructor =
      @Params - Plugin configuration options
    ===============================================>>>>>*/

    $.formValidate = function(options) {

        /* Regex to use for validation
           numberRegex - validate integers
           stringRegex - validate characters
           emailRegex - validate email address combination
           passwordRegex - validate password
           phoneNumberRegex - validate phone Number
        */
        var numberRegex = /^[0-9]+$/;
        var stringRegex = /^\w+$/;
        var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/;
        var passwordRegex = /^[a-z0-9_-]{6,18}$/;
        var usernameRegex = /^[a-z0-9_-]{3,16}$/;
        var phoneNumberRegex = /[0-9-()+]{3,20}/;

        // Skip hidden field validation
        var skipHiddenFields = options.skipHiddenFields ? ':input[type=hidden]' : '';

        /*----------- Select the Input elements from form to be validated -----------*/
        var inputs = $('form input, form textarea, form select')
            .not(':input[type=button], :input[type=submit], :input[type=reset]' + ',' + skipHiddenFields);

        /*----------- Update the trigger method on form elements -----------*/
        if (options.TriggerUsed) {
            inputs.unbind().bind(options.TriggerUsed, function() {
                $("form").formValidate(options);
            });
        }
        /*----------- Hide Error OnChange event of form elements -----------*/
        if (options.hideErrorOnChange) {
            inputs.bind('keypress', function() {
                $(this).hideMessage();
            });
        }

        /*----------- Loop over each Input elements -----------*/
        $(inputs).each(function(k) {
            $(this).hideMessage();
            var $this = $(this);
            var inputName = $this.attr('name');
            var inputVal = $this.val();
            if (!inputVal && $(this).attr('required')) {
                // Mandatory field check
                required = false;
                $this.before('<span class="error"> Your ' + inputName + ' is required</span>');
                $this.addClass('errorField');
                return false;
            } else {
                if ($(this).attr(options.AttributeUsed) != undefined) {
                    //if data-SELECTOR is set on element
                    switch ($(this).attr(options.AttributeUsed)) {

                        case 'number':
                            matchRegex = numberRegex;
                            if (!inputVal.match(matchRegex)) {
                                $this.before('<span class="error"> You have provided invalid ' + $(this).attr(options.AttributeUsed) + '</span>');
                                $this.addClass('errorField');
                                return false;
                            }
                            break;

                        case 'string':
                            matchRegex = stringRegex;
                            if (!inputVal.match(matchRegex)) {
                                $this.before('<span class="error"> You have provided invalid ' + $(this).attr(options.AttributeUsed) + '</span>');
                                $this.addClass('errorField');
                                return false;
                            }
                            break;

                        case 'username':
                            matchRegex = usernameRegex;
                            if (!inputVal.match(matchRegex)) {
                                $this.before('<span class="error"> You have provided invalid ' + $(this).attr(options.AttributeUsed) + '</span>');
                                $this.addClass('errorField');
                                return false;
                            }
                            break;

                        case 'phonenumber':
                            matchRegex = phoneNumberRegex;
                            if (!inputVal.match(matchRegex)) {
                                $this.before('<span class="error"> You have provided invalid ' + $(this).attr(options.AttributeUsed) + '</span>');
                                $this.addClass('errorField');
                                return false;
                            }
                            break;

                        case 'email':
                            matchRegex = emailRegex;
                            if (!inputVal.match(matchRegex)) {
                                $this.before('<span class="error"> You have provided invalid ' + $(this).attr(options.AttributeUsed) + '</span>');
                                $this.addClass('errorField');
                                return false;
                            }
                            break;

                        case 'password':
                            matchRegex = passwordRegex;
                            if (!inputVal.match(matchRegex)) {
                                $this.before('<span class="error"> You have provided invalid ' + $(this).attr(options.AttributeUsed) + '</span>');
                                $this.addClass('errorField');
                                return false;
                            }
                            break;

                        default:
                            if ($(this).attr(options.AttributeUsed)) {
                                var realArray = $.makeArray(options.rules);
                                var param = $(this).attr(options.AttributeUsed);
                                var paramMatch = false;
                                paramMatch = $.map(realArray, function(obj) {
                                    if (Object.keys(obj) == param)
                                        return obj;
                                });
                                if (paramMatch) {
                                    var valid = paramMatch[0][param](inputVal);
                                    if (!valid) {
                                        $this.before('<span class="error"> You have provided invalid ' + $(this).attr(options.AttributeUsed) + '</span>');
                                        $this.addClass('errorField');
                                        return false;
                                    }
                                }
                            }
                    }
                }
            }
        });

        return this;
    };

    /*=============================================>>>>>
    = Hide all error message from Form =
    ===============================================>>>>>*/

    $.fn.hideMessage = function() {
            $('.error').remove();
            $('.errorField').removeClass('errorField');
        }
        /*=============================================>>>>>
        = formValidate Plugin default options =
        ===============================================>>>>>*/
    $.formValidate.defaults = {
        AttributeUsed: "data-Formvalidate",
        TriggerUsed: "blur",
        scroll: true,
        focusFirstField: false,
        hideErrorOnChange: true,
        skipHiddenFields: true,
        assyncPattern: true,
        assyncUrl: '',
        rules: {}
    };

    /*=============================================>>>>>
    = Add new rules to the plugin =
    ===============================================>>>>>*/

    $.formValidate.addRules = function(rules) {
        rules = ({
            "rules": rules
        });
        $.extend(true, $.formValidate.defaults, rules);
    };

}(jQuery));

/*= End of formValidate Plugin code =*/
/*=============================================<<<<<*/

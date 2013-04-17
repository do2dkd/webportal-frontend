/*global define */

define(['jquery'], function ($) {
    'use strict';

    $(document).ready(function () {
        var loginform = function(form) {
            $.ajax({
                url: form.action,
                data: $(form).serialize(),
                success: function (data) {
                    if (data === 'ok') {
                        window.location = '/index.html';
                    } else if (data === 'no') {
                        $('#error').show();
                        $('#error').html('Error try to login maybe:<br/> The username must be case sensitive<br/>or<br/>check password');
                    } else {

                    }
                },
                error: function (error) {

                },
                dataType: "text"
            });
            return false;
        };
    });
});
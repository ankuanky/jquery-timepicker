(function($, undefined) {
    $.jQtimepicker = {
        version: '1.0.0',
        defaults: {
            stepMinutes: 1,
            disableHours: ['0-5', 4, 3],
            minHours: 0,
            maxHours: 23,
            format24Hr: true,
            defaultTime: '08:00'
        },
        getOptions: function(config) {
            var defaults = $.jQtimepicker.defaults,
                options = {};

            options.stepMinutes = config.stepMinutes ? config.stepMinutes : defaults.stepMinutes;
            options.disableHours = config.disableHours ? config.disableHours : defaults.disableHours;
            options.minHours = config.minHours ? config.minHours : defaults.minHours;
            options.maxHours = config.maxHours ? config.maxHours : defaults.maxHours;
            options.format24Hr = config.format24Hr ? config.format24Hr : defaults.format24Hr;
            options.defaultTime = config.defaultTime ? config.defaultTime : defaults.defaultTime;
            if (!options.format24Hr) {
                options.minHours = 1;
            }


            $.jQtimepicker.options = options;
            return options;
        },
        pad: function(input, length, padwith) {
            if (input.toString().length < length) {
                for (var i = 0; i < length - input.toString().length; i++) {
                    input = padwith + '' + input;
                }
            }
            return input;
        },
        getTemplate: function(options) {
            if (60 % options.stepMinutes !== 0) {
                return '';
            }
            var template = '';
            template += '';
            template += '<div class="jq-time-popup">';
            template += '<div class="jq-time-hour">';
            template += '<input type="tel" class="jq-time-input" maxlength="2" placeholder="hh" />';
            template += '</div>';
            template += '<div class="jq-time-sep">';
            template += '<span>:</span>';
            template += '</div>';
            template += '<div class="jq-time-minute">';
            template += '<input type="tel" class="jq-time-input" maxlength="2" placeholder="mm" />';
            template += '</div>';
            template += '<div class="jq-time-sep">';
            template += '<span>&nbsp;</span>';
            template += '</div>';
            template += '<div class="jq-close-picker">';
            template += '<span>Close</span>';
            template += '</div>';
            template += '<div class="jq-time-numpad">';
            template += '<div class="jq-numpad-prev">';
            template += '<div class="jq-num-prev">=</div>';
            template += '</div>';
            template += '<div class="clearfix"></div>';
            for (var i = 0; i < 60; i = i + options.stepMinutes) {
                template += '<div class="jq-numpad-num jq-num-' + i + ' ">' + $.jQtimepicker.pad(i, 2, 0) + '</div>';
            }
            template += '<div class="clearfix"></div>';
            template += '<div class="jq-numpad-next">';
            template += '<div class="jq-num-next">=</div>';
            template += '</div>';
            template += '<div class="jq-meridian jq-time-am">';
            template += '<span>AM</span>';
            template += '</div>';
            template += '<div class="jq-meridian jq-time-pm">';
            template += '<span>PM</span>';
            template += '</div>';
            template += '</div>';
            template += '</div>';
            console.log(options.disableHours);
            for (var i = 0; i < options.disableHours.length; i++) {
                console.log(options.disableHours[i]);
            }
            return template;
        },
        formatTime: function() {
            if ($.jQtimepicker.options.format24Hr) {
                $.jQtimepicker.element.val($.jQtimepicker.hours + ':' + $.jQtimepicker.minutes);
            }
        },
        initNumpad: function(padType) {
            var options = $.jQtimepicker.options;
            //console.log(options);
            if (padType === 'hour') {
                for (var i = 0; i < 60; i++) {
                    if ($('.jq-time-numpad .jq-num-' + i).hasClass('jq-hide')) {
                        $('.jq-time-numpad .jq-num-' + i).removeClass('jq-hide');
                    }
                    if ($('.jq-time-numpad .jq-num-' + i).hasClass('num-selected')) {
                        $('.jq-time-numpad .jq-num-' + i).removeClass('num-selected');
                    }
                }
                $('.jq-time-numpad .jq-num-' + parseInt($.jQtimepicker.hours)).addClass('num-selected');
                for (var i = 0; i < options.minHours; i++) {
                    $('.jq-time-numpad .jq-num-' + i).addClass('jq-hide');
                }
                for (var i = options.maxHours + 1; i < 60; i++) {
                    $('.jq-time-numpad .jq-num-' + i).addClass('jq-hide');
                }
                if (options.format24Hr) {
                    $('.jq-meridian').hide();
                    $('.jq-close-picker').show();
                } else {
                    $('.jq-meridian').show();
                    $('.jq-close-picker').hide();
                }
                $('.jq-time-popup').addClass('jq-hour-pad');
                $('.jq-time-popup .jq-time-numpad').addClass('jq-hour-pad');
                $('.jq-time-popup .jq-time-numpad .jq-numpad-prev').addClass('jq-hide');
                $('.jq-time-popup .jq-time-numpad .jq-numpad-next').addClass('jq-hide');
                $.jQtimepicker.padType = padType;
            } else {
                if (padType === 'min1') {
                    for (var i = 0; i < 30; i++) {
                        if ($('.jq-time-numpad .jq-num-' + i).hasClass('jq-hide')) {
                            $('.jq-time-numpad .jq-num-' + i).removeClass('jq-hide');
                        }
                        if ($('.jq-time-numpad .jq-num-' + i).hasClass('num-selected')) {
                            $('.jq-time-numpad .jq-num-' + i).removeClass('num-selected');
                        }
                    }
                    for (var i = 30; i < 60; i++) {
                        if (!$('.jq-time-numpad .jq-num-' + i).hasClass('jq-hide')) {
                            $('.jq-time-numpad .jq-num-' + i).addClass('jq-hide');
                        }
                        if ($('.jq-time-numpad .jq-num-' + i).hasClass('num-selected')) {
                            $('.jq-time-numpad .jq-num-' + i).removeClass('num-selected');
                        }
                    }
                    $('.jq-time-numpad .jq-num-' + parseInt($.jQtimepicker.minutes)).addClass('num-selected');
                    if (options.format24Hr) {
                        $('.jq-meridian').hide();
                        $('.jq-close-picker').show();
                    } else {
                        $('.jq-meridian').show();
                        $('.jq-close-picker').hide();
                    }
                    $('.jq-time-popup').removeClass('jq-hour-pad');
                    $('.jq-time-popup .jq-time-numpad').removeClass('jq-hour-pad');
                    $('.jq-time-popup .jq-time-numpad .jq-numpad-prev').addClass('jq-hide');
                    $('.jq-time-popup .jq-time-numpad .jq-numpad-next').removeClass('jq-hide');
                    $.jQtimepicker.padType = padType;
                } else {
                    for (var i = 0; i < 30; i++) {
                        if (!$('.jq-time-numpad .jq-num-' + i).hasClass('jq-hide')) {
                            $('.jq-time-numpad .jq-num-' + i).addClass('jq-hide');
                        }

                        if ($('.jq-time-numpad .jq-num-' + i).hasClass('num-selected')) {
                            $('.jq-time-numpad .jq-num-' + i).removeClass('num-selected');
                        }
                    }
                    for (var i = 30; i < 60; i++) {
                        if ($('.jq-time-numpad .jq-num-' + i).hasClass('jq-hide')) {
                            $('.jq-time-numpad .jq-num-' + i).removeClass('jq-hide');
                        }

                        if ($('.jq-time-numpad .jq-num-' + i).hasClass('num-selected')) {
                            $('.jq-time-numpad .jq-num-' + i).removeClass('num-selected');
                        }
                    }
                    $('.jq-time-numpad .jq-num-' + parseInt($.jQtimepicker.minutes)).addClass('num-selected');

                    if (options.format24Hr) {
                        $('.jq-meridian').hide();
                        $('.jq-close-picker').show();
                    } else {
                        $('.jq-meridian').show();
                        $('.jq-close-picker').hide();
                    }
                    $('.jq-time-popup').removeClass('jq-hour-pad');
                    $('.jq-time-popup .jq-time-numpad').removeClass('jq-hour-pad');
                    $('.jq-time-popup .jq-time-numpad .jq-numpad-prev').removeClass('jq-hide');
                    $('.jq-time-popup .jq-time-numpad .jq-numpad-next').addClass('jq-hide');
                    $.jQtimepicker.padType = padType;
                }
            }
        }
    };

    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if ('selectionStart' in el) {
            pos = el.selectionStart;
        } else if ('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    };

    $.fn.jQtimepicker = function(config) {
        $.jQtimepicker.container = $('#jQtimepicker');
        if (!config) {
            config = {};
        }
        var options = $.jQtimepicker.getOptions(config);
        var element = $(this);
        if (options.format24Hr) {
            $.jQtimepicker.hours = options.defaultTime.split(':')[0];
            $.jQtimepicker.minutes = options.defaultTime.split(':')[1];
        }
        $.jQtimepicker.container.html($.jQtimepicker.getTemplate(options));
        $.jQtimepicker.container.hide();
        $.jQtimepicker.numpadNum = '.jq-numpad-num';
        element.each(function() {
            var elem = $(this);
            $(elem).focus(function() {
                $.jQtimepicker.element = $(this);
                console.log($.jQtimepicker);
                if (options.format24Hr) {
                    $('.jq-time-hour .jq-time-input').val($.jQtimepicker.hours);
                    $('.jq-time-minute .jq-time-input').val($.jQtimepicker.minutes);
                }
                $.jQtimepicker.container.show();
                if (!$.jQtimepicker.initialized) {
                    $($.jQtimepicker.numpadNum).each(function() {
                        var num = $(this);
                        num.click(function() {
                            console.log(num.text());
                            if ($.jQtimepicker.padType === 'hour') {
                                $('.jq-time-hour .jq-time-input').val(num.text());
                                $.jQtimepicker.hours = num.text();
                                $('.jq-time-minute .jq-time-input').focus();
                            } else {
                                $('.jq-time-minute .jq-time-input').val(num.text());
                                $.jQtimepicker.minutes = num.text();
                                $.jQtimepicker.container.hide();
                            }
                            $.jQtimepicker.formatTime();
                        });
                    });
                    $('.jq-time-hour .jq-time-input').focus(function() {
                        $.jQtimepicker.initNumpad('hour');
                    });
                    $('.jq-time-minute .jq-time-input').focus(function() {
                        $.jQtimepicker.initNumpad('min1');
                    });
                    $('.jq-time-popup .jq-time-numpad .jq-numpad-prev').click(function() {
                        $('.jq-time-minute .jq-time-input').focus();
                    });
                    $('.jq-time-popup .jq-time-numpad .jq-numpad-next').click(function() {
                        $('.jq-time-minute .jq-time-input').focus();
                        $.jQtimepicker.initNumpad('min2');
                    });
                    $('.jq-time-minute .jq-time-input').keydown(function(key) {
                        if (key.keyCode === 8 && $(this).val().length === 0) {
                            $('.jq-time-hour .jq-time-input').focus();
                        } else if (key.keyCode == 37 && $(this).getCursorPosition() === 0) {
                            $('.jq-time-hour .jq-time-input').focus();
                        }
                    });
                    $('.jq-time-hour .jq-time-input').keydown(function(key) {
                        if (key.keyCode == 39 && $(this).getCursorPosition() === 2) {
                            $('.jq-time-minute .jq-time-input').focus();
                        }
                    });
                    $('.jq-time-hour .jq-time-input').change(function() {
                        if (!isNaN(parseInt($(this).val()))) {
                            $.jQtimepicker.hours = $(this).val();
                            $.jQtimepicker.initNumpad('min1');
                        }
                    });

                    $('.jq-time-minute .jq-time-input').change(function() {
                        if (!isNaN(parseInt($(this).val()))) {
                            $.jQtimepicker.minutes = $(this).val();
                            if (parseInt($(this).val()) > 29) {
                                $.jQtimepicker.initNumpad('min2');
                            } else {
                                $.jQtimepicker.initNumpad('min1');
                            }

                        }
                    });
                    $('.jq-close-picker').click(function() {
                        $.jQtimepicker.formatTime();
                        $.jQtimepicker.container.hide();
                        $.jQtimepicker.element.blur();
                    });

                    $.jQtimepicker.initialized = true;
                }

                $('.jq-time-hour .jq-time-input').focus();
            });
            /*
            $(elem).blur(function() {
                $.jQtimepicker.container.empty();
            });*/
        });
    };

})(jQuery);

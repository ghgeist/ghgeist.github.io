/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    'use strict';

    // Configuration
    const CONFIG = {
        scrollDuration: 1500,
        scrollEasing: 'easeInOutExpo'
    };

    // Navigation handlers
    const navigation = {
        initSmoothScroll: function() {
            $('a.page-scroll').on('click', function(event) {
                const target = this.hash;
                if (target && $(target).length) {
                    $('html, body').stop().animate({
                        scrollTop: $(target).offset().top
                    }, CONFIG.scrollDuration, CONFIG.scrollEasing);
                    event.preventDefault();
                }
            });
        },

        initScrollspy: function() {
            $('body').scrollspy({
                target: '.navbar-fixed-top'
            });
        },

        initMobileMenu: function() {
            $('.navbar-collapse ul li a').click(function() {
                $('.navbar-toggle:visible').click();
            });
        }
    };

    // Page initialization
    const init = function() {
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }

        navigation.initSmoothScroll();
        navigation.initScrollspy();
        navigation.initMobileMenu();
    };

    // Initialize when DOM is ready
    $(document).ready(init);

})(jQuery);


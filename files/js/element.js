/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
    var FAQ = PlatformElement.extend({
        initialize: function() {
            this.activeIndex = this.settings.get('active_index');

            this.fixBoxStyleBorders();
            this.setupAccordion();
        },

        /**
         * Simplistic jQuery usage to animate and control which
         * accordion item is currently open
         */
        setupAccordion: function() {
            var view = this;

            this.$el.find('.accordion__title').on('touchstart click', function(e) {
                // remove "hover" state on touch events
                if (e.type == "touchstart") {
                    view.$el.find('.accordion').removeClass('no-touch');
                }

                e.stopPropagation();
                e.preventDefault();

                var isActive = $(this).parent().hasClass('active');

                // handles closing
                view.$el.find('.accordion__title').each(function() {
                    var $this = $(this);
                    var $next = $(this).next();
                    var eachIsActive = $(this).parent().hasClass('active');

                    $next.css({
                        'max-height': 0 + 'px'
                    });

                    if (eachIsActive) {
                        setTimeout(function() {
                            $this.parent().removeClass('active');
                        }, 250);
                    }
                });

                // handles opening
                if (!isActive) {
                    $(this).parent().addClass('active');
                    var $next = $(this).next();
                    $next.css({
                        'max-height': $next[0].scrollHeight + 20 + 'px' // 20 to compensate for padding
                    });
                }
            });

            this.$el.find('.accordion__title').on('touchend', function() {
                view.$el.find('.accordion').addClass('no-touch');
            });
        },

        /**
         * When using the 'Box' style, to avoid
         * thick borders on the top and bottom of
         * elements, we just shift all the elements up
         * 'i' pixels. Preferable over doing it through css
         * because all the items need all 4 borders on hover.
         */
        fixBoxStyleBorders: function() {
            var view = this;

            // only do it if the style is 'box'
            if (this.settings.get('style') == 'box') {
                this.$el.find('.accordion--box .accordion__item').each(function(i) {
                    $(this).css({
                        'top': -i
                    });
                });
            }
        }
    });

    return FAQ;
})();
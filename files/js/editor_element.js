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
            this.setOpen();
            this.listenToContentChanges();
        },

        /**
         * Listens to subtree modifications in the content areas
         * and resizes them as needed
         */
        listenToContentChanges: function() {
            /**
             * Setup a mutation observer to listen to dom manipulation events
             */
            var mutationObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    var $closest = $(mutation.target).closest('.accordion__content');
                    if($closest) {
                        $closest.css({
                            'max-height': $closest[0].scrollHeight + 20 + 'px' // 20 to compensate for padding
                        });
                    }
                });
            });

            /**
             * Assign the mutationObserver to each content area
             */
            this.$el.find('.accordion__content').each(function() {
                mutationObserver.observe($(this)[0], {
                    childList: true,
                    subtree: true
                });
            });
        },

        /**
         * If an index was active when the page was
         * reloaded or refreshed, open it back up
         */
        setOpen: function() {
            /**
             * "-1" is the identifier that no items
             * were open at page load
             */
            if (this.activeIndex != '-1') {
                this.$el.find('[data-item="' + this.activeIndex + '"]').find('.accordion__title').trigger('click');
            }
        },

        /**
         * Simplistic jQuery usage to animate and control which
         * accordion item is currently open
         */
        setupAccordion: function() {
            var view = this;

            $titles = this.$el.find('.accordion__title');
            $events = $._data($titles[0], "events");

            // if we already have set up click events, don't set more up
            if ($events && $events.click && $events.click[0]) {
                return;
            }

            $titles.on('touchstart click', function(e) {
                // remove "hover" state on touch events
                if (e.type == "touchstart") {
                    view.$el.find('.accordion').removeClass('no-touch');
                }

                e.stopPropagation();
                e.preventDefault();

                var isActive = $(this).parent().hasClass('active');
                view.settings.set('active_index', '-1');

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
                    var activeIndex = $(this).parent().attr('data-item');
                    view.settings.set('active_index', activeIndex);
                    $next.css({
                        'max-height': $next[0].scrollHeight + 20 + 'px' // 20 to compensate for padding
                    });
                }

                view.settings.save();
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
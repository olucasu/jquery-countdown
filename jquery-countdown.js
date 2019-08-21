(function ( $ ) {
    /**
     * # Main Obj
     * * Where all methods and props are defined
     *
    */
    const Counter = function(date) {
        // Date string to count before happens
        this.countDownDate = date;
        // String that will appear when the counter hits 0
        this.fallbackString = false;
    
        /**
         * Getters and Setters
         */
        const setParams = (params) => {
            if(params != undefined && params ) {
                if(params.fallbackString) {
                    setFallbackString(params.fallbackString);
                }
            }
        };
        const getDate = () => {
            return new Date(this.countDownDate).getTime()
        };
        const setFallbackString = (fallbackString) => {
            this.fallbackString = fallbackString;
        };
        const getFallbackString = () => {
            return this.fallbackString;
        };
    
        /**
         * Verify deps for the plugin
        */
        const verifyDeps = (params) => {
            if(!window.jQuery || !window.$) {
                throw "[Regressive counter] jQuery is required.";
            }
            if(! getDate()) {
                throw "[Regressive counter] Param date not found";
            }
            if(! new Date(getDate()).getDate()) {
                throw "[Regressive counter] Invalid date";
            }
        };
    
        /**
         * Start counting
         */
        const start = (element) => {
            const countDownDate = getDate();
            const interval = setInterval(() => {
                // Get today's date and time
                const now = new Date().getTime();
                // Find the distance between now and the count down date
                const distance = countDownDate - now;
                // Time calculations for days, hours, minutes and seconds
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                // String to display
                const counterForDisplay = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                // Display string
                $(element).html(counterForDisplay);
                if (distance < 0) {
                    clearInterval(interval);
                    $(selector).html(getFallbackString());
                }
            }, 1000);
        };


        /**
         * Return public methods
         */
        return {
            init: (params, element) => {
                try {
                    verifyDeps(params);
                    setParams(params);
                    start(element);
                } catch(e) {
                    console.warn(e);
                }
            }
        }
    }

    /**
     * Jquery Countdown
     * ======
     * Display a countdown to a date
     * @param {*} date
    */
    return $.fn.countdown = function(params) {
        return this.each(function(e) {
            const date = $(this).data('countdown') || params.date;
            let counter = new Counter(date);
            counter.init(params, $(this));
        });
    };
}( jQuery ));




(function () {
    'use strict';

    var Gameloop = function (main) {

        this.main = main;
        this.setFPS(30);
        this.timer = null;

    };

    var exports = function (main) {

        return new Gameloop(main);

    };

    var pt = exports.prototype = Gameloop.prototype;

    pt.constructor = exports;

    /**
     * Starts the game loop.
     */
    pt.start = function () {

        this.setTimer();

        return this;
    };

    /**
     * Sets a timer for next frame.
     *
     * @private
     */
    pt.setTimer = function (wait) {

        var that = this;

        this.timer = setTimeout(function () {

            that.step();

        }, wait);
    };

    /**
     * Performs the step routine.
     *
     * @private
     */
    pt.step = function () {

        this.startedAt = +new Date();

        if (typeof this.main === 'function') {

            this.main();

        }

        this.endedAt = +new Date();

        var wait = this.frame - (this.startedAt - this.endedAt);

        this.setTimer(wait);

    };

    /**
     * Stops the game loop.
     */
    pt.stop = function () {

        // This must stop the loop immediately no matter when it is called.
        clearTimeout(this.timer);

        return this;

    };

    /**
     * Sets the frame per second.
     */
    pt.setFPS = function (fps) {
        this.fps = fps;
        this.frame = 1000 / this.fps;

        return this;
    };


    if (typeof module !== 'undefined' && module.exports) {

        module.exports = exports;

    } else if (typeof window !== 'undefined') {

        window.gameloop = exports;

    }

}());

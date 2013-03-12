/**
 * Allow to execute functions as an event and in order.
 */
var QueuedExec = Class.extend({
        _queue: null,
        _ms: null,

        /**
         * Initialize the QueueExec object.
         */
        init: function () {
            this._queue = [];
            this._ms = 0;
        },

        /**
         * Start executing the defined functions.
         */
        run: function () {
            this.execNext();
        },

        /**
         * Define the next function to execute.
         * @param {Function} The function to execute.
         * @return {Object} The QueuedExec instance.
         */
        setNext: function (func) {
            this._queue.push(func);
            return this;
        },

        /**
         * Tell the QueuedExec instance to execute the next function.
         */
        execNext: function () {
            this._myTimeout(0);
        },

        /**
         * @private
         */
        _myTimeout: function (time) {
            var that = this;
            var ms = time;
            if (arguments.length === 0) {
                ms = that._ms;
            }
            setTimeout(function () {
                that._doNext();
            }, ms);
        },

        /**
         * @private
         */
        _doNext: function () {
            if (this._queue.length > 0) {
                var func = this._queue.shift();
                func();
            }
        }
    });
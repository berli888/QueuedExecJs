/**
 * Allow to execute functions as events and in order.
 * Use John Resig inheritance.
 * http://ejohn.org/blog/simple-javascript-inheritance/
 */
var QueuedExec = Class.extend({
        _queue: null,

        /**
         * Initialize the QueueExec object.
         * @return {Object} The QueueExec object.
         */
        init: function () {
            this._queue = [];
            return this;
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
            this._myTimeout();
        },

        /**
         * @private
         */
        _myTimeout: function () {
            var that = this;
            setTimeout(function () {
                that._doNext();
            }, 0);
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

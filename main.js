var QueuedExec = Class.extend({
        _queue: null,
        _ms: null,

        init: function () {
            this._queue = [];
            this._ms = 0;
        },

        run: function () {
            this.execNext();
        },

        setNext: function (func) {
            this._queue.push(func);
        },

        execNext: function () {
            this._myTimeout(0);
        },

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

        _doNext: function () {
            if (this._queue.length > 0) {
                var func = this._queue.shift();
                func();
            }
        }
    });
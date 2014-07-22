;(function(){


  "use strict";

  function EventEmitter() {
    this._listeners = {};
  }

  var addEventListener = function(emitter, event, callback, once) {
    emitter.listeners(event).push({
      callback: callback,
      once: Boolean(once)
    });

    return emitter;
  };

  EventEmitter.prototype.on = function(event, callback) {
    return addEventListener(this, event, callback, false);
  };

  EventEmitter.prototype.once = function(event, callback) {
    return addEventListener(this, event, callback, true);
  };

  EventEmitter.prototype.off = function(event, callback) {

    var result = [],
      listeners = this.listeners(event);

    if (!callback) {
      return delete(this._listeners[event]);
    }

    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i].callback === callback) {
        continue;
      }  

      result.push(listeners[i]);
    }

    this._listeners[event] = result;
  };

  EventEmitter.prototype.emit = function() {

    var obj, 
      args = toArray(arguments),
      event = args.shift(),
      listeners = this.listeners(event);

    for (var i = 0; i < listeners.length; i++) {
      obj = listeners[i];
      obj.callback.apply(this, args);

      if(obj.once) {
        this.off(event, obj.callback);
      }
    }

  };

  EventEmitter.prototype.listeners = function(event) {
    return this._listeners[event] || (this._listeners[event] = []);
  };

  var toArray = function(args) {
    return args.length === 1 ? [args[0]] : Array.apply(null, args);
  };

  if (typeof module === "object" && module.exports){
    module.exports = EventEmitter;
  } else {
    if (typeof define === "function" && define.amd) {
      define([], function() {
        return EventEmitter;
      });
    } else {
      this.EventEmitter = EventEmitter;  
    }
  }

})();

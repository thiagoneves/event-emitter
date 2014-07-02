event-emitter
=============

Simple event emitter for NodeJS and Browser

## Usage

Create new emitter

``` javascript
  var emitter = new EventEmitter();
```

### emitter.on

Attach a new event handler.

``` javascript
  emitter.on("ready", callback);
``` 

### emiiter.once

Attach a new event handler that will be executed only once.

``` javascript
  emitter.once("ready", callback);
```

### emitter.off

Detach a specific event handler.  If no `callback` is 
provided, then all event handlers will be removed.

``` javascript
  emitter.off("ready");
  emitter.off("ready", callback);
```

### emitter.emit 

Trigger the specified event. Any additional parameters
will be passed to the callback.

``` javascript
  emitter.emit("ready");
  emitter.emit("ready", param1, param2, paramN);
```

## Running tests

Install `jasmine-node` with `npm install jasmine-node -g` and
run tests with `jasmine-node emitter.spec.js`.

var EventEmitter = require("./event-emitter");

describe("EventEmitter", function() {

  var emitter, callback;

  beforeEach(function() {
    emitter = new EventEmitter();
    callback = jasmine.createSpy();
  });

  it("should run a callback multiple times", function() {
    emitter.on("event", callback);
    emitter.emit("event");
    emitter.emit("event");

    expect(callback.calls.length).toEqual(2);
  });

  it("should run a callback only once", function() {
    emitter.once("event", callback);
    emitter.emit("event");
    emitter.emit("event");

    expect(callback.calls.length).toEqual(1);
  });

  it("should raise no error when emitting a unknown event", function() {
    expect(function(){
      emitter.emit("unknown");
    }).not.toThrow();
  });

  it("should pass arguments to the callback", function() {
    emitter.on("event", callback);
    emitter.emit("event", 1, 2, 3);

    expect(callback.mostRecentCall.args).toEqual([1,2,3]);
  });

  it("should emit event to multiple callbacks", function() {
    var otherCallback = jasmine.createSpy();

    emitter.on("event", callback);
    emitter.on("event", otherCallback);
    emitter.emit("event");

    expect(callback).wasCalled();
    expect(otherCallback).wasCalled();
  });

  it("should return listeners for a given event", function() {
    var otherCallback = jasmine.createSpy(),
        yetAnotherCallback = jasmine.createSpy();

    emitter.on("event", callback);
    emitter.on("event", otherCallback);
    emitter.on("other event", yetAnotherCallback);

    expect(emitter.listeners("event").length).toEqual(2);
  });

  it("should return an empty listener array for unknown events", function() {
    expect(emitter.listeners("unknown")).toEqual([]);
  });

  it("should removes all listeners", function() {
    emitter.on("event", callback);
    emitter.on("event", callback);
    emitter.off("event");

    expect(emitter.listeners("event")).toEqual([]);
  });

  it("should remove an specific listener", function() {
    var otherCallback = jasmine.createSpy();

    emitter.on("event", callback);
    emitter.on("event", otherCallback);
    emitter.off("event", callback);

    expect(emitter.listeners("event").length).toEqual(1);
  });

});

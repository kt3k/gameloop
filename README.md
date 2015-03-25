# gameloop v0.0.0

> Simple game loop

# Usage

## Basic Usage

```js
var func = function () { /* ... */ };

var loop = gameloop(func);

loop.start();

setTimeout(function () {

    loop.stop();

}, 1000);
```

## Set fps

```js
var loop = gameloop(func);

loop.setFPS(60);

loop.start(); // func is called 60 times per second
```

In the above example `func` is called 60 time per second

# License

MIT

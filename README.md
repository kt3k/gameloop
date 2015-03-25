# gameloop v0.1.0

> Simple game loop

# Usage

## Basic Usage

```js
var func = function () { console.log('step'); };

var loop = gameloop(func);

loop.start();

setTimeout(function () {

    loop.stop();

}, 5000);
```

In the above example `func` is called 30 times per second and is stopped after 5 seconds.

## Set fps

```js
var loop = gameloop(func);

loop.setFPS(60);

loop.start(); // func is called 60 times per second
```

In the above example `func` is called 60 time per second.

# API

## start

Starts the game loop.

## stop

Stops the game loop.

## setFPS

Sets the fps of the loop. (Default fps is 30.)

# Install

## Node.js

```sh
npm install --save gameloopjs
```

```js
var gameloop = require('gameloopjs');


var loop = gameloop(function () { console.log('step'); });

loop.start();
```


## Browser

```sh
bower install --save gameloop
```

```html
<script src="path/to/gameloop.js"></script>

<script>

var loop = gameloop(function () {

    console.log('step');

});

</script>
```

# License

MIT

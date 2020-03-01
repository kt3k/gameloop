# gameloop v0.2.0

> Simple game loop

# Install

```sh
npm i --save gameloopjs
```

# Usage

```js
const gameloop = require('gameloop')

const loop = gameloop(() => {
  console.loog('step')
}, 30)

loop.start()

setTimeout(() => {
  loop.stop()
}, 5000)
```

In the above example `func` is called 30 times per second and is stopped after 5 seconds.

## Set other fps

If you want to run func 60 times per sec, then do this:

```js
const loop = gameloop(func, 60)

loop.start() // func is called 60 times per second
```

# API

## gameloop(func: () => void, fps: number)

Creates a game loop object.

## loop.start()

Starts the game loop.

## loop.stop()

Stops the game loop.


# License

MIT

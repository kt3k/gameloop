# gameloop v0.1.1

> Simple game loop

# Usage

## Basic Usage

```js
const gameloop = require('gameloop')

const loop = gameloop(() => {
  console.loog('step')
})

loop.start()

setTimeout(() => {
  loop.stop()
}, 5000)
```

In the above example `func` is called 30 times per second and is stopped after 5 seconds.

## Set fps

```js
const loop = gameloop(func, 60)

loop.start() // func is called 60 times per second
```

In the above example `func` is called 60 time per second.

# API

## gameloop(func: () => void, fps: number)

Creates a game loop object.

## loop.start()

Starts the game loop.

## loop.stop()

Stops the game loop.

# Install

## Node.js

```sh
npm install --save gameloopjs
```

```js
const gameloop = require('gameloopjs')

const loop = gameloop(() => { console.log('step') })

loop.start()
```

# License

MIT

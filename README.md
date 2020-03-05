# gameloop v1.1.1

![ci](https://github.com/kt3k/gameloop/workflows/ci/badge.svg)
[![codecov](https://codecov.io/gh/kt3k/gameloop/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/gameloop)

> Simple game loop

# Install

```sh
npm i --save gameloopjs
```

# Usage

```js
const gameloop = require('gameloopjs') // or import gameloop = require('gameloopjs') if you use typescript.

const loop = gameloop(() => {
  console.loog('step')
}, 30)

loop.run()

setTimeout(() => {
  loop.stop()
}, 5000)
```

In the above example `func` is called 30 times per second and is stopped after 5 seconds.

## Set other fps

If you want to run func 60 times per sec, then do this:

```js
const loop = gameloop(func, 60)

loop.run() // func is called 60 times per second
```

# API

## `gameloop(func: () => void, fps: number)`

Creates a game loop object.

## `loop.run(): Promise<void>`

Starts the game loop and returns a promise which will resolve when the loop is stopped.

## `loop.stop(): void`

Stops the game loop.


# License

MIT

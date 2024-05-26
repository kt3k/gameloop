# gameloop v1.4.0

![ci](https://github.com/kt3k/gameloop/workflows/ci/badge.svg)
[![codecov](https://codecov.io/gh/kt3k/gameloop/branch/main/graph/badge.svg)](https://codecov.io/gh/kt3k/gameloop)

> Simple game loop

# Install

```sh
npx jsr add @kt3k/gameloop
```

# Usage

```js
import { gameloop } from "@kt3k/gameloopjs";

const loop = gameloop(() => {
  console.loog("step");
}, 30);

loop.run();

setTimeout(() => {
  loop.stop();
}, 5000);
```

`func` is called 30 times per second and is stopped after 5 seconds.

## Set other fps

Set different number for fps:

```js
const loop = gameloop(func, 60);

loop.run(); // runs at 60 fps
```

# API

## `gameloop(func: () => void, fps: number)`

Creates a game loop object.

## `loop.run(): Promise<void>`

Starts the game loop and returns a promise which will resolve when the loop is
stopped.

This throws when it's called during it's already running.

## `loop.stop(): void`

Stops the game loop.

## `loop.isRunning: boolean`

Returns true iff the loop if running.

# License

MIT

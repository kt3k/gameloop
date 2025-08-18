# @kt3k/gameloop v1.6.1

![ci](https://github.com/kt3k/gameloop/workflows/ci/badge.svg)
[![codecov](https://codecov.io/gh/kt3k/gameloop/branch/main/graph/badge.svg)](https://codecov.io/gh/kt3k/gameloop)

> Simple game loop

# Install

```sh
npx jsr add @kt3k/gameloop
```

or, in Deno:

```sh
deno add @kt3k/gameloop
```

# Usage

```js
import { Gameloop } from "@kt3k/gameloopjs";

const loop = new Gameloop(30, () => {
  console.loog("step");
});

loop.start();

setTimeout(() => {
  loop.stop();
}, 5000);
```

`func` is called 30 times per second and is stopped after 5 seconds.

# API

See [API doc](https://jsr.io/@kt3k/gameloop/doc)

# License

MIT

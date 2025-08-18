import { Gameloop } from "./mod.ts";
import { assert, assertEquals, assertRejects, assertThrows } from "@std/assert";
import { assertSpyCalls, spy } from "@std/testing/mock";

Deno.test("gameloop", async () => {
  let cnt = 0;
  const fn = spy();
  const loop = new Gameloop(30, () => {
    cnt++;
    let a = 0;
    for (let i = 0; i < 100000; i++) {
      // Simulate some work
      a += i * i;
    }
  });
  loop.onStep(fn);

  setTimeout(() => {
    loop.stop();
  }, 1005);

  let run = loop.start();

  assert(loop.isRunning);

  await run;

  const x = cnt;
  // main loop is run with about 30 fps
  assert(cnt === 27 || cnt === 28 || cnt === 29 || cnt === 30);

  assertSpyCalls(fn, cnt);
  assert(fn.calls[0].args[0] === 30);
  assert(fn.calls[0].args[1] > 30);
  assert(fn.calls[cnt - 1].args[0] === 30);
  assert(fn.calls[cnt - 1].args[1] > 30);

  // cnt is not incremented anymore
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  assertEquals(cnt, x);

  // It throws at the 2nd run
  await assertRejects(async () => {
    const loop = new Gameloop(30, () => {
      cnt++;
    });
    setTimeout(() => {
      loop.stop();
    }, 0);
    run = loop.start();
    await loop.start(); // throws
  });

  await run;

  // It throws at the 2nd run
  assertThrows(() => {
    const loop = new Gameloop(30, () => {
      cnt++;
    });
    loop.stop(); // throws
  });
});

import { gameloop } from "./mod.ts";
import { assert, assertEquals, assertRejects, assertThrows } from "@std/assert";

Deno.test("gameloop", async () => {
  let cnt = 0;
  const loop = gameloop(() => {
    cnt++;
  }, 30);

  setTimeout(() => {
    loop.stop();
  }, 1005);

  let run = loop.run();

  assert(loop.isRunning);

  await run;

  const x = cnt;
  // main loop is run with about 30 fps
  assert(cnt === 27 || cnt === 28 || cnt === 29 || cnt === 30);

  // cnt is not incremented anymore
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  assertEquals(cnt, x);

  // It throws at the 2nd run
  await assertRejects(async () => {
    const loop = gameloop(() => {
      cnt++;
    }, 30);
    setTimeout(() => {
      loop.stop();
    }, 0);
    run = loop.run();
    await loop.run(); // throws
  });

  await run;

  // It throws at the 2nd run
  assertThrows(() => {
    const loop = gameloop(() => {
      cnt++;
    }, 30);
    loop.stop(); // throws
  });
});

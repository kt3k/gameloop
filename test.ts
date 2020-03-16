import gameloop = require('./gameloop')
import * as assert from 'assert'

async function test() {
  let cnt = 0
  const loop = gameloop(() => { cnt++ }, 30)

  setTimeout(async () => {
    loop.stop()
  }, 1005)

  const run = loop.run()

  assert(loop.isRunning())

  await run

  console.log(cnt)
  const x = cnt
  assert(cnt === 27 || cnt === 28 || cnt === 29 || cnt === 30)

  await new Promise(resolve => setTimeout(() => resolve(), 1000))
  assert.strictEqual(cnt, x)

  await assert.rejects(async () => {
    const loop = gameloop(() => { cnt++ }, 30)
    setTimeout(() => { loop.stop() }, 0)
    loop.run()
    await loop.run()
  })
}

test().catch(e => {
  console.log(e.stack)
  process.exit(1)
})

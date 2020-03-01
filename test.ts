import gameloop = require('./gameloop')
import * as assert from 'assert'

async function test() {
  let cnt = 0
  const loop = gameloop(() => { cnt++ }, 30)

  setTimeout(async () => {
    loop.stop()
  }, 1005)

  await loop.run()


  console.log(cnt)
  const x = cnt
  assert(cnt === 28 || cnt === 29)

  await new Promise(resolve => setTimeout(() => resolve(), 1000))
  assert.strictEqual(cnt, x)
}

test()

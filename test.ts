import gameloop = require('./gameloop')
import * as assert from 'assert'

assert(typeof gameloop === 'function')

let cnt = 0
const loop = gameloop(() => { cnt++ }, 30)
loop.start()

setTimeout(async () => {
  loop.stop()

  console.log(cnt)
  const x = cnt
  assert(cnt === 28 || cnt === 29)

  setTimeout(() => {
    assert.equal(cnt, x)
  }, 1000)
}, 1005)

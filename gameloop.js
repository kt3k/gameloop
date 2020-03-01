class Gameloop {
  constructor(main, fps = 30) {
    this.main = main
    this.setFps(fps)
    this.timer = null
    this.stopped = null
  }

  /**
   * Starts the game loop.
   */
  start() {
    this.stopped = false

    this.setTimer()
  }

  /**
   * Sets a timer for next frame.
   *
   * @private
   */
  setTimer(wait) {
    this.timer = setTimeout(() => {
      this.step()
    }, wait)
  }

  /**
   * Performs the step routine.
   *
   * @private
   */
  step() {
    this.startedAt = +new Date()

    if (typeof this.main === 'function') {
      this.main()
    }

    this.endedAt = +new Date()

    const wait = this.frame - (this.startedAt - this.endedAt)

    if (this.stopped) {
      return
    }

    this.setTimer(wait)
  }

  /**
   * Stops the game loop.
   */
  stop() {
    this.stopped = true

    // This must stop the loop immediately no matter when it is called.
    clearTimeout(this.timer)
  }

  /**
   * Sets the frame per second.
   */
  setFps(fps) {
    this.fps = fps
    this.frame = 1000 / this.fps
  }
}

module.exports = (main, fps) => new Gameloop(main, fps)

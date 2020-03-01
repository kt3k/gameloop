class Gameloop {
  main: () => void
  timer: number | undefined
  stopped: boolean
  startedAt: number | undefined
  endedAt: number | undefined
  frame: number
  fps: number
  constructor(main: () => void, fps = 30) {
    this.main = main
    this.fps = fps
    this.frame = 1000 / fps
    this.stopped = true
  }

  /**
   * Starts the game loop.
   */
  start(): void {
    this.stopped = false

    this.setTimer(0)
  }

  /**
   * Sets a timer for next frame.
   *
   * @private
   */
  setTimer(wait: number): void {
    this.timer = setTimeout(() => {
      this.step()
    }, wait)
  }

  /**
   * Performs the step routine.
   *
   * @private
   */
  step(): void {
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
  stop(): void {
    this.stopped = true

    // This must stop the loop immediately no matter when it is called.
    clearTimeout(this.timer)
  }
}

export = (main: () => void, fps: number) => new Gameloop(main, fps)

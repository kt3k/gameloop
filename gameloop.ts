class Gameloop {
  main: () => void
  timer: any
  frame: number
  constructor(main: () => void, fps: number) {
    this.main = main
    this.frame = 1000 / fps
  }

  /**
   * Starts the game loop.
   */
  start(): void {
    this.step()
  }

  /**
   * Performs the step routine.
   */
  step = (): void => {
    const startedAt = +new Date()
    this.main()
    const endedAt = +new Date()
    const wait = this.frame - (startedAt - endedAt)
    this.timer = setTimeout(this.step, wait)
  }

  /**
   * Stops the game loop.
   */
  stop(): void {
    // This must stop the loop immediately no matter when it is called.
    clearTimeout(this.timer)
  }
}

export = (main: () => void, fps: number) => new Gameloop(main, fps)

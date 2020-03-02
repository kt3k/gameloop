class Gameloop {
  main: () => void
  timer: any
  frame: number
  resolve: any
  constructor(main: () => void, fps: number) {
    this.main = main
    this.frame = 1000 / fps
  }

  /**
   * Starts the game loop.
   */
  run(): Promise<void> {
    return new Promise((resolve, _) => {
      this.resolve = resolve
      this.step()
    })
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
    this.resolve()
    clearTimeout(this.timer)
  }
}

export = (main: () => void, fps: number) => new Gameloop(main, fps)

/**
 * Gameloop object of the given main function and fps (frames per second).
 *
 * @example
 * ```ts
 * import { Gameloop } from "jsr:@kt3k/gameloop";
 *
 * const loop = new Gameloop(60, () => {
 *   // draw something in screen
 * });
 *
 * loop.run();
 *
 * // stop the loop after 10 seconds
 * setTimeout(() => {
 *  loop.stop();
 * }, 10000);
 * ```
 *
 * @param fps The number of frames per second.
 * @param main The main function to be called in each frame.
 * @returns A gameloop object.
 */
export class Gameloop {
  #main: () => void;
  #timer: number | undefined;
  #frame: number;
  #resolve: undefined | (() => void);
  #onStep: undefined | ((fps: number, v: number) => void);
  #fps: number;
  constructor(fps: number, main: () => void) {
    this.#main = main;
    this.#fps = fps;
    this.#frame = 1000 / fps;
  }

  /** Starts the game loop. */
  start(): Promise<void> {
    if (this.#resolve) {
      return Promise.reject(new Error("The gameloop is already running."));
    }
    return new Promise<void>((resolve, _) => {
      this.#resolve = resolve;
      this.#step();
    });
  }

  /** Returns true iff the loop is running. */
  get isRunning(): boolean {
    return this.#resolve != null;
  }

  /** Performs the step routine. */
  #step = (): void => {
    const startedAt = performance.now();
    this.#main();
    const endedAt = performance.now();
    const duration = endedAt - startedAt;
    const wait = this.#frame - duration;
    const v = 1000 / duration;
    const fps = Math.min(v, this.#fps);
    if (this.#onStep) {
      this.#onStep(fps, v);
    }
    this.#timer = setTimeout(this.#step, wait);
  };

  /** Stops the game loop. */
  stop(): void {
    if (!this.#resolve) {
      throw new Error("The gameloop isn't running.");
    }
    this.#resolve();
    this.#resolve = undefined;
    clearTimeout(this.#timer);
  }

  onStep(callback: undefined | ((fps: number, v: number) => void)): void {
    this.#onStep = callback;
  }
}

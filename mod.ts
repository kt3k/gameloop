/**
 * A simple game loop library.
 *
 * @module
 */

export interface Gameloop {
  run(): Promise<void>;
  stop(): void;
  get isRunning(): boolean;
}

class GameloopImpl {
  main: () => void;
  timer: number | undefined;
  frame: number;
  resolve: any;
  constructor(main: () => void, fps: number) {
    this.main = main;
    this.frame = 1000 / fps;
  }

  /** Starts the game loop. */
  run(): Promise<void> {
    if (this.resolve) {
      return Promise.reject(new Error("The gameloop is already running."));
    }
    return new Promise<void>((resolve, _) => {
      this.resolve = resolve;
      this.#step();
    });
  }

  /** Returns true iff the loop is running. */
  get isRunning(): boolean {
    return this.resolve != null;
  }

  /** Performs the step routine. */
  #step = (): void => {
    const startedAt = Date.now();
    this.main();
    const endedAt = Date.now();
    const wait = this.frame - (startedAt - endedAt);
    this.timer = setTimeout(this.#step, wait);
  };

  /** Stops the game loop. */
  stop(): void {
    if (!this.resolve) {
      console.warn("The gameloop isn't running.");
      return;
    }
    this.resolve();
    delete this.resolve;
    clearTimeout(this.timer);
  }
}

/**
 * Creates a gameloop object from the given main function and fps (frames per second).
 *
 * @example
 * ```ts
 * import { gameloop } from "@kt3k/gameloop";
 *
 * const loop = gameloop(() => {
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
 * @param main The main function to be called in each frame.
 * @param fps The number of frames per second.
 * @returns A gameloop object.
 */
export function gameloop(main: () => void, fps: number): Gameloop {
  return new GameloopImpl(main, fps);
}

/** Gameloop object interface */
export interface Gameloop {
  /** Starts the game loop */
  run(): Promise<void>;
  /** Stops the game loop */
  stop(): void;
  /** Returns true iff the loop is running */
  get isRunning(): boolean;
  /** Register callback which called each step of the frame with the current fps. */
  onStep(callback: (fps: number) => void): void;
}

class GameloopImpl {
  #main: () => void;
  #timer: number | undefined;
  #frame: number;
  #resolve: undefined | (() => void);
  #onStep: undefined | ((fps: number) => void);
  #fps: number;
  constructor(main: () => void, fps: number) {
    this.#main = main;
    this.#fps = fps;
    this.#frame = 1000 / fps;
  }

  /** Starts the game loop. */
  run(): Promise<void> {
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
    const startedAt = Date.now();
    this.#main();
    const endedAt = Date.now();
    const duration = endedAt - startedAt;
    const wait = this.#frame - duration;
    const fps = Math.min(1000 / duration, this.#fps);
    if (this.#onStep) {
      this.#onStep(fps);
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

  onStep(callback: undefined | ((fps: number) => void)): void {
    this.#onStep = callback;
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

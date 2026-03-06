class _PomodoroStore {

    #value = $state(25 * 60)
    #interval = $state<NodeJS.Timeout | null>(null)

    constructor() {

    }

    /*
    |----------------
    | Getters
    |----------------
    */

    get value(): string {
        return this.convert()
    }

    get interval(): NodeJS.Timeout | null {
        return this.#interval
    }

    /*
    |----------------
    | Setters
    |----------------
    */
    set value(v: number) {
        this.#value = v
    }

    /*
    |----------------
    | Methods
    |----------------
    */

    /**
     * Converts the number of seconds into a formatted output 00:00
     * @returns string
     */
    private convert() {
        const _s = this.#value
        const minutes = Math.floor(_s / 60);
        const seconds = _s % 60;

        // Optional: Add leading zeros for consistent formatting (e.g., 05:02 instead of 5:2)
        const formattedMinutes = minutes.toString().padStart(2, '0')
        const formattedSeconds = seconds.toString().padStart(2, '0')

        return `${formattedMinutes}:${formattedSeconds}`
    }

    /**
     * Adds time to the pomodoro 
     * @param v
     * @returns void
     */
    plus(v: number = 60): void {
        this.#value += v
    }

    /**
     * Substract time from the pomodoro
     * @param v
     * @returns void
     */
    minus(v: number = 60): void {
        this.#value -= v
    }

    start() {
        this.#interval = setInterval(() => {
            this.#value -= 1
        }, 1000)
    }

    stop() {
        if (this.#interval !== null) {
            clearInterval(this.#interval)
            this.#interval = null
        }
    }

    break(seconds: number) {
        this.stop()
        this.#value = seconds
    }
}

export const PomodoroStore = new _PomodoroStore()
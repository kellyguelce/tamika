import type { RadioStationsRecord } from "$lib/pocketbase-types"
import type { _StationStore } from "../station"

class _RadioStore {
    /**
     * The currently playing station 
     */
    station = $state<RadioStationsRecord | null>(null)

    isPlaying = $state(false)
    element = $state<HTMLAudioElement | null>(null)

    /*
    |--------------------
    | Getters
    |--------------------
    */

    /*
    |--------------------
    | Setters
    |--------------------
    */

    /*
    |--------------------
    | Methods
    |--------------------
    */

    setStation(station: RadioStationsRecord | undefined): this {
        if (station && station != this.station) {
            this.station = station

            if (this.element !== null) this.element.load()
        }

        return this
    }

    play(station?: RadioStationsRecord): void {
        /**
         * Guard clause:
         * - Stop if there's no audio element
         * - Stop if already playing and no new station is requested
         */
        if (
            this.element == null ||
            (this.isPlaying && station === undefined)
        ) {
            return
        }

        // If a station is provided, update it
        if (station !== undefined) {
            this.setStation(station)
        }

        // If there's still no station set, stop
        if (this.station == null) {
            return
        }

        this.isPlaying = true
        this.element.play().catch(console.error)
    }

    pause(): void {
        if (this.element == null) return
        this.isPlaying = false
        this.element.pause()
    }


}

const RadioStore = new _RadioStore()
export default RadioStore

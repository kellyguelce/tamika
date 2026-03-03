import type { RadioStationsRecord } from "$lib/pocketbase-types"

class _RadioStore {

    #stations = $state<RadioStationsRecord[]>([])
    #station = $state<RadioStationsRecord | null>(null)

    constructor() { }

    /**
    |-------------------
    | Getters
    |-------------------
    */
    get stations() {
        return this.#stations
    }

    get station() {
        return this.#station
    }

    /**
    |-------------------
    | Setters
    |-------------------
    */
    set stations(stations: RadioStationsRecord[]) {
        this.#stations = stations
    }

    set station(value: RadioStationsRecord | null) {
        this.#station = value
    }

    /**
    |-------------------
    | Methods
    |-------------------
    */

    init(stations: RadioStationsRecord[]) {
        this.#stations = stations
        this.#station = this.randomStation()
    }

    randomStation() {
        return this.#stations.toSorted(() => Math.random() - 0.5)[0]
    }

}

export const RadioStore = new _RadioStore()

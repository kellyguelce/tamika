import type { RadioStationsRecord } from "$lib/pocketbase/pocketbase-types"

export class _StationStore {
    stations = $state<RadioStationsRecord[]>([])

    load(stations: RadioStationsRecord[]): this {
        this.stations = stations
        return this
    }

    randomStation() {
        return this.stations[Math.floor(Math.random() * this.stations.length)];
    }
}

const StationStore = new _StationStore()
export default StationStore
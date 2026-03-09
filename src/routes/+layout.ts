import { pocketbase, type RadioStationsRecord } from "$lib/pocketbase"
import type { LayoutLoad } from "./$types"

export const ssr = false
export const prerender = true

export const load: LayoutLoad = async ({ fetch }) => {

    let stations: RadioStationsRecord[] = []

    try {
        stations = await pocketbase.collection('radio_stations').getFullList({
            fetch
        })

    } catch (error) {
    }

    return {
        stations
    }

}
import { pocketbase } from "$lib/pocketbase/pocketbase"
import type { BgsRecord, RadioStationsRecord } from "$lib/pocketbase/pocketbase-types"
import type { LayoutLoad } from "./$types"

export const ssr = false
export const prerender = true

export const load: LayoutLoad = async ({ fetch }) => {

    let stations: RadioStationsRecord[] = [],
        defaultBackground: BgsRecord | null = null

    try {
        stations = await pocketbase.collection('radio_stations').getFullList({
            fetch
        })

    } catch (error) {
    }

    return {
        stations,
    }

}
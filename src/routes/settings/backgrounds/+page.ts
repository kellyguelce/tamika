import { pocketbase } from "$lib/pocketbase"
import type { BgsRecord } from "$lib/pocketbase"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {

    const bgs: BgsRecord[] = await pocketbase.collection('bgs').getFullList({ fetch })

    return {
        backgrounds: bgs
    }

}
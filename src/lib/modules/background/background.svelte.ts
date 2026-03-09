import { browser } from "$app/environment"
import { pocketbase } from "$lib/pocketbase"
import type { BgsRecord } from "$lib/pocketbase/pocketbase-types"
import { DefaultBackground, type Background } from "./background.defs"

class _BackgroundStore {
    localStorageItemName = 'background'
    #background = $state<BgsRecord>()
    backgrounds = $state<BgsRecord[]>([])

    constructor() {
        /**
         * Get the background from localstorage
         */
        if (browser) {
            const bg = localStorage.getItem(this.localStorageItemName)
            if (!bg) throw new Error('Whoops! An unexpected error occured.')
            this.#background = JSON.parse(bg)
        }
    }

    get background() {
        if (!this.#background) return
        return pocketbase.files.getUrl(this.#background, this.#background.file)
    }

    getCachedBackground() {
        return localStorage.getItem(this.localStorageItemName)
    }

}


export const BackgroundStore = new _BackgroundStore()

interface InitParams {
    backgrounds: BgsRecord[]
}
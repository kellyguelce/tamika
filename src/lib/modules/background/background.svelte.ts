import { browser } from "$app/environment"
import { pocketbase } from "$lib/pocketbase/pocketbase"
import type { BgsRecord } from "$lib/pocketbase/pocketbase-types"
import { DefaultBackground, type Background } from "./background.defs"

class _BackgroundStore {
    localStorageItemName = 'background'
    #background = $state<BgsRecord | null>(null)
    backgrounds = $state<BgsRecord[]>([])

    constructor() {
        this.init()
    }

    get background() {
        if (!this.#background) throw new Error("Whoops! No background")
        return this.#background
    }

    set background(bg: BgsRecord) {
        this.#background = bg
        localStorage.setItem(this.localStorageItemName, JSON.stringify(bg))
    }

    get backgroundUrl() {
        if (!this.#background) throw new Error("Whoops! No background")
        return pocketbase.files.getURL(this.#background, this.#background.file)
    }

    async init() {
        if (!browser) throw new Error("whoopsie")
        let cachedBg = this.getCachedBackground()
        if (cachedBg) {
            this.#background = JSON.parse(cachedBg) as BgsRecord
            return
        }

        let defaultBg = await pocketbase.collection('bgs').getOne('va9h4fckka1ufv9', {
            fetch
        })

        this.#background = defaultBg

        return localStorage.setItem(this.localStorageItemName, JSON.stringify(defaultBg))
    }

    getCachedBackground() {
        return localStorage.getItem(this.localStorageItemName)
    }

}


export const BackgroundStore = new _BackgroundStore()
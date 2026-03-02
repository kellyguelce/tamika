import { DefaultBackground, type Background } from "./background.defs"

class _BackgroundStore {

    #background = $state<Background>(DefaultBackground)

    constructor(background?: Background) {
        this.#background = background || DefaultBackground
    }

    get url() {
        return this.#background.animated
            ? `/bg/${this.#background.filename}.mp4`
            : `/bg/${this.#background.filename}.jpg`
    }

}


export const BackgroundStore = new _BackgroundStore()
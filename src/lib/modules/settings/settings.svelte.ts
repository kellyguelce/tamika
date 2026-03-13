import type { SettingBox } from "./settings.defs"

class Settings {

    currentSettingsBox = $state<SettingBox | null>(null)

    openBox(box: SettingBox) {
        this.currentSettingsBox = box
    }

    closeBox() {
        this.currentSettingsBox = null
    }

}

export const SettingsStore = new Settings()
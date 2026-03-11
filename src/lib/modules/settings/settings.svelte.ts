import type { SettingBox } from "./settings.defs"

class Settings {

    currentSettingsBox = $state<SettingBox | null>(null)

}

export const SettingsStore = new Settings()
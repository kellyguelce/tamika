import type { UsersRecord } from "$lib/pocketbase/pocketbase-types"

class _Auth {
    authenticated = $state(false)

    init() {
    }
}

export const AuthStore = new _Auth()
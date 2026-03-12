import { resetUserSession } from "$lib/modules/auth/auth.utls";
import { pocketbase } from "./pocketbase";
import type { FileNameString } from "./pocketbase-types";

interface Record {
    [key: string]: any
}

export function pbFileUrl(
    record: Record,
    filename: string | FileNameString,
    _thumb: string = '100x100',
    download: boolean = false
) {
    let _fileurl = pocketbase.files.getURL(record, filename, { 'thumb': _thumb })
    if (download) _fileurl = _fileurl + '&download=1'
    return _fileurl
}

/*
|--------------------
| Auth
|--------------------
*/
export function authCheck(): boolean {
    return pocketbase.authStore.isValid
}

export async function pbLoginWithPassword(email: string, password: string) {
    return await pocketbase.collection('users').authWithPassword(email, password)
}

export async function pbLogout() {
    resetUserSession()
    return pocketbase.authStore.clear()
}
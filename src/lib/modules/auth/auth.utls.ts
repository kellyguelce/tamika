import { pocketbase } from "$lib/pocketbase/pocketbase";
import type { UsersRecord } from "$lib/pocketbase/pocketbase-types";
import { getUser } from "./auth.actions";
import { SessionStorageAuthSessionItem } from "./auth.defs";

/**
 * Use the 1st part of the email as username and cap it at 10 chars max
 * @param email
 */
export function generateUsername(email: string): string {
    const name = email.split('@')[0];
    return name.substring(0, 10);
}

export async function authUser(): Promise<UsersRecord | null> {
    if (!pocketbase.authStore.isValid || !pocketbase.authStore.record) throw new Error("This should not be called")

    let user = sessionStorage.getItem(SessionStorageAuthSessionItem)


    if (user === null) {
        return await getUser(pocketbase.authStore.record!.id)
    }

    return JSON.parse(user) as UsersRecord
}

export function setUserSession(user: UsersRecord) {
    return sessionStorage.setItem(SessionStorageAuthSessionItem, JSON.stringify(user))
}

export function getUserSession() {
    const sess = sessionStorage.getItem(SessionStorageAuthSessionItem)
    if (sess === null) return sess
    return JSON.parse(sess)
}

export function resetUserSession() {
    return sessionStorage.removeItem(SessionStorageAuthSessionItem)
}
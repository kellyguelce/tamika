import { pocketbase } from "$lib/pocketbase/pocketbase";
import { generateUsername } from "./auth.utls";

export async function createUser(email: string, password: string) {
    return await pocketbase.collection('users').create({
        email,
        password,
        emailVisibility: true,
        name: generateUsername(email),
        passwordConfirm: password
    })
}

export async function getUser(id: string) {
    return await pocketbase.collection('users').getOne(id)
}


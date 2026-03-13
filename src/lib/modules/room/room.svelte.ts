import { browser } from "$app/environment"
import { pocketbase } from "$lib/pocketbase/pocketbase"
import type { RoomsRecord } from "$lib/pocketbase/pocketbase-types"
import { authUser } from "../auth/auth.utls"
import { SessionStorageRoomItemName } from "./room.defs"
import { generateRoomCode } from "./room.utls"

class Room {

    #room = $state<RoomsRecord | null>(null)

    constructor() {
        const sessionRoom = sessionStorage.getItem(SessionStorageRoomItemName)
        if (sessionRoom !== null) {
            this.#room = JSON.parse(sessionRoom)
        }
    }

    get room() {
        return this.#room
    }

    set room(_room: RoomsRecord | null) {
        this.#room = _room
        sessionStorage.setItem(SessionStorageRoomItemName, JSON.stringify(_room))
    }

    async join(roomCode: string, userID: string) {
        try {
            const _room = await pocketbase.collection('rooms').getFirstListItem(`code="${roomCode}"`)
            if (_room) {
                await pocketbase.collection('rooms').update(_room.id, {
                    "members+": userID
                })
                this.room = _room
            } else {
                throw new Error("Room not found")
            }
        } catch (error) {
            return false
        }
    }

    async create(userId: string): Promise<{ ok: boolean, message: string }> {
        const roomCode = generateRoomCode()
        try {
            const createdRoom = await pocketbase.collection('rooms').create({
                name: `RO${roomCode}`,
                code: roomCode,
                members: [userId],
                createdBy: userId
            })

            this.room = createdRoom

            return {
                ok: true,
                message: this.room.code
            }

        } catch (error: any) {
            if (error instanceof Error) {
                return {
                    ok: false,
                    message: error.message
                }
            } else {
                return {
                    ok: false,
                    message: 'unknown'
                }
            }
        }
    }

}

export const RoomStore = new Room()
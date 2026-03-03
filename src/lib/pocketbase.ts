import PocketBase from 'pocketbase'
import type { TypedPocketBase } from './pocketbase-types'

export const pocketbase = new PocketBase("http://localhost:8090") as TypedPocketBase
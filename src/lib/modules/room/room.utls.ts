export function generateRoomCode(min = 5, max = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const length = Math.floor(Math.random() * (max - min + 1)) + min

    const array = new Uint32Array(length)
    crypto.getRandomValues(array)

    let code = ''
    for (let i = 0; i < length; i++) {
        code += chars[array[i] % chars.length]
    }

    return code
}
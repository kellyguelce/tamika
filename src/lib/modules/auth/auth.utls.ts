/**
 * Use the 1st part of the email as username and cap it at 10 chars max
 * @param email
 */
export function generateUsername(email: string): string {
    const name = email.split('@')[0];
    return name.substring(0, 10);
}
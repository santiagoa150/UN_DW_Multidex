import * as crypto from 'node:crypto';

/**
 * Domain service for creating a user password.
 */
export class UserPassword {
    /**
     * Creates a password for a user.
     * @param userId - The user's unique identifier.
     * @param rawPassword - The user's raw password.
     * @returns The hashed password.
     */
    static create(userId: string, rawPassword: string): string {
        return crypto
            .createHash('sha256')
            .update(userId + rawPassword)
            .digest('hex');
    }
}

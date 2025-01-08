import * as crypto from 'node:crypto';

/**
 * Application service for creating a user password.
 */
export class CreateUserPasswordApplication {
    /**
     * Creates a password for a user.
     * @param userId - The user's unique identifier.
     * @param rawPassword - The user's raw password.
     */
    exec(userId: string, rawPassword: string): string {
        return crypto
            .createHash('sha256')
            .update(userId + rawPassword)
            .digest('hex');
    }
}

import * as crypto from 'node:crypto';

/**
 * User password value object.
 */
export class UserPassword {
    private static readonly regExp: RegExp = new RegExp(/^(?=.*\d)(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[^\p{L}\d])\S{8,}$/u);

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

    /**
     * Validates a password.
     * @param password - The password to validate.
     * @returns True if the password is valid, false otherwise.
     */
    static validate(password: string): boolean {
        return this.regExp.test(password);
    }
}

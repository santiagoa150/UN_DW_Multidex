/**
 * Interface for user repository
 */
export interface UserRepository {
    /**
     * Service to log in a user.
     * @param email - The user email.
     * @param password - The user password.
     * @returns The user token if the user was logged in successfully, otherwise undefined.
     */
    login(email: string, password: string): Promise<string | undefined>;
}

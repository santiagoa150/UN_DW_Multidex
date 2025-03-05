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

    /**
     * Service to signup a new user.
     * @param email - The new user email.
     * @param names - The new user names.
     * @param username  - The username for the new user.
     * @param lastNames - The new user lastnames.
     * @param password - The new user password.
     * @returns .
     */
    signup(email: string, names: string, username: string, lastNames: string, password: string): Promise<boolean>;
}

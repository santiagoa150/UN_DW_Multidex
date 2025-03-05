import { UserRepository } from '../../domain/interfaces/user.repository.ts';

/**
 * Application to log in a user.
 */
export class SignupApplication {
    /**
     * @param _repository - The user repository.
     */
    constructor(private readonly _repository: UserRepository) {}

    /**
     * Executes the application.
     * @param email - The new user email.
     * @param names - The new user names.
     * @param username  - The username for the new user.
     * @param lastNames - The new user lastnames.
     * @param password - The new user password.
     * @returns `true` if the user was signed up successfully, `false` otherwise.
     */
    async exec(email: string, names: string, username: string, lastNames: string, password: string): Promise<boolean> {
        const successfulSignup = await this._repository.signup(email, names, username, lastNames, password);
        if (!successfulSignup) return false;
        return true;
    }
}

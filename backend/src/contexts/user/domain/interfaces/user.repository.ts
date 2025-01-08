import { User } from '../user';

/**
 * Interface for user repository.
 */
export interface UserRepository {
    /**
     * Get user by email.
     * @param email The email to search for.
     * @returns The user if found, otherwise undefined.
     */
    getByEmail(email: string): Promise<User | undefined>;
}

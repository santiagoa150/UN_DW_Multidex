import { User } from '../user';

/**
 * Interface for user repository.
 */
export interface UserRepository {
    /**
     * Create a user.
     * @param user - The user to create.
     */
    create(user: User): Promise<void>;

    /**
     * Get user by email.
     * @param email - The email to search for.
     * @returns The user if found, otherwise undefined.
     */
    getByEmail(email: string): Promise<User | undefined>;

    /**
     * Get user by id.
     * @param userId - The user id to search for.
     * @returns The user if found, otherwise undefined.
     */
    getById(userId: string): Promise<User | undefined>;
}

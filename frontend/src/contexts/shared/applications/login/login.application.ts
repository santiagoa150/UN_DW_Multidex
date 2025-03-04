import { UserRepository } from '../../domain/interfaces/user.repository.ts';
import { LocalStorageRepository } from '../../infrastructure/local-storage/local-storage.repository.ts';
import { SharedStorageConstants } from '../../domain/constants/shared-storage.constants.ts';

/**
 * Application to log in a user.
 */
export class LoginApplication {
    /**
     * @param _repository - The user repository.
     * @param _storage - The local storage repository.
     */
    constructor(
        private readonly _repository: UserRepository,
        private readonly _storage: LocalStorageRepository,
    ) {}

    /**
     * Executes the application.
     * @param email - The user email.
     * @param password - The user password.
     * @returns `true` if the user was logged in successfully, `false` otherwise.
     */
    async exec(email: string, password: string): Promise<boolean> {
        const accessToken = await this._repository.login(email, password);
        if (!accessToken) return false;
        await this._storage.set(SharedStorageConstants.AUTH_TOKEN, accessToken);
        return true;
    }
}

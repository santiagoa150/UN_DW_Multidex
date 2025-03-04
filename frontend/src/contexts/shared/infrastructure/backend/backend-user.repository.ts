import { UserRepository } from '../../domain/interfaces/user.repository.ts';
import axios from 'axios';
import { BackendUserConstants } from './backend-user.constants.ts';

/**
 * Repository to manage the user in the backend.
 */
export class BackendUserRepository implements UserRepository {
    /**
     * Service to log in a user.
     * @param email - The user email.
     * @param password - The user password.
     * @returns The user token if the user was logged in successfully, otherwise undefined.
     */
    async login(email: string, password: string): Promise<string | undefined> {
        try {
            const { accessToken } = await axios
                .post<{ accessToken: string }>(
                    BackendUserConstants.POST_LOGIN_OPERATION,
                    {
                        email,
                        password,
                    },
                    { baseURL: import.meta.env.VITE_BACKEND_BASE_URL },
                )
                .then((res) => res.data);
            return accessToken;
        } catch {
            return undefined;
        }
    }
}

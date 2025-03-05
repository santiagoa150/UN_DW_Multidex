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

    /**
     * Service to signup a new user.
     * @param email - The new user email.
     * @param names - The new user names.
     * @param username  - The username for the new user.
     * @param lastNames - The new user lastnames.
     * @param password - The new user password.
     * @returns `true` if the user was signed up successfully, `false` otherwise.
     */
    async signup(
        email: string,
        names: string,
        username: string,
        lastNames: string,
        password: string,
    ): Promise<boolean> {
        try {
            await axios.post(
                BackendUserConstants.POST_SIGNUP_OPERATION,
                {
                    names,
                    lastNames,
                    username,
                    email,
                    password,
                },
                { baseURL: import.meta.env.VITE_BACKEND_BASE_URL },
            );
            return true; // Signup successful
        } catch {
            return false; // Signup failed
        }
    }
}

import { Logger } from '@nestjs/common';
import { UserAuthData } from '../../domain/user-auth-data';
import { QueryBus } from '@nestjs/cqrs';
import { User } from '../../domain/user';
import { GetUserByEmailQuery } from '../get/by-email/get-user-by-email.query';
import { UserPassword } from '../../domain/user-password';

/**
 * The `LoginApplication` class is responsible for logging in a user.
 */
export class LoginApplication {
    private readonly _logger = new Logger(LoginApplication.name);

    /**
     * @param _queryBus - The query bus used to dispatch queries.
     */
    constructor(private readonly _queryBus: QueryBus) {}

    /**
     * Application to log in a user
     * @param email - The user's email address
     * @param password - The user's password
     * @returns A promise that resolves to a `UserAuthData` object containing authentication information, or `undefined` if validation fails.
     */
    async exec(email: string, password: string): Promise<UserAuthData | undefined> {
        this._logger.log(`[${this.exec.name}] INIT :: email: ${email}`);
        const user: User = await this._queryBus.execute<GetUserByEmailQuery, User>(
            new GetUserByEmailQuery(email, false),
        );
        let authData: UserAuthData | undefined = undefined;
        if (user) {
            if (UserPassword.create(user.userId, password) === user.password) {
                authData = { userId: user.userId };
            }
        }
        this._logger.log(`[${this.exec.name}] FINISH :: authData: ${authData}`);
        return authData;
    }
}

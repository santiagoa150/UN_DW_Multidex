import { TokenRepository } from '../../../../shared/domain/interfaces/token.repository';
import { Logger } from '@nestjs/common';
import { UserAuthData } from '../../../domain/user-auth-data';
import * as process from 'node:process';

/**
 * The `ValidateUserAccessTokenApplication` class is a service for validating user access tokens.
 */
export class ValidateUserAccessTokenApplication {
    private readonly _logger: Logger = new Logger(ValidateUserAccessTokenApplication.name);

    /**
     * @param _repository - The token repository.
     */
    constructor(private readonly _repository: TokenRepository) {}

    /**
     * Validates a user access token.
     * @param accessToken - The access token to validate.
     * @returns `UserAuthData` - The user authentication data if the token is valid, otherwise `undefined`.
     */
    async exec(accessToken: string): Promise<UserAuthData | undefined> {
        this._logger.log(`[${this.exec.name}] INIT :: Validating access token`);
        const authData: UserAuthData | undefined = this._repository.verify<UserAuthData>(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
        );
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return authData;
    }
}

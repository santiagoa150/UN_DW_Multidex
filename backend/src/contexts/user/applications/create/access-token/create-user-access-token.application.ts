import { Logger } from '@nestjs/common';
import { TokenRepository } from '../../../../shared/domain/interfaces/token.repository';
import { UserAuthData } from '../../../domain/user-auth-data';
import * as process from 'node:process';

/**
 * The `CreateUserAccessTokenApplication` class is a service for creating access tokens for users.
 */
export class CreateUserAccessTokenApplication {
    private readonly _logger: Logger = new Logger(CreateUserAccessTokenApplication.name);

    /**
     * @param _repository - The token repository.
     */
    constructor(private readonly _repository: TokenRepository) {}

    /**
     * Creates an access token for a user.
     * @param authData - The user authentication data.
     * @returns `string` - The access token.
     */
    exec(authData: UserAuthData): string {
        this._logger.log(`[${this.exec.name}] INIT :: Generating access token for user ${authData.userId}`);
        const accessToken = this._repository.sign<UserAuthData>(
            authData,
            process.env.ACCESS_TOKEN_SECRET,
            Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME),
        );
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return accessToken;
    }
}

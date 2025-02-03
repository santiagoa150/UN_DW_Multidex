import { UserRepository } from '../../../domain/interfaces/user.repository';
import { User } from '../../../domain/user';
import { Logger } from '@nestjs/common';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

/**
 * Application for getting a user by email.
 */
export class GetUserByEmailApplication {
    private readonly _logger: Logger = new Logger(GetUserByEmailApplication.name);

    /**
     * @param _repository - The user repository.
     */
    constructor(private readonly _repository: UserRepository) {}

    async exec(email: string, throwExceptionIfNotFound: boolean = true): Promise<User | undefined> {
        this._logger.log(`[${this.exec.name}] INIT :: email: ${email}`);
        const user: User = await this._repository.getByEmail(email);
        if (!user && throwExceptionIfNotFound) throw new UserNotFoundException();
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return user;
    }
}

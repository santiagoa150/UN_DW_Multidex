import { UserRepository } from '../../../domain/interfaces/user.repository';
import { User } from '../../../domain/user';
import { Logger } from '@nestjs/common';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

/**
 * Application to get a user by its id.
 */
export class GetUserByIdApplication {
    private readonly _logger: Logger = new Logger(GetUserByIdApplication.name);

    /**
     * @param _repository - The user repository.
     */
    constructor(private readonly _repository: UserRepository) {}

    async exec(userId: string): Promise<User> {
        this._logger.log(`[${this.exec.name}] INIT :: userId: ${userId}`);
        const user: User = await this._repository.getById(userId);
        if (!user) throw new UserNotFoundException();
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return user;
    }
}

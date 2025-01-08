import { UserRepository } from '../../../domain/interfaces/user.repository';
import { User } from '../../../domain/user';
import { Logger } from '@nestjs/common';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

/**
 * Application for getting a user by email.
 */
export class GetUserByEmailApplication {
    /**
     * @param logger - Class used for logging.
     * @param repository - The user repository.
     */
    constructor(
        private readonly logger: Logger,
        private readonly repository: UserRepository,
    ) {}

    async exec(email: string, throwExceptionIfNotFound: boolean = true): Promise<User | undefined> {
        this.logger.log(`[${this.exec.name}] INIT :: email: ${email}`);
        const user: User = await this.repository.getByEmail(email);
        if (!user && throwExceptionIfNotFound) throw new UserNotFoundException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return user;
    }
}

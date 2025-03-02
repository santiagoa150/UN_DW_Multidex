import { Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { QueryBus } from '@nestjs/cqrs';
import { UserEmail } from '../../domain/user-email';
import { UserEmailNotValidException } from '../../domain/exceptions/user-email-not-valid.exception';
import { GetUserByEmailQuery } from '../get/by-email/get-user-by-email.query';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';
import { UserPassword } from '../../domain/user-password';
import { UserPasswordNotValidException } from '../../domain/exceptions/user-password-not-valid.exception';
import { v4 as uuidV4 } from 'uuid';
import { User } from '../../domain/user';

/**
 * Application service for signing up a user.
 */
export class SignUpApplication {
    private readonly _logger: Logger = new Logger(SignUpApplication.name);

    /**
     * @param _queryBus - The query bus.
     * @param _repository - The user repository.
     */
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _repository: UserRepository,
    ) {}

    async exec(email: string, names: string, username: string, lastNames: string, password: string): Promise<void> {
        this._logger.log(`[${this.exec.name}] INIT :: email ${email} username ${username}`);
        if (!UserEmail.validate(email)) throw new UserEmailNotValidException();
        const currentUser = await this._queryBus.execute<GetUserByEmailQuery>(new GetUserByEmailQuery(email, false));
        if (currentUser) throw new UserAlreadyExistsException();
        if (!UserPassword.validate(password)) throw new UserPasswordNotValidException();
        const userId: string = uuidV4();
        const user: User = new User(userId, email, username, UserPassword.create(userId, password), names, lastNames);
        await this._repository.create(user);
        this._logger.log(`[${this.exec.name}] FINISH ::`);
    }
}

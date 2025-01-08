import { UserRepository } from '../../domain/interfaces/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import { PgUserModel } from './pg-user.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../domain/user';
import { UserMappers } from '../user.mappers';

/**
 * The user repository for Postgres.
 */
@Injectable()
export class PostgresUserRepository implements UserRepository {
    /**
     * @param logger - Class used for logging.
     * @param pgUserModel - The Postgres user model.
     */
    constructor(
        private readonly logger: Logger,
        @InjectModel(PgUserModel) private readonly pgUserModel: typeof PgUserModel,
    ) {}

    /**
     * Retrieves a user by their email address.
     * @param email - The email address of the user to retrieve.
     * @returns A promise that resolves to the user, or `undefined` if the user is not found.
     */
    async getByEmail(email: string): Promise<User | undefined> {
        this.logger.log(`[${this.getByEmail.name}] INIT :: email: ${email}`);
        const found: PgUserModel = await this.pgUserModel.findOne({ where: { email } });
        const mapped: User | undefined = found ? UserMappers.DTO2User(found) : undefined;
        this.logger.log(`[${this.getByEmail.name}] FINISH ::`);
        return mapped;
    }
}

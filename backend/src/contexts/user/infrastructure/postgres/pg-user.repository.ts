import { UserRepository } from '../../domain/interfaces/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import { PgUserModel } from './pg-user.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../domain/user';
import { UserMappers } from '../mappers/user.mappers';

/**
 * The user repository for Postgres.
 */
@Injectable()
export class PgUserRepository implements UserRepository {
    private readonly _logger: Logger = new Logger(PgUserRepository.name);

    /**
     * @param pgUserModel - The Postgres user models.
     */
    constructor(@InjectModel(PgUserModel) private readonly pgUserModel: typeof PgUserModel) {}

    /**
     * Create a user.
     * @param user - The user to create.
     */
    async create(user: User): Promise<void> {
        this._logger.log(`[${this.create.name}] INIT ::`);
        await this.pgUserModel.create(UserMappers.user2DTO(user));
        this._logger.log(`[${this.create.name}] FINISH ::`);
    }

    /**
     * Retrieves a user by their email address.
     * @param email - The email address of the user to retrieve.
     * @returns A promise that resolves to the user, or `undefined` if the user is not found.
     */
    async getByEmail(email: string): Promise<User | undefined> {
        this._logger.log(`[${this.getByEmail.name}] INIT :: email: ${email}`);
        const found: PgUserModel = await this.pgUserModel.findOne({ where: { email } });
        const mapped: User | undefined = found ? UserMappers.DTO2User(found) : undefined;
        this._logger.log(`[${this.getByEmail.name}] FINISH ::`);
        return mapped;
    }

    /**
     * Get user by id.
     * @param userId - The user id to search for.
     * @returns The user if found, otherwise undefined.
     */
    async getById(userId: string): Promise<User | undefined> {
        this._logger.log(`[${this.getById.name}] INIT :: userId: ${userId}`);
        const found: PgUserModel = await this.pgUserModel.findOne({ where: { userId: userId } });
        const mapped: User | undefined = found ? UserMappers.DTO2User(found) : undefined;
        this._logger.log(`[${this.getById.name}] FINISH ::`);
        return mapped;
    }
}

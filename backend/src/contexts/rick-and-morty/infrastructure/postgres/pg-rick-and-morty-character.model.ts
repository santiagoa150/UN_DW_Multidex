import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { RickAndMortyCharacterDto } from '../rick-and-morty-character.dto';
import { PgRickAndMortyConstants } from './pg-rick-and-morty.constants';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';
import { PgUserModel } from '../../../user/infrastructure/postgres/pg-user.model';

/**
 * The Rick and Morty character models for PostgresSQL.
 */
@Table({ tableName: PgRickAndMortyConstants.CHARACTERS_TABLE_NAME, timestamps: false })
export class PgRickAndMortyCharacterModel extends Model implements RickAndMortyCharacterDto {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    status: string;

    @AllowNull(false)
    @Column
    gender: string;

    @AllowNull(false)
    @Column
    location: string;

    @AllowNull(false)
    @Column
    origin: string;

    @AllowNull(false)
    @Column
    entityType: string;

    @AllowNull(false)
    @Column
    frontImageUrl: string;

    @AllowNull(false)
    @Column
    description: string;

    @AllowNull(true)
    @ForeignKey(() => PgUserModel)
    @Column({ type: DataType.UUID })
    creatorId?: string;

    get creatorName(): string | undefined {
        return this.creator?.username;
    }

    get entityTypes(): string[] {
        return [this.entityType];
    }

    get universeType(): string {
        return UniverseTypeNameConstants.RICK_AND_MORTY;
    }

    @BelongsTo(() => PgUserModel)
    creator?: PgUserModel;
}

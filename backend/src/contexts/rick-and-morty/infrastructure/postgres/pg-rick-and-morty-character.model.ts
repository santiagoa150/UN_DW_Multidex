import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { RickAndMortyCharacterDto } from '../rick-and-morty-character.dto';
import { PgRickAndMortyConstants } from './pg-rick-and-morty.constants';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';

/**
 * The Rick and Morty character model for PostgresSQL.
 */
@Table({ tableName: PgRickAndMortyConstants.CHARACTERS_TABLE_NAME, timestamps: false })
export class PgRickAndMortyCharacterModel extends Model<RickAndMortyCharacterDto> implements RickAndMortyCharacterDto {
    @PrimaryKey
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

    get entityTypes(): string[] {
        return [this.entityType];
    }

    get universeType(): string {
        return UniverseTypeNameConstants.RICK_AND_MORTY;
    }
}

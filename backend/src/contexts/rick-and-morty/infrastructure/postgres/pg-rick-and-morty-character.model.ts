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

    get type(): string {
        return UniverseTypeNameConstants.RICK_AND_MORTY;
    }
}

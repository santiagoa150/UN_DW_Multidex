import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { PokemonDto } from '../pokemon.dto';
import { PgPokemonConstants } from './pg-pokemon.constants';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';

@Table({ tableName: PgPokemonConstants.TABLE_NAME, timestamps: false })
export class PgPokemonModel extends Model<PokemonDto> implements PokemonDto {
    @PrimaryKey
    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    get type(): string {
        return UniverseTypeNameConstants.POKEMON;
    }
}

import { AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { PokemonTypeDto } from '../pokemon-type.dto';
import { PgPokemonConstants } from './pg-pokemon.constants';
import { PgPokemonModel } from './pg-pokemon.model';
import { PgPokemonTypeRelationModel } from './pg-pokemon-type-relation.model';

/**
 * The Pokémon type models for PostgresSQL.
 */
@Table({ tableName: PgPokemonConstants.POKEMON_TYPES_TABLE_NAME, timestamps: false })
export class PgPokemonTypeModel extends Model<PokemonTypeDto> implements PokemonTypeDto {
    @PrimaryKey
    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(() => PgPokemonModel, () => PgPokemonTypeRelationModel)
    pokemon?: PgPokemonModel[];
}

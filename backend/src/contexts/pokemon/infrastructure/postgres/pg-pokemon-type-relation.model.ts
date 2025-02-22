import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { PgPokemonConstants } from './pg-pokemon.constants';
import { PgPokemonModel } from './pg-pokemon.model';
import { PgPokemonTypeModel } from './pg-pokemon-type.model';

/**
 * The Pokémon type relation models for PostgresSQL.
 */
@Table({ tableName: PgPokemonConstants.POKEMON_TYPE_RELATIONS_TABLE_NAME, timestamps: false })
export class PgPokemonTypeRelationModel extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => PgPokemonModel)
    @Column({ onDelete: 'CASCADE', type: DataType.INTEGER })
    pokemonId: number;

    @BelongsTo(() => PgPokemonModel)
    pokemon?: PgPokemonModel;

    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => PgPokemonTypeModel)
    @Column({ onDelete: 'CASCADE', type: DataType.INTEGER })
    pokemonTypeId: number;

    @BelongsTo(() => PgPokemonTypeModel)
    pokemonType?: PgPokemonTypeModel;

    @Column
    @AllowNull(false)
    @Column({ type: DataType.TINYINT })
    order: number;
}

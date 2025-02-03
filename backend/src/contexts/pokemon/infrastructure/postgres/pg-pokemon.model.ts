import { AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { PokemonDto } from '../pokemon.dto';
import { PgPokemonConstants } from './pg-pokemon.constants';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';
import { PgPokemonTypeRelationModel } from './pg-pokemon-type-relation.model';
import { PgPokemonTypeModel } from './pg-pokemon-type.model';

/**
 * The Pokémon model for PostgresSQL.
 */
@Table({ tableName: PgPokemonConstants.POKEMON_TABLE_NAME, timestamps: false })
export class PgPokemonModel extends Model<PokemonDto> implements PokemonDto {
    @PrimaryKey
    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column({ type: DataType.FLOAT })
    height: number;

    @AllowNull(false)
    @Column({ type: DataType.FLOAT })
    weight: number;

    @AllowNull(false)
    @Column
    frontImageUrl: string;

    @AllowNull(false)
    @Column
    description: string;

    get entityTypes(): string[] {
        return (this.pokemonTypes ?? []).map((type) => type.name);
    }

    get universeType(): string {
        return UniverseTypeNameConstants.POKEMON;
    }

    @BelongsToMany(() => PgPokemonTypeModel, () => PgPokemonTypeRelationModel)
    pokemonTypes?: PgPokemonTypeModel[];
}

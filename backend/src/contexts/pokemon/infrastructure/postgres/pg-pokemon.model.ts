import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { PokemonDto } from '../pokemon.dto';
import { PgPokemonConstants } from './pg-pokemon.constants';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';
import { PgPokemonTypeRelationModel } from './pg-pokemon-type-relation.model';
import { PgPokemonTypeModel } from './pg-pokemon-type.model';
import { PgUserModel } from '../../../user/infrastructure/postgres/pg-user.model';
import { PgPokemonMovementModel } from './pg-pokemon-movement.model';

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

    @AllowNull(true)
    @ForeignKey(() => PgUserModel)
    @Column({ type: DataType.UUID })
    creatorId?: string;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    hp: number;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    attack: number;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    defense: number;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    specialAttack: number;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    specialDefense: number;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    speed: number;

    get creatorName(): string | undefined {
        return this.creator?.username;
    }

    get entityTypes(): string[] {
        return (this.pokemonTypes ?? []).map((type) => type.name);
    }

    get universeType(): string {
        return UniverseTypeNameConstants.POKEMON;
    }

    @BelongsToMany(() => PgPokemonTypeModel, () => PgPokemonTypeRelationModel)
    pokemonTypes?: PgPokemonTypeModel[];

    @BelongsTo(() => PgUserModel)
    creator?: PgUserModel;

    @HasMany(() => PgPokemonMovementModel)
    pokemonMovements?: PgPokemonMovementModel[];
}

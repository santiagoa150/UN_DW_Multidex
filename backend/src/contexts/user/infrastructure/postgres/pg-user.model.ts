import { AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { UserDto } from '../user.dto';
import { PgUserConstants } from './pg-user.constants';
import { PgPokemonModel } from '../../../pokemon/infrastructure/postgres/pg-pokemon.model';
import { PgRickAndMortyCharacterModel } from '../../../rick-and-morty/infrastructure/postgres/pg-rick-and-morty-character.model';

@Table({ tableName: PgUserConstants.TABLE_NAME, timestamps: false })
export class PgUserModel extends Model<UserDto> implements UserDto {
    @PrimaryKey
    @AllowNull(false)
    @Column({ type: DataType.UUID })
    userId: string;

    @Unique
    @AllowNull(false)
    @Column
    email: string;

    @Unique
    @AllowNull(false)
    @Column
    username: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    names: string;

    @AllowNull(false)
    @Column
    lastNames: string;

    @HasMany(() => PgPokemonModel)
    pokemon?: PgPokemonModel[];

    @HasMany(() => PgRickAndMortyCharacterModel)
    rickAndMortyCharacters?: PgRickAndMortyCharacterModel[];
}

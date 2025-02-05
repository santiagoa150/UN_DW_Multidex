import { Module, Provider } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgRickAndMortyCharacterModel } from '../../contexts/rick-and-morty/infrastructure/postgres/pg-rick-and-morty-character.model';
import { PgRickAndMortyRepository } from '../../contexts/rick-and-morty/infrastructure/postgres/pg-rick-and-morty.repository';
import { GetRickAndMortyCharacterByIdQueryHandler } from '../../contexts/rick-and-morty/applications/get/character-by-id/get-rick-and-morty-character-by-id.query-handler';
import { GetRickAndMortyCharacterByIdApplication } from '../../contexts/rick-and-morty/applications/get/character-by-id/get-rick-and-morty-character-by-id.application';

/**
 * `PROVIDERS` is an array of NestJS providers related to Rick and Morty module.
 */
const PROVIDERS: Provider[] = [PgRickAndMortyRepository];

/**
 * `APPLICATIONS` is an array of applications related to Rick and Morty module.
 */
const APPLICATIONS: Provider[] = [
    {
        inject: [PgRickAndMortyRepository],
        provide: GetRickAndMortyCharacterByIdApplication,
        useFactory: (repository: PgRickAndMortyRepository) => {
            return new GetRickAndMortyCharacterByIdApplication(repository);
        },
    },
];

/**
 * `QUERIES` is an array of query handlers related to Rick and Morty module.
 */
const QUERIES: Provider[] = [GetRickAndMortyCharacterByIdQueryHandler];

@Module({
    imports: [SequelizeModule.forFeature([PgRickAndMortyCharacterModel])],
    providers: [...PROVIDERS, ...APPLICATIONS, ...QUERIES],
})
export class RickAndMortyModule {}

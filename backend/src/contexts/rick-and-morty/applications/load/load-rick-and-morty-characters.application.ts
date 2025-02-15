import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';
import { UniverseType } from '../../../universe/domain/universe-type';
import { CommandBus } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { UpdateUniverseTypeCommand } from '../../../universe/applications/update/update-universe-type.command';
import { RickAndMortyMetadata } from '../../domain/rick-and-morty-metadata';

type RickAndMortyApiResponse = {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Array<{
        id: number;
        name: string;
        status: string;
        species: string;
        type: string;
        gender: string;
        origin: {
            name: string;
        };
        location: {
            name: string;
        };
        image: string;
        episode: Array<string>;
    }>;
};

type RickAndMortyApiEpisodeResponse = {
    name: string;
    air_date: string;
    episode: string;
};

/**
 * Load Rick and Morty characters application.
 */
export class LoadRickAndMortyCharactersApplication {
    private readonly _logger: Logger = new Logger(LoadRickAndMortyCharactersApplication.name);

    /**
     * @param _commandBus - Command bus.
     * @param _repository - Rick and Morty repository.
     * @param _httpService - HTTP service.
     */
    constructor(
        private readonly _commandBus: CommandBus,
        private readonly _repository: RickAndMortyRepository,
        private readonly _httpService: HttpService,
    ) {}

    /**
     * Execute the application.
     * @param universeType - The universe type to load the characters.
     */
    async exec(universeType: UniverseType): Promise<void> {
        if (universeType.name !== UniverseTypeNameConstants.RICK_AND_MORTY) {
            return;
        }
        this._logger.log(`[${this.exec.name}] INIT :: universeType: ${universeType.name}`);
        const metadata: RickAndMortyMetadata = universeType.metadata
            ? JSON.parse(universeType.metadata)
            : {
                  charactersPage: 1,
                  charactersLoaded: false,
              };
        if (!metadata.charactersLoaded) await this.loadRickAndMortyCharacters(universeType, metadata);
        universeType.taskWasExecuted = true;
        await this._commandBus.execute(new UpdateUniverseTypeCommand(universeType));
        this._logger.log(`[${this.exec.name}] FINISH :: universeType: ${universeType.name}`);
    }

    /**
     * Load Rick and Morty characters.
     * @param universeType - The universe type to load the characters.
     * @param metadata - The universe type metadata.
     */
    async loadRickAndMortyCharacters(universeType: UniverseType, metadata: RickAndMortyMetadata): Promise<void> {
        this._logger.log(`[${this.loadRickAndMortyCharacters.name}] INIT :: universeType: ${universeType.name}`);
        let currentPage: number = metadata.charactersPage;
        let totalPages: number = 1;
        do {
            this._logger.warn(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
            const response = await this._httpService.axiosRef
                .get<RickAndMortyApiResponse>(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
                .then((res) => res.data);
            totalPages = response.info.pages;
            try {
                for (const rawCharacter of response.results) {
                    this._logger.warn(rawCharacter.episode[0]);
                    const firstEpisode = await this._httpService.axiosRef
                        .get<RickAndMortyApiEpisodeResponse>(rawCharacter.episode[0])
                        .then((res) => res.data);
                    await this._repository.createCharacter(
                        rawCharacter.id,
                        rawCharacter.name,
                        rawCharacter.species,
                        rawCharacter.image,
                        `${firstEpisode.name},${firstEpisode.air_date},${firstEpisode.episode}`,
                        rawCharacter.status,
                        rawCharacter.gender,
                        rawCharacter.location.name,
                        rawCharacter.origin.name,
                    );
                }
                currentPage++;
            } finally {
                if (currentPage >= totalPages) {
                    metadata.charactersPage = currentPage;
                    metadata.charactersLoaded = true;
                } else {
                    metadata.charactersPage = currentPage + 1;
                }
                universeType.metadata = JSON.stringify(metadata);
                await this._commandBus.execute(new UpdateUniverseTypeCommand(universeType));
            }
        } while (currentPage < totalPages);
        this._logger.log(`[${this.loadRickAndMortyCharacters.name}] FINISH ::`);
    }
}

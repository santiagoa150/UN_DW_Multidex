import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { UniverseType } from '../../../universe/domain/universe-type';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetAllPokemonTypesQuery } from '../get/pokemon-types/all/get-all-pokemon-types.query';
import { PokemonType } from '../../domain/pokemon-type';
import { PokemonMovement } from '../../domain/pokemon-movement';
import { UpdateUniverseTypeCommand } from '../../../universe/applications/update/update-universe-type.command';
import { PokemonEvolutionChain } from '../../domain/pokemon-evolution-chain';
import { v4 as uuidV4 } from 'uuid';

type PokeApiPokemonResponse = {
    height: number;
    id: number;
    moves: Array<{
        move: { name: string };
        version_group_details: Array<{ level_learned_at: number }>;
    }>;
    name: string;
    sprites: {
        front_default?: string;
        other?: {
            dream_world?: {
                front_default?: string;
            };
            ['official-artwork']?: {
                front_default?: string;
            };
        };
    };
    stats: Array<{
        base_stat: number;
        stat: { name: string };
    }>;
    types: Array<{ type: { name: string } }>;
    weight: number;
};

type PokeApiPokemonSpeciesResponse = {
    flavor_text_entries: Array<{ flavor_text: string; language: { name: string } }>;
};

type PokeApiEvolvesToResponse = Array<{
    evolves_to: PokeApiEvolvesToResponse;
    species: { name: string; url: string };
}>;

type PokeApiEvolutionChainResponse = {
    chain: {
        evolves_to: PokeApiEvolvesToResponse;
        species: { name: string; url: string };
    };
};

/**
 * `LoadPokemonApplication` is an application service that is responsible for load pokémon entities.
 */
export class LoadPokemonApplication {
    private readonly _logger: Logger = new Logger(LoadPokemonApplication.name);

    /**
     * @param _queryBus - The query bus instance.
     * @param _commandBus - The command bus instance.
     * @param _repository - The repository instance.
     * @param _httpService - The HTTP service instance.
     */
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _commandBus: CommandBus,
        private readonly _repository: PokemonRepository,
        private readonly _httpService: HttpService,
    ) {}

    /**
     * Executes the application.
     * @param universeType - The universe type to load entities for.
     */
    async exec(universeType: UniverseType): Promise<void> {
        if (universeType.name !== UniverseTypeNameConstants.POKEMON) {
            return;
        }
        this._logger.log(`[${this.exec.name}] INIT :: universeType: ${universeType.name}`);
        const metadata = universeType.metadata
            ? JSON.parse(universeType.metadata)
            : {
                  pokemonPage: 0,
                  pokemonLoaded: false,
                  lineEvolutionsPage: 0,
                  lineEvolutionsLoaded: false,
              };
        if (!metadata.pokemonLoaded) await this.loadPokemon(universeType, metadata);
        if (!metadata.lineEvolutionsLoaded) await this.loadEvolutionChains(universeType, metadata);
        universeType.taskWasExecuted = true;
        await this._commandBus.execute(new UpdateUniverseTypeCommand(universeType));
        this._logger.log(`[${this.exec.name}] FINISH ::`);
    }

    /**
     * Load the pokémon entities.
     * @param universeType - The universe type to load entities for.
     * @param metadata - The metadata of the universe type.
     * @returns A promise that resolves when the entities are loaded.
     */
    async loadPokemon(
        universeType: UniverseType,
        metadata: {
            pokemonPage: number;
            pokemonLoaded: boolean;
        },
    ): Promise<void> {
        this._logger.log(`[${this.loadPokemon.name}] INIT :: universeType: ${universeType.name}`);
        const pokemonTypes: Map<string, number> = await this.getPokemonTypesMap();
        let currentPage: number = metadata.pokemonPage;
        let totalElements: number = 1;
        do {
            this._logger.warn(
                `https://pokeapi.co/api/v2/pokemon?limit=${universeType.elementsPerPage}&offset=${currentPage * universeType.elementsPerPage}`,
            );
            const { count, results } = await this._httpService.axiosRef
                .get<{
                    count: number;
                    results: { name: string; url: string }[];
                }>(
                    `https://pokeapi.co/api/v2/pokemon?limit=${universeType.elementsPerPage}&offset=${currentPage * universeType.elementsPerPage}`,
                )
                .then((res) => res.data);
            totalElements = count;
            try {
                for (const pokemonPaged of results) {
                    const pokemonNumber = Number(pokemonPaged.url.slice(0, -1).split('/').pop());
                    if (pokemonNumber > 1500) {
                        currentPage = Math.ceil(totalElements / universeType.elementsPerPage);
                        break;
                    }

                    this._logger.warn(pokemonPaged.url);
                    this._logger.log(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`);
                    const [rawPokemon, rawPokemonDetail] = await Promise.all([
                        this._httpService.axiosRef.get<PokeApiPokemonResponse>(pokemonPaged.url),
                        this._httpService.axiosRef.get<PokeApiPokemonSpeciesResponse>(
                            `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`,
                        ),
                    ]).then((res): [PokeApiPokemonResponse, PokeApiPokemonSpeciesResponse] => [
                        res[0].data,
                        res[1].data,
                    ]);
                    const statsPromise = this.getPokemonStats(rawPokemon);
                    const pokemonMovementsPromise = this.buildPokemonMovements(rawPokemon);
                    const pokemonTypeIds: number[] = rawPokemon.types.map((t) => pokemonTypes.get(t.type.name));
                    const frontImageUrl: string =
                        rawPokemon.sprites?.other['official-artwork']?.front_default ??
                        rawPokemon.sprites?.other?.dream_world?.front_default ??
                        rawPokemon.sprites?.front_default;
                    const description: string = (
                        rawPokemonDetail.flavor_text_entries.find((entry) => entry.language.name === 'es') ??
                        rawPokemonDetail.flavor_text_entries.find((entry) => entry.language.name == 'en')
                    ).flavor_text;
                    const weight: number = rawPokemon.weight / 10;
                    const height: number = rawPokemon.height / 10;
                    const { stats, movements } = await Promise.all([statsPromise, pokemonMovementsPromise]).then(
                        (res) => ({ stats: res[0], movements: res[1] }),
                    );
                    await this._repository.create(
                        rawPokemon.id,
                        rawPokemon.name,
                        pokemonTypeIds,
                        frontImageUrl,
                        description,
                        weight,
                        height,
                        stats.hp,
                        stats.attack,
                        stats.defense,
                        stats.specialAttack,
                        stats.specialDefense,
                        stats.speed,
                        movements,
                    );
                }
                currentPage++;
            } finally {
                if (currentPage * universeType.elementsPerPage >= totalElements) {
                    metadata.pokemonPage = currentPage;
                    metadata.pokemonLoaded = true;
                } else {
                    metadata.pokemonPage = currentPage + 1;
                }
                universeType.metadata = JSON.stringify(metadata);
                await this._commandBus.execute(new UpdateUniverseTypeCommand(universeType));
            }
        } while (currentPage * universeType.elementsPerPage < totalElements);
        this._logger.log(`[${this.loadPokemon.name}] FINISH ::`);
    }

    /**
     * Load the chain evolutions.
     * @param universeType - The universe type to load entities for.
     * @param metadata - The metadata of the universe type.
     * @returns A promise that resolves when the chain evolutions are loaded.
     */
    async loadEvolutionChains(
        universeType: UniverseType,
        metadata: {
            lineEvolutionsPage: number;
            lineEvolutionsLoaded: boolean;
        },
    ): Promise<void> {
        this._logger.log(`[${this.loadEvolutionChains.name}] INIT ::`);
        let currentPage: number = metadata.lineEvolutionsPage;
        let totalElements: number = 1;
        do {
            this._logger.warn(
                `https://pokeapi.co/api/v2/evolution-chain?limit=${universeType.elementsPerPage}&offset=${currentPage * universeType.elementsPerPage}`,
            );
            const { count, results } = await this._httpService.axiosRef
                .get<{
                    count: number;
                    results: { url: string }[];
                }>(
                    `https://pokeapi.co/api/v2/evolution-chain?limit=${universeType.elementsPerPage}&offset=${currentPage * universeType.elementsPerPage}`,
                )
                .then((res) => res.data);
            totalElements = count;
            try {
                for (const evolutionChainPaged of results) {
                    this._logger.warn(evolutionChainPaged.url);
                    const evolutionChain = await this._httpService.axiosRef
                        .get<PokeApiEvolutionChainResponse>(evolutionChainPaged.url)
                        .then((res) => res.data);

                    const chainId: string = uuidV4();

                    /**
                     * Extract the evolution chain.
                     * @param chain - The evolution chain.
                     * @param pokemon - The pokémon.
                     * @param evolvesFrom - The pokémon evolves from.
                     */
                    function extractEvolutionChain(
                        chain: { evolves_to: PokeApiEvolvesToResponse; species: { name: string; url: string } },
                        pokemon: PokemonEvolutionChain[] = [],
                        evolvesFrom: number = undefined,
                    ): PokemonEvolutionChain[] {
                        const pokemonId = Number(chain.species.url.slice(0, -1).split('/').pop());
                        pokemon.push(new PokemonEvolutionChain(chainId, pokemonId, evolvesFrom));

                        if (Array.isArray(chain.evolves_to) && chain.evolves_to.length > 0) {
                            chain.evolves_to.forEach((evolvesTo) => {
                                extractEvolutionChain(evolvesTo, pokemon, pokemonId);
                            });
                        }
                        return pokemon;
                    }

                    const chain = extractEvolutionChain(evolutionChain.chain);
                    await this._repository.createEvolutionChain(chain);
                }
                currentPage++;
            } finally {
                if (currentPage * universeType.elementsPerPage >= totalElements) {
                    metadata.lineEvolutionsPage = currentPage;
                    metadata.lineEvolutionsLoaded = true;
                } else {
                    metadata.lineEvolutionsPage = currentPage + 1;
                }
                universeType.metadata = JSON.stringify(metadata);
                await this._commandBus.execute(new UpdateUniverseTypeCommand(universeType));
            }
        } while (currentPage * universeType.elementsPerPage < totalElements);
        this._logger.log(`[${this.loadEvolutionChains.name}] FINISH ::`);
    }

    /**
     * Get the pokémon stats.
     * @param rawPokemon - The raw pokémon data.
     * @returns The pokémon stats.
     */
    async getPokemonStats(rawPokemon: PokeApiPokemonResponse): Promise<{
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    }> {
        let hp: number = 0;
        let attack: number = 0;
        let defense: number = 0;
        let specialAttack: number = 0;
        let specialDefense: number = 0;
        let speed: number = 0;
        for (const stat of rawPokemon.stats) {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat.base_stat;
                    break;
                case 'attack':
                    attack = stat.base_stat;
                    break;
                case 'defense':
                    defense = stat.base_stat;
                    break;
                case 'special-attack':
                    specialAttack = stat.base_stat;
                    break;
                case 'special-defense':
                    specialDefense = stat.base_stat;
                    break;
                case 'speed':
                    speed = stat.base_stat;
                    break;
            }
        }
        return { hp, attack, defense, specialAttack, specialDefense, speed };
    }

    /**
     * Build the pokémon movements.
     * @param rawPokemon - The raw pokémon data.
     * @returns The pokémon movements.
     */
    async buildPokemonMovements(rawPokemon: PokeApiPokemonResponse): Promise<PokemonMovement[]> {
        return rawPokemon.moves.map(
            (m) => new PokemonMovement(rawPokemon.id, m.move.name, m.version_group_details[0]?.level_learned_at ?? 0),
        );
    }

    /**
     * Get the pokémon types map.
     * @returns The pokémon types map.
     */
    async getPokemonTypesMap(): Promise<Map<string, number>> {
        const pokemonTypes = await this._queryBus.execute<GetAllPokemonTypesQuery, PokemonType[]>(
            new GetAllPokemonTypesQuery(),
        );
        return new Map(pokemonTypes.map((type) => [type.name, type.id]));
    }
}

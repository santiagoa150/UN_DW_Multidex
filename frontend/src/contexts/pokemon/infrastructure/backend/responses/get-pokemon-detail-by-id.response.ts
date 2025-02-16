/**
 * The data of a Pokémon detail.
 */
export type GetPokemonDetailByIdPokemonData = {
    id: number;
    name: string;
    universeType: string;
    entityTypes: string[];
    frontImageUrl: string;
    description: string;
    height: number;
    weight: number;
    creatorId?: string;
    creatorName?: string;
    attack: number;
    defense: number;
    hp: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
};

/**
 * The response of the get Pokémon details by id endpoint.
 */
export type GetPokemonDetailByIdResponse = {
    success: boolean;
    pokemon: GetPokemonDetailByIdPokemonData;
    evolutionChain: GetPokemonDetailByIdPokemonData[];
    movements: {
        pokemonId: number;
        name: string;
        levelLearnedAt: number;
    }[];
};

export type GetPokemonDetailsByIdResponse = {
    success: boolean;
    pokemon: {
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
    },
    evolutionChain: {
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
    }[],
    movements:{
        pokemonId: number;
        name: string;
        levelLearnedAt: number;
    }[]
};

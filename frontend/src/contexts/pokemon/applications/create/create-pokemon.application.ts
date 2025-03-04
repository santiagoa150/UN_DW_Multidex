import { PokemonRepository } from '../../domain/interfaces/pokemon.repository.ts';
import { StorageRepository } from '../../../shared/domain/interfaces/storage.repository.ts';
import { SharedStorageConstants } from '../../../shared/domain/constants/shared-storage.constants.ts';

/**
 * Application to create a new Pokémon.
 */
export class CreatePokemonApplication {
    /**
     * @param _repository - The Pokémon repository.
     * @param _storage - The storage repository.
     */
    constructor(
        private readonly _repository: PokemonRepository,
        private readonly _storage: StorageRepository,
    ) {}

    /**
     * Create a new Pokémon.
     * @param name - The Pokémon name.
     * @param frontImageUrl - The Pokémon front image URL.
     * @param description - The Pokémon description.
     * @param height - The Pokémon height.
     * @param weight - The Pokémon weight.
     * @param attack - The Pokémon attack.
     * @param defense - The Pokémon defense.
     * @param hp - The Pokémon HP.
     * @param specialAttack - The Pokémon special attack.
     * @param specialDefense - The Pokémon special defense.
     * @param speed - The Pokémon speed.
     * @param movements - The Pokémon movements.
     * @param types - The Pokémon types.
     */
    async exec(
        name: string,
        frontImageUrl: string,
        description: string,
        height: number,
        weight: number,
        attack: number,
        defense: number,
        hp: number,
        specialAttack: number,
        specialDefense: number,
        speed: number,
        movements: string[],
        types: number[],
    ): Promise<void> {
        const token = (await this._storage.get(SharedStorageConstants.AUTH_TOKEN)) as string;
        return this._repository.create(
            token,
            name,
            frontImageUrl,
            description,
            height,
            weight,
            attack,
            defense,
            hp,
            specialAttack,
            specialDefense,
            speed,
            movements,
            types,
        );
    }
}

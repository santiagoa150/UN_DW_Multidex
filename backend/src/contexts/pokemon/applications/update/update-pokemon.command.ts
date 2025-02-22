import { ICommand } from '@nestjs/cqrs';

/**
 * Command to update a Pokémon.
 */
export class UpdatePokemonCommand implements ICommand {
    /**
     * @param id - The pokémon to be updated ID.
     * @param userId - The user ID.
     * @param name - The name.
     * @param description - The description.
     * @param frontImageUrl - The front image URL.
     * @param attack - The attack.
     * @param defense - The defense.
     * @param height - The height.
     * @param hp - The HP.
     * @param weight - The weight.
     * @param speed - The speed.
     * @param specialDefense - The special defense.
     * @param specialAttack - The special attack.
     * @param movements - The movements.
     * @param types - The types.
     * @param evolvesFrom - The Pokémon ID from which it evolves.
     */
    constructor(
        public readonly id: number,
        public readonly userId: string,
        public readonly name: string,
        public readonly description: string,
        public readonly frontImageUrl: string,
        public readonly attack: number,
        public readonly defense: number,
        public readonly height: number,
        public readonly hp: number,
        public readonly weight: number,
        public readonly speed: number,
        public readonly specialDefense: number,
        public readonly specialAttack: number,
        public readonly movements: string[],
        public readonly types: number[],
        public readonly evolvesFrom?: number,
    ) {}
}

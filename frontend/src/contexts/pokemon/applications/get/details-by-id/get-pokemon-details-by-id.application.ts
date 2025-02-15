import { PokemonRepository } from '../../../domain/interfaces/pokemon.repository.ts';
import { PokemonDetails } from '../../../domain/pokemon-details.ts';

export class GetPokemonDetailsByIdApplication {
    constructor(private readonly repository:PokemonRepository) {}

    async exec(id: number): Promise<PokemonDetails | undefined> {
        return this.repository.getDetails(id);
    }
}

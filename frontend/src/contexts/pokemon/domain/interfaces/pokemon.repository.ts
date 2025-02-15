import { PokemonDetails } from "../pokemon-details";

export interface PokemonRepository{
    getDetails(id: number): Promise<PokemonDetails | undefined>
    
}
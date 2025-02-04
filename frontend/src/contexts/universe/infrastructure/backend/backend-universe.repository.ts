import { UniverseRepository } from '../../domain/interfaces/universe.repository.ts';
import { UniverseEntity } from '../../domain/universe-entity.ts';
import { UniverseTypeNameConstants } from '../../domain/constants/universe-type-name.constants.ts';

/**
 * Backend implementation of the universe repository.
 * This implementation retrieves the universe entity from the backend.
 */
export class BackendUniverseRepository implements UniverseRepository {
    /**
     * Retrieves a universe entity by its ID from the backend.
     * @param id - The ID of the universe entity to retrieve.
     * @param type - The type of the universe entity to retrieve.
     * @returns The universe entity with the specified ID, or `undefined` if no entity was found.
     */
    async getUniverseEntityByIdAndType(
        id: string,
        type: UniverseTypeNameConstants,
    ): Promise<UniverseEntity | undefined> {
        const entities: UniverseEntity[] = [
            {
                id: 1,
                name: 'Blastoise',
                universeType: UniverseTypeNameConstants.POKEMON,
                entityTypes: ['Agua'],
                frontImageUrl:
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
                weight: 855,
                height: 16,
                description:
                    'Para acabar con su enemigo, lo aplasta con el peso de su cuerpo. En momentos de apuro, se esconde en el caparazón.',
            },
            {
                id: 12,
                name: 'Butterfree ',
                universeType: UniverseTypeNameConstants.POKEMON,
                entityTypes: ['Bicho', 'Volador'],
                frontImageUrl:
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png',
                weight: 320,
                height: 11,
                description: '',
            },
            {
                id: 1,
                name: 'Rick',
                universeType: UniverseTypeNameConstants.RICK_AND_MORTY,
                entityTypes: ['Humano'],
                frontImageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                status: 'Vivo',
                gender: 'Hombre',
                location: 'Citadel of Ricks',
                origin: 'Earth (C-137)',
                description: '',
            },
        ];
        return entities.find((entity) => entity.id === Number(id) && type === entity.universeType);
    }
}

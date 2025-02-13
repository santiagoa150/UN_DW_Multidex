import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';
import { UniverseType } from '../../../universe/domain/universe-type';

export class LoadRickAndMortyCharactersApplication {
    constructor(private readonly _repository: RickAndMortyRepository) {}

    async exec(universeType: UniverseType): Promise<void> {
        if (universeType.name !== UniverseTypeNameConstants.RICK_AND_MORTY) {
            return;
        }
        console.log('Loading Rick and Morty characters...');
    }
}

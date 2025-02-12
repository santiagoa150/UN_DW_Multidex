import { QueryBus } from '@nestjs/cqrs';
import { PokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { UniverseType } from '../../../universe/domain/universe-type';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';

export class LoadPokemonApplication {
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _repository: PokemonRepository,
    ) {}

    async exec(universeType: UniverseType): Promise<void> {

        if (universeType.name !== UniverseTypeNameConstants.POKEMON) {
            return;
        }
    }
}

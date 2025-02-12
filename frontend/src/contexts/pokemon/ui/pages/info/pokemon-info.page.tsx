import { JSX } from 'react';
import { Title } from './Title';
import { Data } from './Data';
import { UniverseTypeNameToPropertiesConstants } from '../../../../universe/domain/constants/universe-type-name-to-properties.constants';
import { Evolution } from './Evolution';

export default function PokemonInfoPage(): JSX.Element {
    return (
        <main
            className="w-full min-h-screen "
            style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.tertiaryColor }}
        >
            <Title />
            <div className="h-4"></div>
            <Data />
            <Evolution />
        </main>
    );
}

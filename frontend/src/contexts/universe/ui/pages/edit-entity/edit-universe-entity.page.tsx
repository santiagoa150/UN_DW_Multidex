import { JSX } from 'react';
import { UniverseTypeNameToPropertiesConstants } from '../../../domain/constants/universe-type-name-to-properties.constants';
import {Title} from './Title';
import { pokemones } from '../../../../pokemon/ui/pages/info/pokemon-info.page';
import { Data } from './Data';

export default function EditUniverseEntityPage(): JSX.Element {
    return (
        <main className="w-full min-h-screen "
                    style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.tertiaryColor }}>
        

        
            {pokemones.map(({ pokemonName, index, img }) => (
                <Title key={pokemonName} pokemonName={pokemonName} index={index} img={img} />
            ))}

            <Data/>
        
        </main>
    );
}

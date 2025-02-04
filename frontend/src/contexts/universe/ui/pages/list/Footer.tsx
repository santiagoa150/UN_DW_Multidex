import { JSX } from 'react';
import { UniverseTypeNameToPropertiesConstants } from '../../../../universe/domain/constants/universe-type-name-to-properties.constants';

export default function UniverseListPage(): JSX.Element {
    const pokemonColors = UniverseTypeNameToPropertiesConstants.POKEMON;
    return (
        <div className='w-full h-[135px] align-items: flex-end'  style={{ backgroundColor: pokemonColors.mainColor }} >
            
        </div>
    )
}
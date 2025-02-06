import { JSX } from "react";
import { Title } from "./Title";
import { Data } from "./Data";
import { UniverseTypeNameToPropertiesConstants } from "../../../../universe/domain/constants/universe-type-name-to-properties.constants";
import { Evolution } from "./Evolution";
import Charizard from "./Charizard.png"

export const pokemones = [
    { pokemonName: "Charizard", index: 1, description: "Pokemon de fuego", img: Charizard}
    
];

export default function PokemonInfoPage(): JSX.Element {
    return (
        <main
            className="w-full min-h-screen "
            style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.tertiaryColor }}
        >
            {pokemones.map(({ pokemonName, index, img }) => (
                <Title key={pokemonName} pokemonName={pokemonName} index={index} img={img} />
            ))}

            <div className="h-4"></div>

            {pokemones.map(({description}) => (
                <Data key={description} description={description}/>))}

            <Evolution/>
        </main>
    );
}

import { JSX } from 'react';
import Header from './universe-list-header.tsx';
import Footer from './universe-list-footer.tsx';
import ListEntity from './list-entity.tsx';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { useNavigate } from 'react-router-dom';
import { UniverseEntity } from '../../../domain/universe-entity.ts';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants.ts';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';

// lista de cada pokemon con su numero y nombre
const itemsExample: UniverseEntity[] = [
    {
        id: 1,
        name: 'Pikachu',
        entityTypes: ['Eléctrico'],
        universeType: UniverseTypeNameConstants.POKEMON,
        location: 'Bosque',
        creator: 'OscarPQ',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
    },
    {
        id: 2,
        name: 'Charizard',
        entityTypes: ['Fuego', 'Volador'],
        universeType: UniverseTypeNameConstants.POKEMON,

        location: 'Montaña',
        creator: 'Juan19',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png',
    },
    {
        id: 3,
        name: 'Blastoise',
        entityTypes: ['Agua'],
        universeType: UniverseTypeNameConstants.POKEMON,
        location: 'Agua dulce',
        creator: 'AndreaG5',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/009.png',
    },
    {
        id: 4,
        name: 'Omanyte',
        entityTypes: ['Roca', 'Agua'],
        universeType: UniverseTypeNameConstants.POKEMON,
        location: 'Agua salada',
        creator: 'Mariah',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/138.png',
    },
    {
        id: 5,
        name: 'Arcanine',
        entityTypes: ['Fuego'],
        universeType: UniverseTypeNameConstants.POKEMON,
        location: 'Pradera',
        creator: 'Angel45',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/059.png',
    },
    {
        id: 6,
        name: 'Sandshrew',
        entityTypes: ['Tierra'],
        universeType: UniverseTypeNameConstants.POKEMON,
        location: 'Campo',
        creator: 'Daniel8',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/027.png',
    },
    {
        id: 7,
        name: 'Charmeleon',
        entityTypes: ['Fuego', 'Volador'],
        universeType: UniverseTypeNameConstants.POKEMON,
        location: 'Montaña',
        creator: 'Dana12',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/005.png',
    },
    {
        id: 8,
        name: 'Butterfree',
        entityTypes: ['Bicho', 'Volador'],
        universeType: UniverseTypeNameConstants.POKEMON,
        location: 'Bosque',
        creator: 'oscar56',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/012.png',
    },
    {
        id: 9,
        name: 'Muk',
        entityTypes: ['Venenoso'],
        universeType: UniverseTypeNameConstants.POKEMON,
        location: 'Ciudad',
        creator: 'Carlos4',
        frontImageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/089.png',
    },
    {
        id: 1,
        name: 'Rick',
        universeType: UniverseTypeNameConstants.RICK_AND_MORTY,
        entityTypes: ['Humano'],
        frontImageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        origin: 'Earth (C-137)',
        creator: 'Daniel8',
    },
    {
        id: 2,
        name: 'Beth Smith',
        universeType: UniverseTypeNameConstants.RICK_AND_MORTY,
        entityTypes: ['Humano'],
        frontImageUrl: 'https://i.imgur.com/5BqMSjs.png',
        origin: 'Earth ',
        creator: 'Daniel8',
    },
    {
        id: 3,
        name: 'Zeep Xanflorp',
        universeType: UniverseTypeNameConstants.RICK_AND_MORTY,
        entityTypes: ['Humanoide'],
        frontImageUrl: 'https://i.imgur.com/uWmSJfc.png',
        origin: 'Rick Battery Microverse',
        creator: 'cami',
    },
    {
        id: 4,
        name: 'Morty Smith',
        universeType: UniverseTypeNameConstants.RICK_AND_MORTY,
        entityTypes: ['Humano'],
        frontImageUrl: 'https://i.imgur.com/IM0PdiE.png',
        origin: 'Earth ',
        creator: 'Lau',
    },
    {
        id: 5,
        name: 'Summer Smith',
        universeType: UniverseTypeNameConstants.RICK_AND_MORTY,
        entityTypes: ['Humano'],
        frontImageUrl: 'https://i.imgur.com/MBFxZaI.png',
        origin: 'Earth',
        creator: 'Dani',
    },
    {
        id: 6,
        name: 'Daphne',
        universeType: UniverseTypeNameConstants.RICK_AND_MORTY,
        entityTypes: ['Alien'],
        frontImageUrl: 'https://i.imgur.com/OwRynSO.png',
        origin: 'Morglutz',
        creator: 'May',
    },
];

export default function UniverseListPage(): JSX.Element {
    const { universeType } = useUniverse();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex flex-col">
            <Header />

            {/** Barra de búsqueda */}
            <div className="flex justify-end p-4" style={{ backgroundColor: universeType?.tertiaryColor }}>
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    className="px-4 py-2 border w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/4 xl:w-1/5 h-auto rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                    style={{ backgroundColor: universeType?.search }}
                />
                <img src="/search.png" alt="search" className="w-[35px] h-auto ml-4 mb-2" />
            </div>

            <main
                className="grow w-full flex flex-col items-center py-8"
                style={{ backgroundColor: universeType?.tertiaryColor }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mx-10">
                    {itemsExample
                        .filter((item) => item.universeType === universeType?.name)
                        .map((item) => (
                            <ListEntity
                                key={item.id}
                                universeEntity={item}
                                onClick={() =>
                                    navigate(RoutesConstants.UNIVERSE_INFO.replace(':id', item.id.toString()))
                                }
                            />
                        ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

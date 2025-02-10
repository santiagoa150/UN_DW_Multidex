import { JSX, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ListEntity } from './ListEntity';
import { getCurrentUniverseApplication } from '../../../../../config/app.providers.ts';
import { UniverseType } from '../../../domain/universe-type.ts';
import { useUniverse } from '../../../../../config/UniverseContext.tsx';

// lista de cada pokemon con su numero y nombre
const itemsExample = [
    {
        itemNumber: '001',
        name: 'Pikachu',
        type: 'Eléctrico',
        habitat: 'Bosque',
        creator: 'OscarPQ',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
    },
    {
        itemNumber: '002',
        name: 'Charizard',
        type: 'Fuego/Volador',
        habitat: 'Montaña',
        creator: 'Juan19',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png',
    },
    {
        itemNumber: '003',
        name: 'Blastoise',
        type: 'Agua',
        habitat: 'Agua dulce',
        creator: 'AndreaG5',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/009.png',
    },
    {
        itemNumber: '004',
        name: 'Omanyte',
        type: 'Roca/Agua',
        habitat: 'Agua salada',
        creator: 'Mariah',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/138.png',
    },
    {
        itemNumber: '005',
        name: 'Arcanine',
        type: 'Fuego',
        habitat: 'Pradera',
        creator: 'Angel45',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/059.png',
    },
    {
        itemNumber: '006',
        name: 'Sandshrew',
        type: 'Tierra',
        habitat: 'Campo',
        creator: 'Daniel8',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/027.png',
    },

    {
        itemNumber: '007',
        name: 'Charmeleon',
        type: 'Fuego/Volador',
        habitat: 'Montaña',
        creator: 'Dana12',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/005.png',
    },
    {
        itemNumber: '008',
        name: 'Butterfree',
        type: 'Bicho/Volador',
        habitat: 'Bosque',
        creator: 'oscar56',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/012.png',
    },
    {
        itemNumber: '009',
        name: 'Muk',
        type: 'Venenoso',
        habitat: ' Ciudad',
        creator: 'Carlos4',
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/089.png',
    },
];

export default function UniverseListPage(): JSX.Element {
    const { universeType } = useUniverse();

    return (
        <div className="min-h-screen w-full flex flex-col">
            <Header />

            {/** Barra de búsqueda */}
            <div className="flex justify-end p-4" style={{ backgroundColor: universeType?.tertiaryColor }}>
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    className="px-4 py-1 border w-64 h-9  rounded-lg  focus:outline-none focus:ring-1 focus:ring-blue-200"
                    style={{ backgroundColor: universeType?.search }}
                />
                <img src="/search.png" alt="search" className="w-[35px] h-auto ml-4 mb-2" />
            </div>

            <main
                className="grow w-full flex flex-col items-center py-8"
                style={{ backgroundColor: universeType?.tertiaryColor }}
            >
                <div className="grid grid-cols-3 gap-20 mx-10">
                    {itemsExample.map((item) => (
                        <ListEntity
                            key={item.itemNumber}
                            itemNumber={item.itemNumber}
                            name={item.name}
                            type={item.type}
                            habitat={item.habitat}
                            creator={item.creator}
                            imageUrl={item.imageUrl}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

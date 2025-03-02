import { JSX, useEffect, useState } from 'react';
import Header from './universe-list-header.tsx';
import Footer from './universe-list-footer.tsx';
import ListEntity from './list-entity.tsx';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { useNavigate } from 'react-router-dom';
import { UniverseEntity } from '../../../domain/universe-entity.ts';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';
import { getUniverseEntityByType } from '../../../../../config/app.providers.ts';

export default function UniverseListPage(): JSX.Element {
    const { universeType } = useUniverse();
    const [items, setItems] = useState<UniverseEntity[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [nameFilter, setNameFilter] = useState<string | undefined>('');
    const [searchInput, setSearchInput] = useState<string | undefined>('');
    const navigate = useNavigate();
    /**
     * Get the universe entity by id and type.
     */
    useEffect(() => {
        if (universeType) {
            getUniverseEntityByType
                .exec(universeType.name, currentPage, 12, nameFilter)
                .then((res) => {
                    setItems((prev) => {
                        if (currentPage != 1) {
                            return prev && res ? [...prev, ...res] : [];
                        } else {
                            return res;
                        }
                    });
                })
                .catch(() => navigate(RoutesConstants.HOME));
        }
    }, [universeType, navigate, currentPage, nameFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [universeType]);

    useEffect(() => {
        setCurrentPage(1);
        if (!searchInput) {
            setCurrentPage(1);
            setNameFilter(undefined);
        }
    }, [searchInput]);

    return (
        <div className="min-h-screen w-full flex flex-col">
            <Header />

            {/** Barra de búsqueda */}
            <form
                className="flex justify-end p-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    setNameFilter(searchInput);
                }}
                style={{ backgroundColor: universeType?.tertiaryColor }}
            >
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
                    type="text"
                    placeholder="Filtrar por nombre"
                    className="px-4 py-2 border w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/4 xl:w-1/5 h-auto rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                    style={{ backgroundColor: universeType?.search }}
                />
                <button type="submit">
                    <img src="/search.png" alt="search" className="w-[35px] h-auto ml-4 mb-2" />
                </button>
            </form>

            <main
                className="grow w-full flex flex-col items-center py-8"
                style={{ backgroundColor: universeType?.tertiaryColor }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mx-10">
                    {items?.map((item) => (
                        <ListEntity
                            key={item.id}
                            universeEntity={item}
                            onClick={() => navigate(RoutesConstants.UNIVERSE_INFO.replace(':id', item.id.toString()))}
                        />
                    ))}
                </div>
                <div className=" rounded-md">
                    <button
                        className="text-xl p-1 text-black font-bold hover:underline "
                        onClick={() => {
                            setCurrentPage((prevPage) => prevPage + 1);
                        }}
                    >
                        Cargar mas
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}

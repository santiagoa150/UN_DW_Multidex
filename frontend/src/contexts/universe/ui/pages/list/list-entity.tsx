import { UniverseEntity } from '../../../domain/universe-entity';
import { useUniverse } from '../../../../../config/universe/use-universe.hook';

interface ListEntityProps {
    universeEntity: UniverseEntity;
    onClick: () => void;
}

export default function ListEntity({ universeEntity, onClick }: ListEntityProps) {
    const { universeType } = useUniverse();

    return (
        <div
            className="w-full sm:w-64 shadow-lg rounded-2xl overflow-hidden mb-6 cursor-pointer 
               hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: universeType?.entityColor || '#f8f8f8' }}
            onClick={onClick}
        >
            {/* Imagen de la entidad */}
            <div className="w-full h-40 sm:h-40 flex justify-center items-center overflow-hidden relative">
                <img
                    src={universeEntity.frontImageUrl}
                    alt={universeEntity.name}
                    className="max-w-[80%] max-h-[80%] object-contain"
                    style={{ backgroundColor: universeType?.entityColor || 'transparent' }}
                />
            </div>

            {/* ID del Pokémon centrado */}
            <div className="flex justify-center -mt-1 mb-1">
                <div
                    className="text-black rounded-lg px-2.5 py-0.5 text-md font-bold shadow-lg"
                    style={{ backgroundColor: universeType?.search || '#FFD700' }}
                >
                    {String(universeEntity.id).padStart(3, '0')}
                </div>
            </div>

            {/* Información del Pokémon */}
            <div className="p-4 text-left sm:ml-5">
                <h1 className="text-xl sm:text-xl  font-bold ">
                    {universeEntity.name.charAt(0).toUpperCase() + universeEntity.name.slice(1)}
                </h1>
                <p>
                    <strong>Tipo:</strong>{' '}
                    {universeEntity.entityTypes.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('/')}
                </p>
                {universeEntity.location && (
                    <p>
                        <strong>Hábitat:</strong> {universeEntity.location}
                    </p>
                )}
                {/* {universeEntity.origin && (
                    <p>
                        <strong>Origen:</strong> {universeEntity.origin}
                    </p>
                )} */}
                {universeEntity.creator && (
                    <p>
                        <strong>Creador:</strong> {universeEntity.creator}
                    </p>
                )}

                {/* Botón de "Más info..." alineado a la derecha */}
                <div className="text-right sm:mr-5">
                    <button
                        className="mt-4 font-bold text-black text-sm sm:text-[14px] md:text-[15px] px-3 py-1 
                        rounded-xl hover:text-black transition-transform duration-200 ease-in-out hover:scale-105"
                        style={{
                            backgroundColor: universeType?.info ? `${universeType.info}B3` : 'rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        Más info...
                    </button>
                </div>
            </div>
        </div>
    );
}

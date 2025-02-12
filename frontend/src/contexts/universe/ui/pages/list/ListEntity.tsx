import { UniverseEntity } from '../../../domain/universe-entity.ts';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';

interface ListEntityProps {
    universeEntity: UniverseEntity;
    onClick: () => void;
    // other props if any
}

export const ListEntity: React.FC<ListEntityProps> = ({ universeEntity, onClick }) => {
    const { universeType } = useUniverse();
    return (
        <div
            className="w-full sm:w-64  shadow-lg rounded-2xl overflow-hidden mb-6"
            style={{ backgroundColor: universeType?.entityColor }}
            onClick={onClick}
        >
            <div className="w-full h-40 sm:h-40 flex justify-center items-center overflow-hidden">
                <img
                    src={universeEntity.frontImageUrl}
                    alt={universeEntity.name}
                    className="max-w-[80%] max-h-[80%] object-contain"
                    style={{ backgroundColor: universeType?.entityColor }}
                />
            </div>

            <div className="p-4 text-left sm:ml-5">
                <h1 className="text-base sm:text-lg font-bold">
                    {String(universeEntity.id).padStart(3, '0')}: {universeEntity.name}
                </h1>
                <p>
                    <strong>Tipo:</strong> {universeEntity.entityTypes.join('/')}
                </p>
                {universeEntity.location && (
                    <p>
                        <strong>Hábitat:</strong> {universeEntity.location}
                    </p>
                )}
                {universeEntity.origin && (
                    <p>
                        <strong>Origen:</strong> {universeEntity.origin}
                    </p>
                )}
                {universeEntity.creator && (
                    <p>
                        <strong>Creador:</strong> {universeEntity.creator}
                    </p>
                )}
                <button className="mt-2 text-black  font-bold hover:underline  sm:text-right">DESCUBRIR MÁS...</button>
            </div>
        </div>
    );
};

import { useUniverse } from '../../../../../config/UniverseContext.tsx';

type ListEntityProps = {
    itemNumber: string;
    name: string;
    type: string;
    habitat: string;
    creator: string;
    imageUrl: string;
};

export function ListEntity({ itemNumber, name, type, habitat, creator, imageUrl }: ListEntityProps) {
    const { universeType } = useUniverse();
    return (
        <div
            className="w-full sm:w-64  shadow-lg rounded-2xl overflow-hidden mb-6"
            style={{ backgroundColor: universeType?.entityColor }}
        >
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-48 sm:h-40 object-contain "
                style={{ backgroundColor: universeType?.entityColor }}
            />
            <div className="p-4 text-left sm:ml-5">
                <h1 className="text-base sm:text-lg font-bold">
                    {itemNumber}: {name}
                </h1>
                <h2>
                    <strong>Tipo:</strong> {type}
                </h2>
                <p>
                    <strong>Hábitat:</strong> {habitat}
                </p>
                <p>
                    <strong>Creador:</strong> {creator}
                </p>
                <button className="mt-2 text-black  font-bold hover:underline  sm:text-right">DESCUBRIR MÁS...</button>
            </div>
        </div>
    );
}

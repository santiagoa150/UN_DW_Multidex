import { JSX } from 'react';
import { UniverseType } from '../../../domain/universe-type.ts';
import { deleteUniverseEntityApplication } from '../../../../../config/app.providers.ts';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';

/**
 * Component that displays a modal to delete a universe entity.
 * @param id - The ID of the entity to delete.
 * @param name - The name of the entity to delete.
 * @param universeType - The universe type of the entity to delete.
 * @param setIsModalOpen - The function to set the modal open state.
 */
export default function DeleteUniverseEntityModalComponent({
    id,
    name,
    universeType,
    setIsModalOpen,
}: {
    id: number;
    name: string;
    universeType: UniverseType;
    setIsModalOpen: (value: boolean) => void;
}): JSX.Element {
    const navigate = useNavigate();

    /**
     * Handles the delete action.
     */
    const handleDelete = () => {
        deleteUniverseEntityApplication.exec(id, universeType.name).then(() => {
            navigate(RoutesConstants.UNIVERSE_LIST);
        });
    };

    return (
        <div className="w-full h-full flex justify-center items-center absolute bg-black bg-opacity-95">
            <div
                className="w-[90%] h-[40%] lg:w-[30%] lg:h-[30%] rounded-lg flex flex-col items-center justify-center text-center gap-y-4 p-10"
                style={{ backgroundColor: universeType.mainColor }}
            >
                <p className="font-bold text-2xl">
                    ¿Estás seguro que deseas eliminar para siempre a {name} de la Multidex?
                </p>
                <div className="flex gap-x-4">
                    <button
                        className="font-bold py-3 px-10 cursor-pointer rounded-lg hover:shadow-xl transition delay-0 duration-300"
                        style={{ backgroundColor: universeType.tertiaryColor }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="font-bold py-3 px-10 cursor-pointer rounded-lg hover:shadow-xl transition delay-0 duration-300"
                        style={{ backgroundColor: universeType.secondaryColor }}
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

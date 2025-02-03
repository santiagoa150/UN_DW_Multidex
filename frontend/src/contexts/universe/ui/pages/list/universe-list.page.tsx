import { JSX } from 'react';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { useNavigate } from 'react-router-dom';

export default function UniverseListPage(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Universe List Page</h1>
            <button
                className="w-[100px] border-2 border-black"
                onClick={() => navigate(RoutesConstants.UNIVERSE_INFO.replace(':id', '1'))}
            >
                Entidad 1
            </button>
        </div>
    );
}

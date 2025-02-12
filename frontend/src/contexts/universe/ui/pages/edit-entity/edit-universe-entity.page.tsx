import { JSX, useEffect, useState } from 'react';
//import { UniverseTypeNameToPropertiesConstants } from '../../../domain/constants/universe-type-name-to-properties.constants';
import { Title } from './Title';
import { Data } from './Data';
import { UniverseType } from '../../../domain/universe-type';
import { getCurrentUniverseApplication } from '../../../../../config/app.providers';

export default function EditUniverseEntityPage(): JSX.Element {
    const [universeType, setUniverseType] = useState<UniverseType | undefined>();

    useEffect(() => {
        if (!universeType) {
            getCurrentUniverseApplication.exec().then((res) => setUniverseType(res));
        }
    }, [universeType]);

    return (
        <main className="w-full min-h-screen " style={{ backgroundColor: universeType?.tertiaryColor }}>
            <Title />

            <Data />
        </main>
    );
}

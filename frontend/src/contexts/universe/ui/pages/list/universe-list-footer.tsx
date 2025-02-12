import { JSX } from 'react';

import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';

export default function UniverseListFooter(): JSX.Element {
    const { universeType } = useUniverse();
    /**
     * Load the universe type when the component is mounted.
     */

    return (
        <div
            className="w-full h-[135px] align-items: flex-end"
            style={{ backgroundColor: universeType?.mainColor }}
        ></div>
    );
}

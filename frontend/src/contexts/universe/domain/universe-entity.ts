import { UniverseTypeNameConstants } from './constants/universe-type-name.constants.ts';

export type UniverseEntity = {
    allowDetail: boolean;
    detailPath?: string;
    id: string;
    name: string;
    type: UniverseTypeNameConstants;
};

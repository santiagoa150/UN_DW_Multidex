import { UniverseTypeNameConstants } from './constants/universe-type-name.constants.ts';

/**
 * The definition of a universe type.
 */
export type UniverseType = {
    name: UniverseTypeNameConstants;
    mainColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    entityColor : string;
    allowDetail: boolean;
    detailPath?: string;
    logo_1: string;
    logo_2:string;
    logo_3:string;
    search: string;
   
};





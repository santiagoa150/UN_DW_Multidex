/**
 * The `UniverseEntityDto` type defines the shape of the data transfer object (DTO) for a universe entity.
 */
export type UniverseEntityDto = {
    id: number;
    name: string;
    universeType: string;
    entityTypes: string[];
    frontImageUrl: string;
    description: string;
    creatorId?: string;
    creatorName?: string;
    height?: number;
    weight?: number;
    status?: string;
    gender?: string;
    location?: string;
    origin?: string;
};

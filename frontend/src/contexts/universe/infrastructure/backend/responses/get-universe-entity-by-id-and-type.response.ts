/**
 * Interface for the response of the getUniverseEntityByIdAndType method.
 */
export type GetUniverseEntityByIdAndTypeResponse = {
    success: boolean;
    entity: {
        id: number;
        name: string;
        universeType: string;
        entityTypes: string[];
        frontImageUrl: string;
        description: string;
        height?: number;
        weight?: number;
        status?: string;
        gender?: string;
        location?: string;
        origin?: string;
        creatorId?: string;
        creatorName?: string;
    };
};

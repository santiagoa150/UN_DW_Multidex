/**
 * Data Transfer Object for UniverseType.
 */
export type UniverseTypeDto = {
    priority: number;
    name: string;
    taskWasExecuted: boolean;
    elementsPerPage: number;
    metadata?: string;
};

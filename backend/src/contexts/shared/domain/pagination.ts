import { PaginationMetadata } from './pagination-metadata';

/**
 * Represents a paginated list.
 */
export class Pagination<T> {
    data: T[] = [];
    metadata: PaginationMetadata = new PaginationMetadata();

    constructor(data: T[], metadata: PaginationMetadata) {
        this.data = data;
        this.metadata = metadata;
    }
}

/**
 * Repository to store and retrieve data.
 */
export interface StorageRepository {
    /**
     * Get a value by its key.
     * @param key - The key of the value to retrieve.
     * @returns The value associated with the specified key, or `null` if no value was found.
     */
    get(key: string): Promise<string | null>;

    /**
     * Set a value by its key.
     * @param key - The key of the value to set.
     * @param value - The value to set.
     * @returns A promise that resolves when the value has been set.
     */
    set(key: string, value: string): Promise<void>;
}
